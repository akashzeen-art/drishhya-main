import { motion } from 'framer-motion';
import { User, CheckCircle, Phone } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { useSubscription } from '@/lib/SubscriptionContext';

const MyAccount = () => {
  const { openAuth, subscribed, phone, plan } = useSubscription();

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md mx-auto py-12">
          <div className="text-center mb-10">
            <h1 className="font-bebas text-6xl sm:text-7xl text-white tracking-wide">
              My{' '}
              <span style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Account
              </span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl p-8"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
          >
            {subscribed ? (
              /* ── Subscribed state ── */
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <CheckCircle size={26} className="text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Active Subscription</h2>
                    <p className="text-emerald-400 font-orbitron text-xs uppercase tracking-widest">Subscribed</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <Phone size={15} className="text-purple-400 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 font-orbitron text-[9px] uppercase tracking-widest">Mobile</p>
                      <p className="text-white text-sm font-orbitron">+91 {phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <CheckCircle size={15} className="text-purple-400 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 font-orbitron text-[9px] uppercase tracking-widest">Plan</p>
                      <p className="text-white text-sm font-orbitron capitalize">{plan} — ₹{plan === 'weekly' ? '79' : '179'}</p>
                    </div>
                  </div>
                </div>

                <p className="text-center text-gray-500 text-xs font-orbitron">
                  Enjoy unlimited Desi content 🎬
                </p>
              </>
            ) : (
              /* ── Not subscribed state ── */
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2))', border: '1px solid rgba(139,92,246,0.3)' }}>
                    <User size={26} className="text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Sign In</h2>
                    <p className="text-gray-500 font-orbitron text-xs uppercase tracking-widest">Access your account</p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-7">
                  Sign in with your registered mobile number to access your subscription and enjoy unlimited content.
                </p>

                <motion.button
                  onClick={() => openAuth()}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-xl font-bebas text-xl tracking-widest text-white"
                  style={{ background: 'linear-gradient(135deg, #059669, #0d9488)', boxShadow: '0 4px 20px rgba(5,150,105,0.3)' }}
                >
                  Sign In / Subscribe
                </motion.button>

                <p className="text-center text-gray-600 text-[10px] font-orbitron mt-5">
                  New here?{' '}
                  <button onClick={() => openAuth()} className="text-emerald-400 hover:underline">Subscribe now</button>{' '}
                  to get started.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default MyAccount;
