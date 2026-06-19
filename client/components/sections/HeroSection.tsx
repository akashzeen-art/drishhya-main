import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, Info, Sparkles } from 'lucide-react';
import { CONTENT, landscape, portrait } from '@/lib/contentData';
import { useSubscription } from '@/lib/SubscriptionContext';
import { HeroSpiralCanvas } from '@/components/sections/HeroSpiralCanvas';

const HERO_ITEMS = [
  { ...CONTENT[26], genre: 'Action · Thriller',      desc: 'A master spy uncovers a conspiracy that threatens world peace. Heart-pounding action across continents.',                             badge: 'TRENDING #1',        badgeColor: '#f59e0b' },
  { ...CONTENT[23], genre: 'Romance · Suspense',     desc: "When forbidden love meets dangerous secrets, the stakes couldn't be higher. A gripping tale of passion and betrayal.",              badge: 'NEW RELEASE',        badgeColor: '#8b5cf6' },
  { ...CONTENT[27], genre: 'Psychological Thriller', desc: 'Dive into the twisted corridors of the human mind. Reality bends, perception shatters, nothing is what it seems.',                   badge: 'CRITICALLY ACCLAIMED', badgeColor: '#ec4899' },
  { ...CONTENT[0],  genre: 'Mystery · Horror',       desc: 'Beyond the veil of fear lies a secret that will change everything. Some truths are better left buried.',                             badge: 'FAN FAVOURITE',      badgeColor: '#10b981' },
  { ...CONTENT[44], genre: 'Action · Espionage',     desc: 'When the protocol is compromised, one agent must go rogue to save the mission — and the world.',                                     badge: 'EXCLUSIVE',          badgeColor: '#6366f1' },
];

const HERO_LANDSCAPE = HERO_ITEMS.map(h => ({ ...h, image: landscape(h.id) }));
const HERO_PORTRAIT  = HERO_ITEMS.map(h => ({ ...h, image: portrait(h.id) }));
const SPIRAL_REPEAT = 5;

const buildSpiralUrls = (mobile: boolean) => {
  const thumb = mobile ? portrait : landscape;
  return Array.from({ length: HERO_ITEMS.length * SPIRAL_REPEAT }, (_, i) =>
    thumb(HERO_ITEMS[i % HERO_ITEMS.length].id),
  );
};

export const HeroSection = () => {
  const { playVideo } = useSubscription();
  const [active, setActive]       = useState(0);
  const [dir, setDir]             = useState(1);
  const [isMobile, setIsMobile]   = useState(false);
  const [syncIndex, setSyncIndex] = useState<number | undefined>(undefined);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prevActiveRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scrollContentY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const scrollOpacity  = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const spiralUrls = useMemo(() => buildSpiralUrls(isMobile), [isMobile]);
  const ITEMS = isMobile ? HERO_PORTRAIT : HERO_LANDSCAPE;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const go = useCallback((next: number, direction: number) => {
    setDir(direction);
    setActive(next);
    setSyncIndex(next);
  }, []);

  const handleSpiralActive = useCallback((index: number) => {
    setDir(index > prevActiveRef.current ? 1 : index < prevActiveRef.current ? -1 : dir);
    prevActiveRef.current = index;
    setActive(index);
    setSyncIndex(undefined);
  }, [dir]);

  const item = ITEMS[active];

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100svh', minHeight: 560 }}
    >
      {/* WebGL infinite spiral */}
      <HeroSpiralCanvas
        imageUrls={spiralUrls}
        heroCount={HERO_ITEMS.length}
        isMobile={isMobile}
        syncIndex={syncIndex}
        onActiveChange={handleSpiralActive}
      />

      {/* Desktop spiral label */}
      <div className="absolute top-20 sm:top-24 right-6 sm:right-12 z-[3] pointer-events-none hidden md:block max-w-[220px]">
        <p
          className="font-orbitron uppercase text-right leading-tight text-white/90"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.75rem)', textShadow: '0 0 40px rgba(139,92,246,0.4)' }}
        >
          Infinite
          <br />
          <span className="gradient-text">Spiral Loop</span>
        </p>
      </div>

      {/* Content overlay */}
      <motion.div
        className="relative z-[5] h-full flex flex-col justify-end pb-8 sm:pb-12 px-6 sm:px-12 lg:px-20 max-w-[90rem] mx-auto pointer-events-none"
        style={{ y: scrollContentY, opacity: scrollOpacity }}
      >
        <div className="w-full pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: dir * -40, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: dir * 40, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl relative"
            >
              <div
                className="absolute -left-4 sm:-left-6 top-0 bottom-0 w-1 rounded-full"
                style={{ background: `linear-gradient(180deg, transparent, ${item.badgeColor}, transparent)` }}
              />

              <div
                className="relative p-5 sm:p-8 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                }}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-orbitron tracking-widest uppercase"
                    style={{ background: `${item.badgeColor}22`, border: `1px solid ${item.badgeColor}55`, color: item.badgeColor }}
                  >
                    <Sparkles size={10} />
                    {item.badge}
                  </div>
                  <span className="font-orbitron text-[10px] tracking-[0.3em] text-white/30">
                    {String(active + 1).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')}
                  </span>
                </div>

                <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-wider leading-[0.92] mb-3">
                  <span className="gradient-text">{item.title}</span>
                </h1>

                <p className="font-orbitron text-[10px] sm:text-xs text-purple-300/80 tracking-[0.25em] uppercase mb-3 sm:mb-4">
                  {item.genre}
                </p>
                <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed mb-6 sm:mb-7 max-w-lg">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-3">
                  <motion.button
                    onClick={() => playVideo({ title: item.title, video: item.video, genre: item.genre })}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bebas text-base sm:text-lg tracking-widest text-white"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', boxShadow: '0 4px 24px rgba(139,92,246,0.45)' }}
                  >
                    <Play size={18} className="fill-white" /> Watch Now
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bebas text-base sm:text-lg tracking-widest"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}
                  >
                    <Info size={16} /> More Info
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Thumbnail navigator */}
          <div className="mt-5 sm:mt-6 flex items-center gap-2 sm:gap-2.5">
            <motion.button
              onClick={() => go((active - 1 + ITEMS.length) % ITEMS.length, -1)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <ChevronLeft size={14} />
            </motion.button>

            <div className="flex gap-1 sm:gap-1.5 overflow-x-auto scrollbar-hide">
              {ITEMS.map((h, i) => (
                <motion.button
                  key={h.id}
                  onClick={() => go(i, i > active ? 1 : -1)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-shrink-0 relative rounded-md overflow-hidden"
                  style={{
                    width: isMobile ? (i === active ? 42 : 32) : (i === active ? 72 : 54),
                    height: isMobile ? (i === active ? 58 : 44) : 40,
                    outline: i === active ? `1.5px solid ${h.badgeColor}` : '1.5px solid transparent',
                    outlineOffset: 1,
                    opacity: i === active ? 1 : 0.5,
                  }}
                >
                  <img src={h.image} alt={h.title} className="w-full h-full object-cover" draggable={false} />
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => go((active + 1) % ITEMS.length, 1)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <ChevronRight size={14} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Auto-loop progress */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-[6]" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          key={active}
          className="h-full"
          style={{ background: `linear-gradient(90deg, ${item.badgeColor}, #ec4899)` }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: isMobile ? 5 : 7, ease: 'linear' }}
        />
      </div>
    </div>
  );
};
