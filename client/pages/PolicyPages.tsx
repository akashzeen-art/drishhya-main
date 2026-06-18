import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
    {children}
  </div>
);

const ChevronList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-2 text-gray-400">
        <span className="text-purple-400 mt-0.5">›</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

interface PolicyPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const PolicyPage = ({ title, lastUpdated, children }: PolicyPageProps) => (
  <Layout>
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-orbitron text-xs tracking-widest uppercase mb-8 transition-colors">
            <ArrowLeft size={13} /> Back to Home
          </Link>
          <h1 className="font-bebas text-5xl sm:text-6xl text-white tracking-wide mb-1">{title}</h1>
          <p className="text-gray-500 font-orbitron text-[10px] tracking-widest uppercase mb-8">Last Updated: {lastUpdated}</p>
          <div className="rounded-2xl p-6 sm:p-10 space-y-6 text-gray-300 text-sm leading-relaxed"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  </Layout>
);

// ─── PRIVACY POLICY ───────────────────────────────────────────────────────────
export const PrivacyPage = () => (
  <PolicyPage title="Privacy Policy" lastUpdated="09-06-2026">
    <p>
      This Privacy Policy describes how Forte Digital Solutions LLP collects, uses, and shares information about you when you use our services.
    </p>

    <Section title="1. Information We Collect">
      <p>
        We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support — including name, email, phone, payment info, usage data, and device information.
      </p>
    </Section>

    <Section title="2. How We Use Your Information">
      <p>
        We use the information to provide, maintain, and improve our Service; process transactions; send notices; respond to support requests; and personalise content.
      </p>
    </Section>

    <Section title="3. Sharing of Information">
      <p>
        We may share information with service providers, in response to legal requests, to protect rights and safety, or in connection with a merger or acquisition.
      </p>
    </Section>

    <Section title="4. Cookies">
      <p>
        We use cookies and similar tracking technologies. You can instruct your browser to refuse all cookies, though some portions of our Service may not function properly.
      </p>
    </Section>

    <Section title="5. User-Generated Content">
      <p>
        Our Service may allow you to post content. You are responsible for the content you post, including its legality, reliability, and appropriateness.
      </p>
    </Section>

    <Section title="6. Links to Other Sites">
      <p>
        Our Service may contain links to third-party sites. We have no control over and assume no responsibility for their content or privacy policies.
      </p>
    </Section>

    <Section title="7. Children's Privacy">
      <p>
        Our Services are not intended for users under the age of 16. We do not knowingly collect personal data from children. If you believe a child has submitted personal information through our platform, please contact us immediately at{' '}
        <a href="mailto:info@fortedigitalsolutions.com" className="text-purple-400 hover:underline">info@fortedigitalsolutions.com</a>{' '}
        and we will take prompt steps to delete such information from our records.
      </p>
    </Section>

    <Section title="8. Security and Data Retention">
      <p>
        We strive to use commercially acceptable means to protect your data. We retain your Personal Data only as long as necessary for the purposes set out in this policy.
      </p>
    </Section>

    <Section title="9. Your Rights">
      <p>
        You have the right to access, correct, update, or delete the personal information we hold about you. Contact us through the information below.
      </p>
    </Section>

    <Section title="10. Disclaimer">
      <p>
        The content provided on this OTT and VOD platform, including all movies, series, videos, and related streaming materials, is intended for personal entertainment purposes only. Viewer discretion is advised where content may include mature themes, violence, or strong language. Users are responsible for ensuring that access and viewing comply with applicable laws in their region.
      </p>
      <p className="mt-3">
        By streaming content on this platform, you acknowledge that you do so voluntarily and at your own discretion. The platform and its content partners shall not be held responsible for any technical issues, interruptions, or losses that may occur as a result of using this service. Streaming quality and availability may vary based on device, network connection, and subscription plan.
      </p>
    </Section>

    <Section title="11. Governing Law and Jurisdiction">
      <p>
        These Terms shall be governed and interpreted in accordance with the laws of India. Any disputes arising out of or relating to the use of this website shall be subject to the exclusive jurisdiction of the courts located in Gurgaon, Haryana.
      </p>
    </Section>

    <Section title="12. Updates to This Policy">
      <p>
        We may update our Privacy Policy from time to time. We will notify you of changes by posting the new policy on this page.
      </p>
    </Section>

    <div className="border-t border-white/10 pt-4 mt-2">
      <h3 className="text-white font-semibold mb-3">Contact</h3>
      <p>417, 4th Floor, Tower A, Spaze I Tech Park, Sohna Road, Gurugram, Haryana - 122018</p>
      <p className="mt-2">
        <a href="mailto:info@fortedigitalsolutions.com" className="text-purple-400 hover:underline">info@fortedigitalsolutions.com</a>
      </p>
    </div>
  </PolicyPage>
);

