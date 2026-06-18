import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GREETINGS = [
  { text: 'स्वागत है',       lang: 'Hindi' },
  { text: 'Welcome',         lang: 'English' },
  { text: 'ਸੁਆਗਤ ਹੈ',        lang: 'Punjabi' },
  { text: 'வரவேற்கிறோம்',   lang: 'Tamil' },
  { text: 'خوش آمدید',       lang: 'Urdu' },
  { text: 'ಸ್ವಾಗತ',          lang: 'Kannada' },
  { text: 'స్వాగతం',         lang: 'Telugu' },
  { text: 'স্বাগতম',          lang: 'Bengali' },
];

// Pre-computed stable positions — no Math.random() on render
const DOTS = [
  { x: 10, y: 20, s: 3, d: 4.2 }, { x: 85, y: 15, s: 2, d: 5.1 },
  { x: 25, y: 75, s: 4, d: 3.8 }, { x: 70, y: 60, s: 2, d: 6.0 },
  { x: 50, y: 30, s: 3, d: 4.5 }, { x: 15, y: 50, s: 2, d: 5.5 },
  { x: 90, y: 80, s: 3, d: 3.5 }, { x: 40, y: 88, s: 2, d: 4.8 },
  { x: 60, y: 10, s: 4, d: 5.2 }, { x: 78, y: 40, s: 2, d: 4.0 },
  { x: 35, y: 55, s: 3, d: 6.1 }, { x: 92, y: 35, s: 2, d: 3.9 },
];

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [idx, setIdx]         = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting]  = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Greeting cycle — every 550ms
    const greetTimer = setInterval(() => setIdx(p => (p + 1) % GREETINGS.length), 550);

    // Smooth progress 0→100 over 4.2s
    const start = Date.now();
    const DURATION = 4200;
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100 && timerRef.current) clearInterval(timerRef.current);
    }, 16);

    // Start exit at 4.4s
    const exitTimer = setTimeout(() => {
      setExiting(true);
      clearInterval(greetTimer);
    }, 4400);

    // Complete at 5s
    const doneTimer = setTimeout(onComplete, 5000);

    return () => {
      clearInterval(greetTimer);
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0a2e 50%, #0a0f1e 100%)' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Soft radial glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.18) 0%, transparent 70%)' }} />

          {/* Static ambient dots */}
          {DOTS.map((d, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: d.s, height: d.s,
                left: `${d.x}%`, top: `${d.y}%`,
                background: i % 2 === 0 ? 'rgba(168,85,247,0.7)' : 'rgba(236,72,153,0.6)',
                filter: 'blur(0.5px)',
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -18, 0] }}
              transition={{ duration: d.d, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            />
          ))}

          {/* Horizontal scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), rgba(236,72,153,0.4), transparent)' }}
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10 text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1
              className="font-bebas text-7xl sm:text-[7rem] tracking-widest leading-none"
              style={{
                background: 'linear-gradient(135deg, #e2d9f3 0%, #a855f7 35%, #ec4899 65%, #c4b5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 24px rgba(168,85,247,0.6))',
              }}
            >
              Bharat TV
            </h1>
            <motion.p
              className="font-orbitron text-[10px] tracking-[0.45em] mt-2 uppercase"
              style={{ color: 'rgba(168,85,247,0.7)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Premium Desi Entertainment
            </motion.p>
          </motion.div>

          {/* Greeting switcher */}
          <div className="relative z-10 h-24 flex flex-col items-center justify-center mb-10 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                className="absolute text-center"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.05 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <p
                  className="text-4xl sm:text-5xl font-bold text-white"
                  style={{ textShadow: '0 0 30px rgba(168,85,247,0.7), 0 0 60px rgba(236,72,153,0.3)' }}
                >
                  {GREETINGS[idx].text}
                </p>
                <p className="font-orbitron text-[10px] tracking-[0.35em] mt-2 uppercase"
                  style={{ color: 'rgba(196,181,253,0.6)' }}>
                  {GREETINGS[idx].lang}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress */}
          <div className="relative z-10 w-56 sm:w-72">
            <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear', duration: 0.016 }}
                style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', boxShadow: '0 0 8px rgba(168,85,247,0.7)' }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-orbitron text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>Loading</span>
              <span className="font-orbitron text-[9px]" style={{ color: 'rgba(168,85,247,0.8)' }}>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Curtain exit — panels slide up */
        <motion.div key="curtain" className="fixed inset-0 z-[9999] flex pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 h-full"
              style={{ background: i % 2 === 0 ? '#0f0a1e' : '#120b22', transformOrigin: 'top' }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
