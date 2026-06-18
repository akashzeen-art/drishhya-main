import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const YOGA_ITEMS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `OTT ${i + 1}`,
  image: `https://images.unsplash.com/photo-${1549148849 + i * 50}?w=500&h=280&fit=crop`,
  category: 'Yoga',
  rating: 4.7 + (i * 0.05) % 0.3,
  duration: `${30 + i * 5}m`,
  students: `${150 + i * 20} students`,
}));

interface YogaLandscapeSectionProps {
  title: string;
  description: string;
}

export const YogaLandscapeSection = ({
  title,
  description,
}: YogaLandscapeSectionProps) => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-5xl sm:text-6xl font-bebas tracking-wider mb-2">
            {title}
          </h2>
          <p className="text-gray-400 text-sm font-orbitron">{description}</p>
        </motion.div>

        {/* Horizontal scroll */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4 sm:gap-5">
            {YOGA_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.05,
                }}
                className="flex-shrink-0 group cursor-pointer"
              >
                {/* Card */}
                <div className="relative w-64 sm:w-80 md:w-96">
                  {/* Image */}
                  <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-zinc-900 mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 bg-emerald-600/80 px-2 py-1 rounded text-xs font-orbitron">
                      {item.category}
                    </div>

                    {/* Play button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50">
                        <Play size={22} className="fill-white" />
                      </div>
                    </motion.button>

                    {/* Border on hover */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-white/30 rounded-lg transition-colors duration-300" />
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-sm font-bebas tracking-wider line-clamp-2 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-orbitron">
                      <span className="text-emerald-400">★{item.rating.toFixed(1)}</span> •
                      {item.duration} • {item.students}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
