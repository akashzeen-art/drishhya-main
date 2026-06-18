import { motion } from 'framer-motion';
import { Play, Heart } from 'lucide-react';
import { useState } from 'react';
import { CONTENT, portrait } from '@/lib/contentData';
import { useSubscription } from '@/lib/SubscriptionContext';

interface CollectionItem { id: number; title: string; video: string; image: string; }

const CollectionCard = ({ item, idx }: { item: CollectionItem; idx: number }) => {
  const { playVideo } = useSubscription();
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.04 }}
      className="group cursor-pointer"
      onClick={() => playVideo({ title: item.title, video: item.video })}
    >
      <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-2"
        style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <img src={item.image} alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        <button
          onClick={e => { e.stopPropagation(); setLiked(l => !l); }}
          className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <Heart size={13} className={liked ? 'fill-rose-500 text-rose-500' : 'text-white'} />
        </button>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.85)' }}>
            <Play size={16} className="fill-white ml-0.5" />
          </div>
        </div>
        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-purple-500/40 transition-colors duration-300" />
      </div>
      <h3 className="text-xs sm:text-sm font-bebas tracking-wider line-clamp-2 text-white">{item.title}</h3>
    </motion.div>
  );
};

interface GridCollectionSectionProps {
  title: string;
  description: string;
  accentColor?: 'purple' | 'emerald' | 'orange';
  startIndex?: number;
}

export const GridCollectionSection = ({ title, description, startIndex = 56 }: GridCollectionSectionProps) => {
  const ITEMS = CONTENT.slice(startIndex, startIndex + 12).map(c => ({ ...c, image: portrait(c.id) }));

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
          <h2 className="text-4xl sm:text-5xl font-bebas tracking-wider text-white">{title}</h2>
          <p className="text-gray-500 text-xs font-orbitron mt-1 tracking-wider">{description}</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          {ITEMS.map((item, idx) => <CollectionCard key={item.id} item={item} idx={idx} />)}
        </div>
      </div>
    </section>
  );
};
