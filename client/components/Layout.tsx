import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Menu, X, Home, User, Info, Phone } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { FooterSection } from './sections/FooterSection';
import { Preloader } from './Preloader';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home',       href: '/',           icon: Home },
  { label: 'My Account', href: '/my-account',  icon: User },
  { label: 'About Us',   href: '/about',       icon: Info },
  { label: 'Contact Us', href: '/contact',     icon: Phone },
];

// Use localStorage so preloader only ever shows ONCE — permanently across all visits
const hasShownPreloader = typeof localStorage !== 'undefined'
  && !!localStorage.getItem('preloaderShown');

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress]       = useState(0);
  const [showScrollTop, setScrollTop] = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  // Lazy initializer — reads localStorage only once at mount
  const [showPreloader, setPreloader] = useState(
    () => typeof localStorage !== 'undefined' && !localStorage.getItem('preloaderShown')
  );
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setScrollTop(window.scrollY > 300);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close menu on navigation
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <>
      {showPreloader && (
        <Preloader onComplete={() => {
          localStorage.setItem('preloaderShown', '1');
          setPreloader(false);
        }} />
      )}

      <div className="min-h-screen relative" style={{ background: 'var(--bg-base)' }}>
        <AnimatedBackground />

        {/* Scroll progress */}
        <div className="fixed top-0 left-0 right-0 h-[2px] z-50" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <motion.div
            className="h-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
              boxShadow: '0 0 6px rgba(168,85,247,0.8)',
            }}
            transition={{ ease: 'linear', duration: 0 }}
          />
        </div>

        {/* Navbar */}
        <nav
          className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
          style={{
            background: scrolled
              ? 'rgba(13,13,20,0.92)'
              : 'rgba(13,13,20,0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: scrolled
              ? '1px solid rgba(139,92,246,0.18)'
              : '1px solid rgba(255,255,255,0.05)',
            boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
            <Link to="/" className="group flex items-center gap-2">
              <img src="/logo.png" alt="Bharat TV" className="h-20 w-auto object-contain" style={{ filter: 'drop-shadow(0 0 12px rgba(168,85,247,0.6))' }} />
            </Link>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                background: menuOpen ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
              }}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen
                  ? <motion.span key="x"    initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.18 }}><X size={18} /></motion.span>
                  : <motion.span key="menu" initial={{ rotate: 45,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={18} /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Menu overlay */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40"
                style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={() => setMenuOpen(false)}
              />
              <motion.aside
                className="fixed top-0 right-0 bottom-0 z-50 flex flex-col w-68"
                style={{
                  width: '17rem',
                  background: 'linear-gradient(160deg, #120b22 0%, #0f0a1e 100%)',
                  borderLeft: '1px solid rgba(139,92,246,0.2)',
                  boxShadow: '-8px 0 40px rgba(0,0,0,0.6)',
                }}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              >
                {/* Top accent line */}
                <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)' }} />

                <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <span className="font-bebas text-lg tracking-widest" style={{ color: 'rgba(196,181,253,0.9)' }}>Navigation</span>
                  <button onClick={() => setMenuOpen(false)}
                    className="w-7 h-7 flex items-center justify-center rounded-md transition-colors hover:bg-white/5">
                    <X size={15} style={{ color: 'rgba(255,255,255,0.45)' }} />
                  </button>
                </div>

                <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                  {NAV_ITEMS.map(({ label, href, icon: Icon }, i) => {
                    const active = location.pathname === href;
                    return (
                      <Link
                        key={label}
                        to={href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200"
                        style={{
                          background: active ? 'rgba(139,92,246,0.16)' : 'transparent',
                          border: `1px solid ${active ? 'rgba(139,92,246,0.3)' : 'transparent'}`,
                        }}
                        onMouseEnter={e => {
                          if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                        }}
                        onMouseLeave={e => {
                          if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: active ? 'rgba(139,92,246,0.25)' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.2)' }}>
                          <Icon size={15} style={{ color: active ? '#a855f7' : 'rgba(255,255,255,0.5)' }} />
                        </div>
                        <span className="font-orbitron text-[11px] tracking-wide"
                          style={{ color: active ? '#e2d9f3' : 'rgba(255,255,255,0.55)' }}>
                          {label}
                        </span>
                        {active && (
                          <motion.div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400"
                            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="px-5 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <p className="font-orbitron text-[9px] text-center tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    © 2026 BHARAT TV
                  </p>
                </div>
                <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.4), transparent)' }} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Page */}
        <main className="pt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              {children}
              <FooterSection />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Scroll-to-top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-7 right-7 w-10 h-10 rounded-full flex items-center justify-center z-40"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                boxShadow: '0 0 16px rgba(139,92,246,0.5)',
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
