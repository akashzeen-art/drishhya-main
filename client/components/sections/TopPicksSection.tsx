import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { CONTENT, portrait } from '@/lib/contentData';
import { useSubscription } from '@/lib/SubscriptionContext';

const TOP_PICKS = CONTENT.slice(4, 16).map((c) => ({ ...c, image: portrait(c.id) }));

export const TopPicksSection = () => {
  const { playVideo } = useSubscription();

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-4xl sm:text-5xl font-bebas tracking-wider text-white">TOP PICKS</h2>
          <p className="text-gray-500 text-xs font-orbitron mt-1 tracking-wider">Premium selections</p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          {TOP_PICKS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="group cursor-pointer"
              whileHover={{ y: -6 }}
              onClick={() => playVideo({ title: item.title, video: item.video })}
            >
              <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-2"
                style={{ border: '1px solid rgba(168,85,247,0.2)' }}>
                <img src={item.image} alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.85)' }}>
                    <Play size={16} className="fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <h3 className="text-xs sm:text-sm font-bebas tracking-wider line-clamp-2 text-white px-0.5">{item.title}</h3>
              <div className="flex items-center gap-1 mt-0.5 px-0.5">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                <span className="font-orbitron text-[9px] text-gray-500">Desi Content</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
