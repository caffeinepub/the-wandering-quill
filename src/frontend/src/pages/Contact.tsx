import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, Loader2, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiInstagram, SiLinkedin, SiPinterest, SiX } from "react-icons/si";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";

const socialLinks = [
  {
    icon: SiX,
    href: "#",
    label: "Twitter/X",
    handle: "@tanveerwani",
    color: "hover:bg-black hover:text-white",
  },
  {
    icon: SiInstagram,
    href: "#",
    label: "Instagram",
    handle: "@tanveer.kashmir",
    color: "hover:bg-pink-500 hover:text-white",
  },
  {
    icon: SiLinkedin,
    href: "#",
    label: "LinkedIn",
    handle: "Tanveer Wani",
    color: "hover:bg-blue-600 hover:text-white",
  },
  {
    icon: SiPinterest,
    href: "#",
    label: "Pinterest",
    handle: "kashmirvibesTours",
    color: "hover:bg-red-600 hover:text-white",
  },
];

const faqs = [
  {
    question: "How often do you publish new posts?",
    answer:
      "I aim to publish two to three new articles per week — usually a travel piece, a lifestyle reflection, or a deep-dive tech essay. Newsletter subscribers always get early access.",
  },
  {
    question: "Can I contribute a guest post?",
    answer:
      "Absolutely! I welcome thoughtful, original contributions that align with the blog's voice and topics. Please reach out via the contact form with a pitch and two writing samples, and I'll get back to you within a week.",
  },
  {
    question: "How can I advertise on The Wandering Quill?",
    answer:
      "I offer a small number of sponsored slots per month — newsletter mentions, dedicated posts, and sidebar placements. Reach out with your brand details and we can discuss options that feel authentic to my audience.",
  },
  {
    question: "Do you accept sponsored content and brand partnerships?",
    answer:
      "Yes, selectively. I only work with brands I genuinely use and believe in. All sponsored content is clearly labeled. If your product or service aligns with travel, technology, food, or lifestyle, let's talk.",
  },
  {
    question: "How can I reach you for collaboration opportunities?",
    answer:
      "The best way is through the contact form on this page. Please be specific about what you have in mind — the more detail you include, the faster I can respond. I typically reply within 2–3 business days.",
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitContact = useSubmitContact();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync(form);
      setSubmitted(true);
      toast.success("Message sent! I'll get back to you within 2–3 days.");
    } catch {
      toast.error("Couldn't send your message. Please try again.");
    }
  };

  return (
    <div className="page-enter pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-[oklch(var(--gold))] text-xs font-semibold tracking-widest uppercase">
            Say Hello
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Contact Me
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Questions, collaborations, or just a kind word — I read every
            message and try to respond to each one.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3"
          >
            {submitted ? (
              <div
                data-ocid="contact.form.success_state"
                className="bg-green-50 border border-green-200 rounded-xl p-10 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-green-800 mb-2">
                  Message Sent!
                </h3>
                <p className="text-green-700 mb-6">
                  Thanks for reaching out. I'll reply within 2–3 business days.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-ocid="contact.form.panel"
                className="bg-card rounded-xl shadow-card p-6 sm:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name">Full Name</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      data-ocid="contact.name.input"
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email">Email Address</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      data-ocid="contact.email.input"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    data-ocid="contact.subject.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me more…"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    data-ocid="contact.message.textarea"
                    className="resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitContact.isPending}
                  data-ocid="contact.form.submit_button"
                  className="w-full bg-[oklch(var(--navy))] hover:bg-[oklch(var(--navy-deep))] text-white font-semibold"
                >
                  {submitContact.isPending ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
                {submitContact.isError && (
                  <p
                    data-ocid="contact.form.error_state"
                    className="text-destructive text-sm text-center"
                  >
                    Failed to send. Please try again.
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* Social + Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Find Me Online
              </h3>
              <div className="space-y-3" data-ocid="contact.social.section">
                {socialLinks.map(
                  ({ icon: Icon, href, label, handle, color }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      data-ocid={`contact.social.${label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`}
                      className={`flex items-center gap-3 p-3 rounded-xl bg-card shadow-card border border-border transition-all duration-200 ${color}`}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <p className="text-sm font-semibold">{label}</p>
                        <p className="text-xs text-muted-foreground">
                          {handle}
                        </p>
                      </div>
                    </a>
                  ),
                )}
              </div>
            </div>

            <div className="bg-[oklch(var(--navy-deep))] rounded-xl p-6 text-white">
              <h3 className="font-display font-bold text-lg mb-2">
                Response Time
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                I typically respond within{" "}
                <span className="text-[oklch(var(--gold))] font-semibold">
                  2–3 business days
                </span>
                . For urgent matters, Instagram DMs tend to be fastest.
              </p>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          data-ocid="contact.faq.section"
          className="mt-16"
        >
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="max-w-3xl mx-auto space-y-2"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${i + 1}`}
                data-ocid={`contact.faq.item.${i + 1}`}
                className="bg-card shadow-card rounded-xl border border-border px-4"
              >
                <AccordionTrigger
                  data-ocid={`contact.faq.toggle.${i + 1}`}
                  className="font-semibold text-foreground hover:no-underline py-4 text-left"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.section>
      </div>
    </div>
  );
}
