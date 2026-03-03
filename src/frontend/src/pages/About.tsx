import {
  Building2,
  Mail,
  MapPin,
  Phone,
  Plane,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

const expertise = [
  {
    label: "Digital Marketing",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-700",
  },
  { label: "Tour & Travel", icon: Plane, color: "bg-green-100 text-green-700" },
  {
    label: "Travel Consultancy",
    icon: MapPin,
    color: "bg-pink-100 text-pink-700",
  },
  {
    label: "Kashmir Tourism",
    icon: Building2,
    color: "bg-orange-100 text-orange-700",
  },
];

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    lines: ["+91 9103264586", "+91 9906581695"],
    href: "tel:+919103264586",
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["geva41460@gmail.com"],
    href: "mailto:geva41460@gmail.com",
  },
  {
    icon: MapPin,
    label: "Address",
    lines: [
      "Kashmir Vibes Tour & Travel Co",
      "Qazigund, Anantnag",
      "Jammu & Kashmir, India – 192221",
    ],
    href: null,
  },
];

export default function About() {
  return (
    <div className="page-enter pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[oklch(var(--gold))] text-xs font-semibold tracking-widest uppercase">
            About the Author
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
            The Person Behind the Quill
          </h1>
        </motion.div>

        {/* Profile + Bio */}
        <div className="grid md:grid-cols-5 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 flex flex-col items-center"
          >
            {/* Avatar */}
            <div
              data-ocid="about.avatar.section"
              className="w-44 h-44 rounded-full overflow-hidden shadow-card-hover ring-4 ring-[oklch(var(--gold)/0.3)] mb-5"
            >
              <img
                src="https://picsum.photos/seed/tanveer-kashmir/400/400"
                alt="Tanveer Wani"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Tanveer Wani
            </h2>
            <p className="text-[oklch(var(--gold))] font-medium text-sm mt-1 mb-2 text-center">
              Digital Marketer &amp; Tour &amp; Travel Consultant
            </p>
            <p className="text-muted-foreground text-sm text-center mb-5 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              Kashmir Vibes Tour &amp; Travel Co
            </p>
            <p className="text-muted-foreground text-xs text-center flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              Qazigund, Anantnag, J&amp;K – 192221
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3"
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Hello, I'm Tanveer
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a Digital Marketing professional and Tour &amp; Travel
                Consultant based in the heart of Jammu &amp; Kashmir. With a
                deep passion for the majestic landscapes and rich culture of the
                Himalayas, I founded
                <strong className="text-foreground">
                  {" "}
                  Kashmir Vibes Tour &amp; Travel Co
                </strong>{" "}
                to share the unparalleled beauty of Kashmir with the world.
              </p>
              <p>
                Through The Wandering Quill, I bring you authentic, first-hand
                stories and detailed travel guides from some of the most
                breathtaking destinations in India — from the snow-capped peaks
                of Gulmarg to the serene shikaras on Dal Lake, and the ancient
                heritage trails of the greater Himalayan range.
              </p>
              <p>
                Whether you're planning your first trip to Kashmir or dreaming
                of a Himalayan adventure, I'm here to help you discover the
                hidden gems and create unforgettable journeys. Feel free to
                reach out — I'd love to plan your perfect Kashmir experience.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Expertise */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          data-ocid="about.skills.section"
          className="mb-16"
        >
          <h3 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
            Areas of Expertise
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {expertise.map(({ label, icon: Icon, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow text-center"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-foreground text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          data-ocid="about.contact_details.section"
          className="mb-16"
        >
          <h3 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
            Contact Information
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {contactDetails.map(({ icon: Icon, label, lines, href }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[oklch(var(--gold)/0.15)] flex items-center justify-center text-[oklch(var(--gold))]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-foreground">{label}</span>
                <div className="text-sm text-muted-foreground space-y-0.5">
                  {lines.map((line, i) =>
                    href && i === 0 ? (
                      <a
                        key={line}
                        href={href}
                        data-ocid={`about.contact.${label.toLowerCase()}.link`}
                        className="block hover:text-[oklch(var(--gold))] transition-colors"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line}>{line}</p>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <div className="text-center bg-[oklch(var(--navy-deep))] rounded-2xl p-10">
          <h3 className="font-display text-2xl font-bold text-white mb-3">
            Plan Your Kashmir Journey
          </h3>
          <p className="text-white/60 mb-6">
            Have a travel query or want to book a customised Kashmir tour? I'd
            love to hear from you.
          </p>
          <a
            href="#/contact"
            data-ocid="about.contact.primary_button"
            className="inline-flex items-center gap-2 bg-[oklch(var(--gold))] text-[oklch(var(--navy-deep))] px-6 py-3 rounded-lg font-semibold hover:bg-[oklch(var(--gold-light))] transition-colors shadow-gold"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
