import { motion } from 'framer-motion';
import { Play, Flame } from 'lucide-react';
import { CONTENT, portrait } from '@/lib/contentData';
import { SliderSection } from './SliderSection';
import { useSubscription } from '@/lib/SubscriptionContext';

const ITEMS = CONTENT.slice(32, 40).map((c, i) => ({ ...c, rank: i + 1, image: portrait(c.id) }));

export const BestOfWeekSection = () => {
  const { playVideo } = useSubscription();
  return (
  <SliderSection title="BEST OF WEEK" subtitle="Handpicked selections">
    {ITEMS.map((item, idx) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: idx * 0.04 }}
        className="flex-shrink-0 group cursor-pointer"
        onClick={() => playVideo({ title: item.title, video: item.video })}
      >
        <div className="relative w-32 sm:w-40 md:w-44">
          <div className="absolute -top-6 -left-3 text-5xl sm:text-7xl font-bebas text-white/10 leading-none select-none">
            {String(item.rank).padStart(2, '0')}
          </div>
          <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-2"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            {item.rank <= 3 && (
              <div className="absolute top-2 right-2 bg-orange-500/80 p-1 rounded-full">
                <Flame size={14} className="fill-orange-300 text-orange-300" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.85)' }}>
                <Play size={18} className="fill-white ml-0.5" />
              </div>
            </div>
          </div>
          <h3 className="text-xs sm:text-sm font-bebas tracking-wider line-clamp-2 text-white">{item.title}</h3>
          <p className="text-[10px] text-gray-400 font-orbitron mt-0.5"> Content</p>
        </div>
      </motion.div>
    ))}
  </SliderSection>
  );
};