// ─── REFUND POLICY ────────────────────────────────────────────────────────────
export const RefundPage = () => (
  <PolicyPage title="Refund Policy" lastUpdated="09-06-2026">
    <p>
      Thank you for subscribing to Forte Digital Solutions LLP. We hope you are satisfied with our services, but if not, we're here to help.
    </p>

    <Section title="1. Free Trial">
      <p>
        Forte Digital Solutions LLP does not offer a free trial. Users can cancel their subscription at any time from their account page.
      </p>
    </Section>

    <Section title="2. Cancellation Policy">
      <p>
        Subscribers may cancel their recurring subscription at any time. Upon cancellation, access remains active until the end of the current billing cycle.
      </p>
    </Section>

    <Section title="3. Refund Eligibility">
      <p>
        To be eligible for a refund, you must submit a request within 2 days of your subscription start date. Refunds are granted on a case-by-case basis at the sole discretion of Forte Digital Solutions LLP.
      </p>
    </Section>

    <Section title="4. Process for Requesting a Refund">
      <p>
        To request a refund, please contact our customer support team at{' '}
        <a href="mailto:info@fortedigitalsolutions.com" className="text-purple-400 hover:underline">info@fortedigitalsolutions.com</a>.
        Include your account information, subscription details, and a brief explanation.
      </p>
    </Section>

    <Section title="5. Refund Processing">
      <p>
        Once your refund request is received and reviewed, we will notify you of approval or rejection by email. If approved, your refund will be processed within 7 working days.
      </p>
    </Section>

    <Section title="6. Changes to Refund Policy">
      <p>
        Forte Digital Solutions LLP reserves the right to modify this refund policy at any time. Changes take effect immediately upon posting on the website.
      </p>
    </Section>

    <Section title="7. Contact Us">
      <p>
        If you have any questions about our refund policy, please contact us at{' '}
        <a href="mailto:info@fortedigitalsolutions.com" className="text-purple-400 hover:underline">info@fortedigitalsolutions.com</a>.
      </p>
    </Section>

    <div className="border-t border-white/10 pt-4">
      <h3 className="text-white font-semibold text-base mb-4">Refund Scenarios</h3>

      <p className="text-white font-medium text-sm mb-2">Refunds Would Typically Be Granted</p>
      <div className="space-y-3 mb-5">
        <div>
          <p className="text-gray-300 font-medium">Technical Issues</p>
          <p className="text-gray-400">Persistent technical issues preventing use of the service.</p>
        </div>
        <div>
          <p className="text-gray-300 font-medium">Billing Error</p>
          <p className="text-gray-400">Incorrectly charged due to a billing error on our part.</p>
        </div>
      </div>

      <p className="text-white font-medium text-sm mb-2">Refunds Would Not Typically Be Granted</p>
      <div>
        <p className="text-gray-300 font-medium">Change of Mind</p>
        <p className="text-gray-400">Customer decides they no longer want the service after the refund eligibility period.</p>
      </div>
    </div>
  </PolicyPage>
);

// ─── TERMS & CONDITIONS ───────────────────────────────────────────────────────
export const TermsPage = () => (
  <PolicyPage title="Terms and Conditions" lastUpdated="15-01-2026">
    <p>
      At Forte Digital Solutions LLP, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by our platform and how we use it.
    </p>
    <p>
      If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
    </p>
    <p>
      This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect on our platform. This policy is not applicable to any information collected offline or via channels other than this website.
    </p>

    <Section title="Consent">
      <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
    </Section>

    <Section title="Information We Collect">
      <p>
        The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
      </p>
      <p className="mt-3">
        If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
      </p>
      <p className="mt-3">
        When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
      </p>
    </Section>

    <Section title="How We Use Your Information">
      <p className="mb-3">We use the information we collect in various ways, including to:</p>
      <ChevronList items={[
        'Provide, operate, and maintain our website',
        'Improve, personalize, and expand our website',
        'Understand and analyze how you use our website',
        'Develop new products, services, features, and functionality',
        'Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes',
        'Send you emails',
        'Find and prevent fraud',
      ]} />
    </Section>

    <Section title="Log Files">
      <p>
        Our platform follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
      </p>
    </Section>

    <Section title="Cookies and Web Beacons">
      <p>
        Like any other website, our platform uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
      </p>
    </Section>

    <Section title="CCPA Privacy Rights (Do Not Sell My Personal Information)">
      <p className="mb-3">Under the CCPA, among other rights, California consumers have the right to:</p>
      <ChevronList items={[
        "Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.",
        'Request that a business delete any personal data about the consumer that a business has collected.',
        "Request that a business that sells a consumer's personal data, not sell the consumer's personal data.",
      ]} />
      <p className="mt-3">
        If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
      </p>
    </Section>

    <Section title="GDPR Data Protection Rights">
      <p className="mb-3">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
      <ChevronList items={[
        'The right to access — You have the right to request copies of your personal data.',
        'The right to rectification — You have the right to request that we correct any information you believe is inaccurate.',
        'The right to erasure — You have the right to request that we erase your personal data, under certain conditions.',
        'The right to restrict processing — You have the right to request that we restrict the processing of your personal data, under certain conditions.',
        'The right to object to processing — You have the right to object to our processing of your personal data, under certain conditions.',
        'The right to data portability — You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.',
      ]} />
    </Section>

    <Section title="Terms and Conditions">
      <div className="space-y-3 text-gray-400">
        <p>A. This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.</p>
        <p>B. This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of our platform, including the related mobile site and mobile application (hereinafter referred to as "Platform").</p>
        <p>C. The Platform is owned by Forte Digital Solutions LLP, a company incorporated under the Companies Act, 1956 with its registered office (hereinafter referred to as "Platform Owner", "we", "us", "our").</p>
        <p>D. Your use of the Platform and services and tools are governed by the following terms and conditions ("Terms of Use") as applicable to the Platform including the applicable policies which are incorporated herein by way of reference.</p>
        <p>E. For the purpose of these Terms of Use, wherever the context so requires "you", "your" or "user" shall mean any natural or legal person who has agreed to become a user/buyer on the Platform.</p>
        <p>F. ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.</p>
      </div>
    </Section>
  </PolicyPage>
);
