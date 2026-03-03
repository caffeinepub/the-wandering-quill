import { AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

export default function Disclaimer() {
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
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            </div>
            <span className="text-[oklch(var(--gold))] text-xs font-semibold tracking-widest uppercase">
              Legal
            </span>
            <h1 className="font-display text-4xl font-bold text-foreground mt-2 mb-3">
              Disclaimer
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: March 2, 2026
            </p>
          </div>

          <div className="bg-card rounded-xl shadow-card p-8 prose prose-slate max-w-none">
            <h2>Website Disclaimer</h2>
            <p>
              The information provided by The Wandering Quill ("we," "us," or
              "our") on this website is for general informational and
              entertainment purposes only. All information on the site is
              provided in good faith; however, we make no representation or
              warranty of any kind, express or implied, regarding the accuracy,
              adequacy, validity, reliability, availability, or completeness of
              any information on the site.
            </p>

            <h2>External Links Disclaimer</h2>
            <p>
              This website may contain links to other websites or content
              belonging to or originating from third parties. Such external
              links are not investigated, monitored, or checked for accuracy,
              adequacy, validity, reliability, availability, or completeness by
              us. We do not warrant, endorse, guarantee, or assume
              responsibility for the accuracy or reliability of any information
              offered by third-party websites linked through this site.
            </p>

            <h2>Professional Advice Disclaimer</h2>
            <p>
              This site cannot and does not contain legal, financial, medical,
              fitness, or travel advice. The information is provided for general
              informational and educational purposes only. Please consult with
              your own legal counsel, financial advisor, physician, or qualified
              professional before acting on any information presented here.
            </p>

            <h2>Affiliate Disclaimer</h2>
            <p>
              This website may contain links to affiliate websites. We may
              receive an affiliate commission for any purchases you make on the
              affiliate website using such links. This comes at no additional
              cost to you, and all opinions remain our own. We only recommend
              products and services we have personally used or genuinely believe
              in.
            </p>

            <h2>Views Expressed</h2>
            <p>
              The views and opinions expressed on The Wandering Quill are purely
              the author's own. Although the author makes every effort to
              provide accurate and current information, travel conditions,
              prices, and recommendations change over time. Always verify
              critical information independently before making travel,
              financial, or lifestyle decisions.
            </p>

            <h2>Errors and Omissions</h2>
            <p>
              While we have made every attempt to ensure that the information
              contained in this site has been obtained from reliable sources,
              The Wandering Quill is not responsible for any errors or
              omissions, or for the results obtained from the use of this
              information. All information is provided "as is," with no
              guarantee of completeness, accuracy, or timeliness, and without
              warranty of any kind, express or implied.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions or concerns about this disclaimer, please{" "}
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
