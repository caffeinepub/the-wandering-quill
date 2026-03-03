import { Shield } from "lucide-react";
import { motion } from "motion/react";

export default function PrivacyPolicy() {
  return (
    <div className="page-enter pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-blue-600" />
            </div>
            <span className="text-[oklch(var(--gold))] text-xs font-semibold tracking-widest uppercase">
              Legal
            </span>
            <h1 className="font-display text-4xl font-bold text-foreground mt-2 mb-3">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: March 2, 2026
            </p>
          </div>

          <div className="bg-card rounded-xl shadow-card p-8 prose prose-slate max-w-none">
            <p>
              At The Wandering Quill, we take your privacy seriously. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website. Please read
              this policy carefully.
            </p>

            <h2>1. Information We Collect</h2>
            <h3>Personal Data</h3>
            <p>
              We may collect personally identifiable information, such as your
              name and email address, when you voluntarily submit it — for
              example, when subscribing to our newsletter or submitting the
              contact form.
            </p>

            <h3>Usage Data</h3>
            <p>
              We may automatically collect certain information about how you
              access and use the site, including your IP address, browser type,
              operating system, referring URLs, pages viewed, and the time and
              date of your visit.
            </p>

            <h3>Cookies and Tracking Technologies</h3>
            <p>
              We may use cookies, web beacons, and similar tracking technologies
              to improve your browsing experience and analyze site traffic. You
              can instruct your browser to refuse all cookies or indicate when a
              cookie is being sent.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Operate, maintain, and improve the website</li>
              <li>Send periodic newsletters and updates (with your consent)</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Disclosure of Your Information</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally
              identifiable information to outside parties, except in the
              following circumstances:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> Trusted third parties who
                assist us in operating our website, provided they agree to keep
                this information confidential.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights, property, or safety, or that of others.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of all or a portion of our assets.
              </li>
            </ul>

            <h2>4. Third-Party Websites</h2>
            <p>
              This website may contain links to third-party sites. We have no
              control over, and assume no responsibility for, the content,
              privacy policies, or practices of any third-party sites.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain personal information for as long as necessary to fulfill
              the purposes outlined in this Privacy Policy, unless a longer
              retention period is required by law.
            </p>

            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict our processing of your data</li>
              <li>
                Withdraw consent at any time where processing is based on
                consent
              </li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>
              This website is not directed to children under 13. We do not
              knowingly collect personal information from children. If you
              become aware that a child has provided us with personal
              information, please contact us.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We reserve the right to update this Privacy Policy at any time.
              Changes will be posted on this page with an updated revision date.
              Your continued use of the website after changes are posted
              constitutes acceptance of those changes.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please{" "}
              <a
                href="#/contact"
                className="text-[oklch(var(--navy))] underline"
              >
                contact us
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
