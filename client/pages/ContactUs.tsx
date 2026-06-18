import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <Layout>
      <div className="min-h-screen px-4 py-16 flex justify-center">
        <div className="w-full max-w-2xl mx-auto px-6 sm:px-12 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-orbitron text-xs tracking-widest uppercase mb-8 transition-colors">
              <ArrowLeft size={13} /> Back to Home
            </Link>

            <div className="mb-10">
              <h1 className="font-bebas text-6xl sm:text-7xl text-white tracking-wide mb-2">Contact Us</h1>
              <p className="text-gray-400 text-[15px]">We'd love to hear from you. Feel free to reach out.</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-6"
            >
              <div className="flex items-start gap-4 px-6 py-5">
                <span className="text-xl leading-none mt-0.5">🏢</span>
                <div>
                  <p className="text-gray-500 font-orbitron text-[10px] uppercase tracking-widest mb-1">Company</p>
                  <p className="text-gray-200 text-sm leading-relaxed">Forte Digital Solutions LLP</p>
                </div>
              </div>

              <div className="border-t border-white/5" />

              <div className="flex items-start gap-4 px-6 py-5">
                <span className="text-xl leading-none mt-0.5">📍</span>
                <div>
                  <p className="text-gray-500 font-orbitron text-[10px] uppercase tracking-widest mb-1">Address</p>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    417, 4th Floor, Tower A, Spaze I Tech Park, Sohna Road, Gurugram, Haryana - 122018
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5" />

              <div className="flex items-start gap-4 px-6 py-5">
                <span className="text-xl leading-none mt-0.5">✉️</span>
                <div>
                  <p className="text-gray-500 font-orbitron text-[10px] uppercase tracking-widest mb-1">Email</p>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    <a href="mailto:info@fortedigitalsolutions.com" className="text-purple-400 hover:underline">
                      info@fortedigitalsolutions.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5" />

              <div className="px-6 py-5">
                <p className="text-white font-semibold text-sm mb-1">Send Us a Message</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Need faster support? Email us at{' '}
                  <a href="mailto:info@fortedigitalsolutions.com" className="text-purple-400 hover:underline">
                    info@fortedigitalsolutions.com
                  </a>{' '}
                  for the quickest response.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
