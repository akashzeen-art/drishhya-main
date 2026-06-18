import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const FooterSection = () => {
  return (
    <footer className="relative mt-8 overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[80px] opacity-10"
          style={{ background: 'radial-gradient(circle, #7c3aed, #ec4899)' }} />
      </div>

      <div className="relative bg-black/80 backdrop-blur-xl py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="flex justify-center mb-1">
            <img src="/logo.png" alt="DRISHHYA" className="h-16 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.5))' }} />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-500 text-sm font-orbitron tracking-widest mb-8">
            PREMIUM DESI ENTERTAINMENT
          </motion.p>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-950/30 mb-8">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[10px] font-orbitron text-emerald-400 tracking-widest uppercase">All services operational</span>
          </motion.div>

          {/* Policy links only */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-x-3 gap-y-2 justify-center items-center mb-8">
            {[
              { label: 'Terms of Services', to: '/terms' },
              { label: 'Refund Policy',     to: '/refund' },
              { label: 'Privacy Policy',    to: '/privacy' },
            ].map(({ label, to }, i, arr) => (
              <span key={label} className="flex items-center gap-3">
                <Link to={to} className="text-[11px] font-orbitron text-gray-500 hover:text-purple-400 transition-colors duration-300 tracking-wider uppercase">
                  {label}
                </Link>
                {i < arr.length - 1 && <span className="text-gray-700">|</span>}
              </span>
            ))}
          </motion.div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="text-gray-600 text-[11px] font-orbitron tracking-wider">
            Copyright © 2026, Forte Digital Solutions LLP — All Rights Reserved
          </motion.p>
        </div>
      </div>
    </footer>
  );
};
