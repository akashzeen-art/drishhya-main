import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2 } from 'lucide-react';
import { useSubscription } from '@/lib/SubscriptionContext';

export const VideoPlayer = () => {
  const { videoItem, closeVideo } = useSubscription();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause & cleanup when closed
  useEffect(() => {
    if (!videoItem && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
    }
  }, [videoItem]);

  // ESC key closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeVideo(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeVideo]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = videoItem ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [videoItem]);

  return (
    <AnimatePresence>
      {videoItem && (
        <motion.div
          className="fixed inset-0 z-[3000] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: '#000' }}
        >
          {/* Top bar */}
          <motion.div
            className="flex items-center justify-between px-4 sm:px-6 py-3 flex-shrink-0"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 100%)' }}
          >
            {/* Logo + title */}
            <div className="flex items-center gap-3 min-w-0">
              <img src="/logo.png" alt="Bharat TV" className="h-8 w-auto object-contain flex-shrink-0"
                style={{ filter: 'drop-shadow(0 0 6px rgba(168,85,247,0.5))' }} />
              <div className="min-w-0">
                <p className="font-bebas text-base sm:text-lg tracking-wider text-white truncate leading-none">
                  {videoItem.title}
                </p>
                {videoItem.genre && (
                  <p className="font-orbitron text-[9px] text-purple-400 tracking-widest uppercase truncate">
                    {videoItem.genre}
                  </p>
                )}
              </div>
            </div>

            {/* Close button */}
            <motion.button
              onClick={closeVideo}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-orbitron text-xs tracking-wide ml-4"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <X size={14} />
              Close
            </motion.button>
          </motion.div>

          {/* Video — fills remaining height */}
          <div className="flex-1 relative flex items-center justify-center bg-black min-h-0">
            <motion.video
              ref={videoRef}
              key={videoItem.video}
              src={videoItem.video}
              autoPlay
              controls
              playsInline
              className="w-full h-full"
              style={{ maxHeight: '100%', outline: 'none', objectFit: 'contain' }}
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            />
          </div>

          {/* Bottom info bar */}
          <motion.div
            className="flex-shrink-0 px-4 sm:px-6 py-3 flex items-center justify-between"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-orbitron text-[10px] text-emerald-400 tracking-widest uppercase">Now Playing</span>
            </div>
            <span className="font-orbitron text-[9px] text-gray-600 tracking-wider">Press ESC to close</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
