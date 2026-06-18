import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const offerings = [
  'Premium OTT and VOD streaming',
  'Unlimited streaming on any device',
  'Expert-curated VOD libraries',
  'Flexible subscription plans',
  'New content added regularly',
];

const AboutUs = () => {
  return (
    <Layout>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-orbitron text-xs tracking-widest uppercase mb-8 transition-colors">
              <ArrowLeft size={13} /> Back to Home
            </Link>

            <h1 className="font-bebas text-5xl sm:text-6xl text-white tracking-wide mb-8">About Us</h1>

            <div className="rounded-2xl p-6 sm:p-10 space-y-6 text-gray-300 text-sm leading-relaxed"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>

              <div>
                <h2 className="text-white font-semibold text-base mb-3">Forte Digital Solutions LLP</h2>
                <p>
                  Forte Digital Solutions LLP is a premium OTT and VOD streaming platform focused on movies, series, and exclusive on-demand content. Our mission is to make premium entertainment accessible to everyone through a flexible, subscription-based streaming service.
                </p>
                <p className="mt-3">
                  Our library covers thrillers, romance, action, documentaries, and exclusive VOD titles — with new series added regularly.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold text-base mb-3">What We Offer</h3>
                <ul className="space-y-2">
                  {offerings.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-400">
                      <span className="text-purple-400 mt-0.5">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white font-semibold text-base mb-4">Company Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 font-orbitron text-[10px] uppercase tracking-widest mb-1">Registered Name</p>
                    <p>Forte Digital Solutions LLP</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-orbitron text-[10px] uppercase tracking-widest mb-1">Address</p>
                    <p>417, 4th Floor, Tower A, Spaze I Tech Park, Sohna Road, Gurugram, Haryana - 122018</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-orbitron text-[10px] uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:info@fortedigitalsolutions.com" className="text-purple-400 hover:underline">
                      info@fortedigitalsolutions.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
