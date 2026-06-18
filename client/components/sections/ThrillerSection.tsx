import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { useRef } from 'react';
import { CONTENT, landscape } from '@/lib/contentData';
import { useSubscription } from '@/lib/SubscriptionContext';

const thrillerItem = CONTENT[27]; // SNO 28 - DANGEROUS MINDS EP1
const PARTICLES = Array.from({ length: 8 }, (_, i) => i);

export const ThrillerSection = () => {
  const { playVideo } = useSubscription();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-5xl sm:text-6xl font-bebas tracking-wider mb-2">
            DANGEROUS MINDS
          </h2>
          <p className="text-gray-400 text-sm font-orbitron">Psychological Thriller</p>
        </motion.div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image left */}
          <motion.div
            className="group relative order-1 rounded-xl overflow-hidden h-[460px]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Parallax bg */}
            <motion.div
              style={{ y: bgY }}
              className="absolute inset-0 h-[460px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent" />
              <img
                src={landscape(thrillerItem.id)}
                alt={thrillerItem.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
            </motion.div>

            {/* Floating particles */}
            {PARTICLES.map((idx) => (
              <motion.div
                key={idx}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: `${20 + idx * 10}%`,
                  top: `${30 + idx * 8}%`,
                }}
                animate={{
                  y: [0, -18, 0],
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: 3 + idx * 0.3,
                  repeat: Infinity,
                  delay: idx * 0.1,
                }}
              />
            ))}

            {/* Floating stat badges */}
            <motion.div
              className="absolute top-6 right-6 bg-black/70 backdrop-blur px-4 py-2 rounded-full text-xs font-orbitron z-10"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              CULT CLASSIC
            </motion.div>

            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-blue-500/40 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50">
                <Play size={28} className="fill-white" />
              </div>
            </div>

            {/* Border glow */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/60 rounded-xl transition-colors duration-500" />
          </motion.div>

          {/* Text right */}
          <motion.div
            className="order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-3xl sm:text-4xl font-bebas tracking-wider mb-4">
              A MIND-BENDING JOURNEY
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Dive into the twisted corridors of the human mind. A psychological
              thriller that explores perception, reality, and the fragile nature
              of consciousness itself.
            </p>
            <div className="flex gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bebas">16+</p>
                <p className="text-xs text-gray-400 font-orbitron">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bebas">45 Mins</p>
                <p className="text-xs text-gray-400 font-orbitron">Duration</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
                onClick={() => playVideo({ title: thrillerItem.title, video: thrillerItem.video })}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-bebas tracking-widest hover:shadow-2xl hover:shadow-blue-500/50 transition-all"
            >
              WATCH NOW
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
          className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mt-20 origin-left"
        />
      </div>
    </section>
  );
};
