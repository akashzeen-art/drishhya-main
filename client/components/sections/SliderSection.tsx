import { useRef, useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderSectionProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const SliderSection = ({ title, subtitle, children }: SliderSectionProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(true);

  const SCROLL_BY = 320;

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'left' ? -SCROLL_BY : SCROLL_BY, behavior: 'smooth' });
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl font-bebas tracking-wider text-white">{title}</h2>
            <p className="text-gray-500 text-xs font-orbitron mt-1 tracking-wider">{subtitle}</p>
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-2 flex-shrink-0">
            <motion.button
              onClick={() => scroll('left')}
              disabled={!canLeft}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: canLeft ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${canLeft ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.08)'}`,
                opacity: canLeft ? 1 : 0.35,
                cursor: canLeft ? 'pointer' : 'not-allowed',
              }}
            >
              <ChevronLeft size={17} style={{ color: canLeft ? '#a855f7' : 'rgba(255,255,255,0.4)' }} />
            </motion.button>

            <motion.button
              onClick={() => scroll('right')}
              disabled={!canRight}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: canRight ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${canRight ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.08)'}`,
                opacity: canRight ? 1 : 0.35,
                cursor: canRight ? 'pointer' : 'not-allowed',
              }}
            >
              <ChevronRight size={17} style={{ color: canRight ? '#a855f7' : 'rgba(255,255,255,0.4)' }} />
            </motion.button>
          </div>
        </motion.div>

        {/* Slider track */}
        <div className="relative">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: 'linear-gradient(90deg, var(--bg-base), transparent)',
              opacity: canLeft ? 1 : 0,
            }}
          />

          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-3"
          >
            {children}
          </div>

          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: 'linear-gradient(270deg, var(--bg-base), transparent)',
              opacity: canRight ? 1 : 0,
            }}
          />
        </div>
      </div>
    </section>
  );
};
