import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, ChevronRight, Check, Zap, Calendar } from 'lucide-react';
import { useSubscription } from '@/lib/SubscriptionContext';

const PLANS = [
  {
    key: 'weekly' as const,
    label: 'Weekly',
    price: 79,
    original: 158,
    icon: Zap,
    color: '#8b5cf6',
    desc: '7 days unlimited access',
  },
  {
    key: 'monthly' as const,
    label: 'Monthly',
    price: 179,
    original: 358,
    icon: Calendar,
    color: '#ec4899',
    desc: '30 days unlimited access',
    popular: true,
  },
];

const overlay = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
const modal = {
  hidden:  { opacity: 0, scale: 0.93, y: 24 },
  visible: { opacity: 1, scale: 1,    y: 0  },
  exit:    { opacity: 0, scale: 0.95, y: 16 },
};

export const SubscriptionModal = () => {
  const { isAuthOpen, closeAuth, onSuccessCallback, setSubscribed } = useSubscription();

  const [step, setStep]         = useState<'phone' | 'plan' | 'success'>('phone');
  const [phone, setPhone]       = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [selPlan, setSelPlan]   = useState<'weekly' | 'monthly' | null>(null);

  const reset = () => {
    setStep('phone');
    setPhone('');
    setPhoneErr('');
    setSelPlan(null);
  };

  const handleClose = () => {
    closeAuth();
    setTimeout(reset, 300);
  };

  const submitPhone = () => {
    const cleaned = phone.replace(/\s/g, '');
    if (!/^[6-9]\d{9}$/.test(cleaned)) {
      setPhoneErr('Enter a valid 10-digit mobile number');
      return;
    }
    setPhoneErr('');
    setStep('plan');
  };

  const submitPlan = () => {
    if (!selPlan) return;
    setSubscribed(phone, selPlan);
    setStep('success');
    // Fire callback after short delay
    setTimeout(() => {
      handleClose();
      onSuccessCallback?.();
    }, 1800);
  };

  if (!isAuthOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[2000] flex items-center justify-center px-4"
        variants={overlay} initial="hidden" animate="visible" exit="exit"
        style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)' }}
        onClick={handleClose}
      >
        <motion.div
          variants={modal} initial="hidden" animate="visible" exit="exit"
          className="relative w-full max-w-md rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #130d22 0%, #0e0a1a 100%)', border: '1px solid rgba(139,92,246,0.25)', boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.1)' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Top accent */}
          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, #ec4899, transparent)' }} />

          {/* Close */}
          <button onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <X size={15} style={{ color: 'rgba(255,255,255,0.6)' }} />
          </button>

          <AnimatePresence mode="wait">
            {/* ── STEP 1: Phone ── */}
            {step === 'phone' && (
              <motion.div key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}
                className="p-7">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
                    <Phone size={17} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bebas text-lg tracking-widest text-white leading-none">Bharat TV</p>
                    <p className="font-orbitron text-[9px] text-purple-400 tracking-widest">SIGN IN</p>
                  </div>
                </div>

                <h2 className="font-bebas text-3xl text-white tracking-wider mb-1">Enter Your Mobile Number</h2>
                <p className="text-gray-400 text-sm mb-6">We'll verify your number to continue.</p>

                {/* Phone input */}
                <div className="flex gap-2 mb-2">
                  <div className="flex items-center gap-2 px-3 py-3 rounded-xl flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <span className="text-base">🇮🇳</span>
                    <span className="text-white text-sm font-orbitron">+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={e => { setPhone(e.target.value.replace(/\D/g, '')); setPhoneErr(''); }}
                    onKeyDown={e => e.key === 'Enter' && submitPhone()}
                    placeholder="Enter your number"
                    className="flex-1 px-4 py-3 rounded-xl text-white text-sm font-orbitron outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: `1px solid ${phoneErr ? '#f87171' : 'rgba(255,255,255,0.12)'}`,
                      caretColor: '#a855f7',
                    }}
                    autoFocus
                  />
                </div>
                {phoneErr && <p className="text-red-400 text-xs font-orbitron mb-3">{phoneErr}</p>}

                <motion.button
                  onClick={submitPhone}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-xl font-bebas text-lg tracking-widest text-white flex items-center justify-center gap-2 mt-4"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', boxShadow: '0 4px 20px rgba(139,92,246,0.35)' }}
                >
                  Continue <ChevronRight size={18} />
                </motion.button>

                <p className="text-center text-gray-600 text-[10px] font-orbitron mt-4">
                  By continuing, you agree to our Terms & Privacy Policy
                </p>
              </motion.div>
            )}

            {/* ── STEP 2: Plan ── */}
            {step === 'plan' && (
              <motion.div key="plan" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}
                className="p-7">
                <div className="mb-6">
                  <h2 className="font-bebas text-3xl text-white tracking-wider mb-1">Select Your Pack</h2>
                  <p className="text-gray-400 text-sm">Unlimited access to all content</p>
                </div>

                {/* Discount banner */}
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-5"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                  <span className="text-base">🎉</span>
                  <p className="text-emerald-400 text-xs font-orbitron tracking-wide">
                    <span className="text-emerald-300 font-bold">50% OFF</span> — Limited time offer!
                  </p>
                </div>

                {/* Plans */}
                <div className="flex flex-col gap-3 mb-6">
                  {PLANS.map(plan => {
                    const Icon = plan.icon;
                    const selected = selPlan === plan.key;
                    return (
                      <motion.button
                        key={plan.key}
                        onClick={() => setSelPlan(plan.key)}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="relative w-full p-4 rounded-xl text-left transition-all duration-200"
                        style={{
                          background: selected ? `${plan.color}18` : 'rgba(255,255,255,0.04)',
                          border: `2px solid ${selected ? plan.color : 'rgba(255,255,255,0.08)'}`,
                          boxShadow: selected ? `0 0 20px ${plan.color}25` : 'none',
                        }}
                      >
                        {plan.popular && (
                          <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[9px] font-orbitron tracking-widest font-bold text-white"
                            style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899)' }}>
                            POPULAR
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                              style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}40` }}>
                              <Icon size={17} style={{ color: plan.color }} />
                            </div>
                            <div>
                              <p className="font-bebas text-xl text-white tracking-wider">{plan.label}</p>
                              <p className="text-gray-400 text-[11px] font-orbitron">{plan.desc}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bebas text-2xl text-white leading-none">₹{plan.price}</p>
                            <p className="text-gray-500 text-xs line-through font-orbitron">₹{plan.original}</p>
                          </div>
                        </div>
                        {/* Selected indicator */}
                        {selected && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: plan.color }}>
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <motion.button
                  onClick={submitPlan}
                  disabled={!selPlan}
                  whileHover={{ scale: selPlan ? 1.02 : 1 }} whileTap={{ scale: selPlan ? 0.97 : 1 }}
                  className="w-full py-3.5 rounded-xl font-bebas text-lg tracking-widest text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: selPlan ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : 'rgba(255,255,255,0.06)',
                    boxShadow: selPlan ? '0 4px 20px rgba(139,92,246,0.35)' : 'none',
                    opacity: selPlan ? 1 : 0.5,
                    cursor: selPlan ? 'pointer' : 'not-allowed',
                  }}
                >
                  Continue <ChevronRight size={18} />
                </motion.button>

                <button onClick={() => setStep('phone')} className="w-full mt-3 text-center text-gray-600 text-[11px] font-orbitron hover:text-gray-400 transition-colors">
                  ← Change Number
                </button>
              </motion.div>
            )}

            {/* ── STEP 3: Success ── */}
            {step === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
                className="p-7 text-center">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', boxShadow: '0 0 30px rgba(139,92,246,0.5)' }}
                >
                  <Check size={28} className="text-white" strokeWidth={3} />
                </motion.div>
                <h2 className="font-bebas text-3xl text-white tracking-wider mb-2">You're In!</h2>
                <p className="text-gray-400 text-sm mb-1">Welcome to Bharat TV</p>
                <p className="text-purple-400 font-orbitron text-xs">Enjoy unlimited content 🎬</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom accent */}
          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.4), transparent)' }} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
