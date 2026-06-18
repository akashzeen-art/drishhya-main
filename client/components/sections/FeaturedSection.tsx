import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useState } from 'react';
import { CONTENT, landscape } from '@/lib/contentData';

const FEATURED_ITEMS = CONTENT.slice(0, 4).map((c) => ({
  ...c,
  image: landscape(c.id),
}));

export const FeaturedSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 50 : -50, opacity: 0 }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => (prev + newDirection + FEATURED_ITEMS.length) % FEATURED_ITEMS.length);
  };

  const currentItem = FEATURED_ITEMS[activeIndex];

  return (
    <section id="featured" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        className="absolute -right-40 top-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-5xl sm:text-6xl font-bebas tracking-wider mb-2">FEATURED</h2>
          <p className="text-gray-400 text-sm font-orbitron">Handpicked selections</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <motion.div
              className="relative rounded-xl overflow-hidden bg-black border border-white/10 aspect-video group"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                key={activeIndex}
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { const v = document.createElement('video'); v.src = currentItem.video; }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20"
              >
                <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50">
                  <Play size={24} className="fill-white" />
                </div>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="mt-4"
            >
              <h3 className="text-2xl font-bebas tracking-wider">{currentItem.title}</h3>
              <p className="text-sm text-gray-400 font-orbitron mt-1"> Content</p>
            </motion.div>
          </div>

          <div className="lg:col-span-2 overflow-y-auto max-h-96 scrollbar-hide">
            <div className="flex flex-col gap-3">
              {FEATURED_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  onClick={() => { setDirection(idx > activeIndex ? 1 : -1); setActiveIndex(idx); }}
                  className={`p-3 rounded-lg transition-all border ${
                    idx === activeIndex
                      ? 'bg-purple-500/20 border-purple-500'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex gap-3">
                    <img src={item.image} alt={item.title} className="w-16 h-9 rounded object-cover flex-shrink-0" />
                    <div className="text-left flex-1">
                      <p className="font-bebas text-sm tracking-wide">{item.title}</p>
                      <p className="text-xs text-gray-400 font-orbitron"> Content</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => paginate(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => paginate(1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <ChevronRight size={20} />
          </motion.button>
        </div>

        <div className="flex gap-1 mt-4">
          {FEATURED_ITEMS.map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-1 rounded-full transition-all duration-500 ${idx === activeIndex ? 'bg-purple-500 w-8' : 'bg-white/20 w-2'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
