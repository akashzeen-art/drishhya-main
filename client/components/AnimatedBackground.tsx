import { motion, useScroll, useTransform } from 'framer-motion';

export const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  const blob1Y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <>
      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Slow-moving blobs — CSS transform via framer scroll */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 560, height: 560,
            top: '-80px', left: '-80px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)',
            filter: 'blur(60px)',
            y: blob1Y,
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 480, height: 480,
            bottom: '-60px', right: '-60px',
            background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
            y: blob2Y,
          }}
        />
        {/* Static center accent */}
        <div
          className="absolute rounded-full"
          style={{
            width: 320, height: 320,
            top: '35%', left: '55%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Light vignette at edges */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)',
        }}
      />
    </>
  );
};
