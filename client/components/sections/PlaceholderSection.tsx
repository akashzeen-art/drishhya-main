import { motion } from 'framer-motion';

interface PlaceholderSectionProps {
  title: string;
  description?: string;
}

export const PlaceholderSection = ({ title, description }: PlaceholderSectionProps) => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-5xl sm:text-6xl font-bebas tracking-wider mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-gray-400 text-sm font-orbitron">
              {description}
            </p>
          )}
          <p className="text-gray-600 mt-8">
            Section content coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
};
