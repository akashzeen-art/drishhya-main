import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { CONTENT, landscape, portrait } from '@/lib/contentData';
import { useSubscription } from '@/lib/SubscriptionContext';

const HERO_ITEMS = [
  { ...CONTENT[26], genre: 'Action · Thriller',      desc: 'A master spy uncovers a conspiracy that threatens world peace. Heart-pounding action across continents.',                             badge: 'TRENDING #1',        badgeColor: '#f59e0b' },
  { ...CONTENT[23], genre: 'Romance · Suspense',     desc: "When forbidden love meets dangerous secrets, the stakes couldn't be higher. A gripping tale of passion and betrayal.",              badge: 'NEW RELEASE',        badgeColor: '#8b5cf6' },
  { ...CONTENT[27], genre: 'Psychological Thriller', desc: 'Dive into the twisted corridors of the human mind. Reality bends, perception shatters, nothing is what it seems.',                   badge: 'CRITICALLY ACCLAIMED', badgeColor: '#ec4899' },
  { ...CONTENT[0],  genre: 'Mystery · Horror',       desc: 'Beyond the veil of fear lies a secret that will change everything. Some truths are better left buried.',                             badge: 'FAN FAVOURITE',      badgeColor: '#10b981' },
  { ...CONTENT[44], genre: 'Action · Espionage',     desc: 'When the protocol is compromised, one agent must go rogue to save the mission — and the world.',                                     badge: 'EXCLUSIVE',          badgeColor: '#6366f1' },
];

const HERO_LANDSCAPE = HERO_ITEMS.map(h => ({ ...h, image: landscape(h.id) }));
const HERO_PORTRAIT  = HERO_ITEMS.map(h => ({ ...h, image: portrait(h.id) }));

export const HeroSection = () => {
  const { playVideo } = useSubscription();
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const ITEMS = isMobile ? HERO_PORTRAIT : HERO_LANDSCAPE;

  const go = (next: number, direction: number) => {
    setDir(direction);
    setActive(next);
  };

  useEffect(() => {
    if (paused) return;
    autoRef.current = setInterval(() => go((active + 1) % ITEMS.length, 1), 6000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [active, paused, ITEMS.length]);

  const item = ITEMS[active];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: 560 }}>

      {/* Background */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div key={active} className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04, x: dir * 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.97, x: dir * -40 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}>
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" draggable={false} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d14]/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: 'easeOut' }} className="max-w-2xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-orbitron tracking-widest uppercase mb-4"
              style={{ background: `${item.badgeColor}22`, border: `1px solid ${item.badgeColor}55`, color: item.badgeColor }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: item.badgeColor }} />
              {item.badge}
            </div>

            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider leading-none mb-3 text-white"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
              {item.title}
            </h1>

            <p className="font-orbitron text-xs text-purple-300 tracking-widest uppercase mb-3">{item.genre}</p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">{item.desc}</p>

            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => playVideo({ title: item.title, video: item.video, genre: item.genre })}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2.5 px-7 py-3 rounded-xl font-bebas text-lg tracking-widest text-white"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', boxShadow: '0 4px 20px rgba(139,92,246,0.4)' }}>
                <Play size={18} className="fill-white" /> Watch Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2.5 px-7 py-3 rounded-xl font-bebas text-lg tracking-widest"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }}>
                <Info size={16} /> More Info
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail strip */}
        <div className="mt-10 flex items-center gap-4">
          <motion.button onClick={() => go((active - 1 + ITEMS.length) % ITEMS.length, -1)}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <ChevronLeft size={16} />
          </motion.button>

          <div className="flex gap-2 overflow-hidden">
            {ITEMS.map((h, i) => (
              <motion.button key={h.id} onClick={() => go(i, i > active ? 1 : -1)}
                whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 relative rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  width: isMobile ? (i === active ? 44 : 32) : (i === active ? 100 : 72),
                  height: isMobile ? (i === active ? 66 : 48) : 56,
                  outline: i === active ? '2px solid #8b5cf6' : '2px solid transparent',
                  outlineOffset: 2, opacity: i === active ? 1 : 0.55,
                }}>
                <img src={h.image} alt={h.title} className="w-full h-full object-cover" draggable={false} />
                {i === active && <div className="absolute inset-0 bg-purple-500/20" />}
              </motion.button>
            ))}
          </div>

          <motion.button onClick={() => go((active + 1) % ITEMS.length, 1)}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <motion.div key={active} className="h-full"
          style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899)' }}
          initial={{ width: '0%' }}
          animate={{ width: paused ? undefined : '100%' }}
          transition={{ duration: 6, ease: 'linear' }} />
      </div>
    </div>
  );
};
