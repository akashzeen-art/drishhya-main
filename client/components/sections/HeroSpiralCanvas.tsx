import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type SpiralConfig = {
  imageHeight: number;
  curvature: number;
  gapSize: number;
  spiralRadius: number;
  spiralTurns: number;
  spiralHeight: number;
  centerX: number;
  centerY: number;
  centerZ: number;
};

type HeroSpiralCanvasProps = {
  imageUrls: string[];
  heroCount: number;
  isMobile: boolean;
  syncIndex?: number;
  onActiveChange: (index: number) => void;
};

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D map;
  uniform float gap;
  uniform float offset;
  varying vec2 vUv;

  void main() {
    float u = vUv.x + offset;
    if (u >= 1.0) u -= 1.0;
    if (u < 0.0) u += 1.0;
    vec4 color = texture2D(map, vec2(u, vUv.y));
    // Boost visibility — thumbnails were appearing washed out
    color.rgb = pow(color.rgb, vec3(0.88)) * 1.12;
    gl_FragColor = vec4(color.rgb, 1.0);
  }
`;

function getSpiralConfig(isMobile: boolean, imageCount: number): SpiralConfig {
  const extra = imageCount - 21;
  return {
    imageHeight: isMobile ? 6.2 : 8.5,
    curvature: -0.03,
    gapSize: 0.008,
    spiralRadius: isMobile ? 3.0 : 3.8,
    spiralTurns: 2.4 + extra * 0.1,
    spiralHeight: (isMobile ? 9.5 : 12) + extra * 0.25,
    centerX: isMobile ? 0.6 : 2.2,
    centerY: isMobile ? 4.8 : 4.2,
    centerZ: 0,
  };
}

function getAutoSpeed(isMobile: boolean) {
  return isMobile ? 0.00042 : 0.00028;
}

export const HeroSpiralCanvas = ({
  imageUrls,
  heroCount,
  isMobile,
  syncIndex,
  onActiveChange,
}: HeroSpiralCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onActiveChangeRef = useRef(onActiveChange);
  const lastActiveRef = useRef(-1);
  const scrollOffsetRef = useRef(0);
  const updateUVOffsetRef = useRef<(() => void) | null>(null);

  onActiveChangeRef.current = onActiveChange;

  useEffect(() => {
    if (syncIndex === undefined || !updateUVOffsetRef.current) return;
    scrollOffsetRef.current = syncIndex / imageUrls.length;
    updateUVOffsetRef.current();
  }, [syncIndex, imageUrls.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || imageUrls.length === 0) return;

    let disposed = false;
    let raf = 0;

    const config = getSpiralConfig(isMobile, imageUrls.length);
    const autoSpeed = getAutoSpeed(isMobile);
    const imageRatios: number[] = [];
    const originalPositions: Array<{ x: number; y: number; z: number; offsetX: number; offsetY: number; offsetZ: number }> = [];

    const baseRotation = { x: isMobile ? -0.12 : -0.18, z: isMobile ? 0.06 : 0.12 };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(isMobile ? 50 : 48, 1, 0.1, 1000);
    camera.position.set(0, isMobile ? 3.0 : 3.2, isMobile ? 8.5 : 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const tiltGroup = new THREE.Group();
    tiltGroup.rotation.x = baseRotation.x;
    tiltGroup.rotation.z = baseRotation.z;
    scene.add(tiltGroup);

    let spiralMesh: THREE.Mesh | null = null;
    let shaderMaterial: THREE.ShaderMaterial | null = null;
    let masterTexture: THREE.CanvasTexture | null = null;

    const wrapOffset = (value: number) => {
      let offset = value;
      while (offset >= 1) offset -= 1;
      while (offset < 0) offset += 1;
      return offset;
    };

    const updateUVOffset = () => {
      if (!shaderMaterial) return;
      shaderMaterial.uniforms.offset.value = wrapOffset(scrollOffsetRef.current);

      const slot = Math.floor(wrapOffset(scrollOffsetRef.current) * imageUrls.length);
      const active = slot % heroCount;
      if (active !== lastActiveRef.current) {
        lastActiveRef.current = active;
        onActiveChangeRef.current(active);
      }
    };
    updateUVOffsetRef.current = updateUVOffset;

    const rebuildGeometry = () => {
      if (!spiralMesh || imageRatios.length === 0) return;

      const totalSlots = imageRatios.length;
      const widths = imageRatios.map(r => r * config.imageHeight);
      const totalWidth = widths.reduce((a, b) => a + b, 0);
      const segmentsW = 200 + totalSlots * 20;
      const segmentsH = 24;

      const geometry = new THREE.PlaneGeometry(totalWidth, config.imageHeight, segmentsW, segmentsH);
      const positions = geometry.attributes.position;
      const uvs = geometry.attributes.uv;

      const origX: number[] = [];
      const origY: number[] = [];
      for (let i = 0; i < positions.count; i++) {
        origX.push(positions.getX(i));
        origY.push(positions.getY(i));
      }

      const cumulative = [0];
      for (let i = 0; i < totalSlots; i++) {
        cumulative.push(cumulative[i] + widths[i] / totalWidth);
      }

      const imageRatio = 1 - config.gapSize;
      for (let i = 0; i < uvs.count; i++) {
        let u = Math.max(0, Math.min(0.999999, uvs.getX(i)));
        let found = false;

        for (let j = 0; j < totalSlots; j++) {
          if (u >= cumulative[j] && u < cumulative[j + 1]) {
            const localU = (u - cumulative[j]) / (cumulative[j + 1] - cumulative[j]);
            if (localU > imageRatio) {
              uvs.setX(i, cumulative[j + 1] - 0.001);
            } else {
              let scaledU = Math.max(0.001, Math.min(0.999, localU / imageRatio));
              uvs.setX(i, cumulative[j] + scaledU * (cumulative[j + 1] - cumulative[j]));
            }
            found = true;
            break;
          }
        }
        if (!found) uvs.setX(i, cumulative[totalSlots] - 0.001);
      }

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const nx = x / (totalWidth / 2);
        positions.setZ(i, -config.curvature * 0.4 * (nx * nx - 1));
      }

      for (let i = 0; i < positions.count; i++) {
        const x = origX[i];
        const y = origY[i];
        let t = Math.max(0, Math.min(1, (x + totalWidth / 2) / totalWidth));

        const angle = t * Math.PI * 2 * config.spiralTurns;
        const radius = config.spiralRadius * (1 - t * 0.12);
        let px = Math.sin(angle) * radius;
        let pz = Math.cos(angle) * radius;
        let py = (t - 0.5) * config.spiralHeight + y * 0.35;

        if (!originalPositions[i]) {
          originalPositions[i] = {
            x: px, y: py, z: pz,
            offsetX: (Math.random() - 0.5) * 0.001,
            offsetY: (Math.random() - 0.5) * 0.001,
            offsetZ: (Math.random() - 0.5) * 0.001,
          };
        }

        px += originalPositions[i].offsetX;
        py += originalPositions[i].offsetY;
        pz += originalPositions[i].offsetZ;
        positions.setXYZ(i, px, py, pz);
      }

      geometry.computeVertexNormals();
      const oldGeo = spiralMesh.geometry;
      spiralMesh.geometry = geometry;
      oldGeo.dispose();
    };

    const createMasterTexture = () =>
      new Promise<THREE.CanvasTexture>((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(new THREE.CanvasTexture(canvas));
          return;
        }

        const baseHeight = 720;
        let loaded = 0;
        const images: Array<{ img: HTMLImageElement; width: number; height: number } | null> =
          new Array(imageUrls.length).fill(null);

        imageUrls.forEach((url, idx) => {
          const img = new Image();
          img.onload = () => {
            const ratio = img.naturalWidth / img.naturalHeight || 0.67;
            imageRatios[idx] = ratio;
            images[idx] = { img, width: baseHeight * ratio, height: baseHeight };
            loaded++;
            if (loaded === imageUrls.length) finish();
          };
          img.onerror = () => {
            imageRatios[idx] = isMobile ? 0.67 : 1.78;
            loaded++;
            if (loaded === imageUrls.length) finish();
          };
          img.src = url;

          function finish() {
            const totalWidth = images.reduce((sum, item) => sum + (item?.width ?? baseHeight * 0.67), 0);
            canvas.width = totalWidth;
            canvas.height = baseHeight;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let offsetX = 0;
            images.forEach((data) => {
              if (data?.img) ctx.drawImage(data.img, offsetX, 0, data.width, data.height);
              offsetX += data?.width ?? baseHeight * 0.67;
            });

            const tex = new THREE.CanvasTexture(canvas);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.ClampToEdgeWrapping;
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.generateMipmaps = false;
            tex.needsUpdate = true;
            resolve(tex);
          }
        });
      });

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight, false);
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);

      scrollOffsetRef.current += autoSpeed;
      updateUVOffset();

      renderer.render(scene, camera);
    };

    const init = async () => {
      masterTexture = await createMasterTexture();
      if (disposed) return;

      shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: masterTexture },
          gap: { value: config.gapSize },
          offset: { value: 0 },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: false,
        side: THREE.DoubleSide,
        depthWrite: true,
      });

      spiralMesh = new THREE.Mesh(new THREE.BufferGeometry(), shaderMaterial);
      spiralMesh.position.set(config.centerX, config.centerY, config.centerZ);
      spiralMesh.rotation.x = isMobile ? 0.32 : 0.38;
      tiltGroup.add(spiralMesh);

      rebuildGeometry();
      updateUVOffset();
      resize();
      animate();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    init();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();

      spiralMesh?.geometry.dispose();
      shaderMaterial?.dispose();
      masterTexture?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      updateUVOffsetRef.current = null;
    };
  }, [imageUrls, heroCount, isMobile]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[1] bg-black"
      aria-hidden
    />
  );
};
