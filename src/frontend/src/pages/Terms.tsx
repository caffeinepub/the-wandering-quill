import { FileText } from "lucide-react";
import { motion } from "motion/react";

export default function Terms() {
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
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-green-600" />
            </div>
            <span className="text-[oklch(var(--gold))] text-xs font-semibold tracking-widest uppercase">
              Legal
            </span>
            <h1 className="font-display text-4xl font-bold text-foreground mt-2 mb-3">
              Terms &amp; Conditions
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: March 2, 2026
            </p>
          </div>

          <div className="bg-card rounded-xl shadow-card p-8 prose prose-slate max-w-none">
            <p>
              Please read these Terms and Conditions ("Terms") carefully before
              using The Wandering Quill website. By accessing or using the site,
              you agree to be bound by these Terms.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing this website, you confirm that you are at least 18
              years of age, you have read and understood these Terms, and you
              agree to abide by them. If you do not agree with these Terms, you
              must discontinue use of this site immediately.
            </p>

            <h2>2. Intellectual Property</h2>
            <p>
              All content on this website — including but not limited to text,
              photographs, graphics, logos, and icons — is the intellectual
              property of The Wandering Quill or its content suppliers and is
              protected by applicable copyright and trademark laws. You may not
              reproduce, distribute, or create derivative works without our
              express written permission.
            </p>

            <h2>3. User Conduct</h2>
            <p>By using this website, you agree not to:</p>
            <ul>
              <li>Use the site for any unlawful purpose</li>
              <li>
                Attempt to gain unauthorized access to any portion of the site
              </li>
              <li>
                Transmit any harmful, offensive, defamatory, or otherwise
                objectionable content
              </li>
              <li>
                Engage in any data mining, scraping, or similar data gathering
                activities without prior written consent
              </li>
              <li>
                Interfere with or disrupt the operation of the website or
                servers
              </li>
            </ul>

            <h2>4. User-Submitted Content</h2>
            <p>
              If you submit content to us (e.g., via the contact form or
              comments), you grant The Wandering Quill a non-exclusive,
              royalty-free, perpetual license to use, reproduce, and publish
              that content. You represent that you own or have the necessary
              rights to submit that content.
            </p>

            <h2>5. Disclaimer of Warranties</h2>
            <p>
              This website is provided on an "as is" and "as available" basis
              without warranties of any kind, either express or implied,
              including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, or
              non-infringement. We do not warrant that the site will be
              uninterrupted or error-free.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, The Wandering Quill and
              its owner shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of your
              use of, or inability to use, this website or its content.
            </p>

            <h2>7. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless The Wandering Quill and
              its owner from any claims, damages, losses, liabilities, and
              expenses (including legal fees) arising out of your violation of
              these Terms or your use of the website.
            </p>

            <h2>8. Third-Party Links</h2>
            <p>
              This site may contain links to third-party websites. These links
              are provided for convenience only. We have no control over the
              content of those sites and accept no responsibility for them.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with
              applicable laws, without regard to conflict of law provisions.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes
              are effective immediately upon posting. Your continued use of the
              website constitutes acceptance of the revised Terms.
            </p>

            <h2>11. Contact</h2>
            <p>
              For questions about these Terms, please{" "}
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
