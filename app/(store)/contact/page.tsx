"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  ChevronDown, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  MessageSquare,
  Instagram,
  Facebook,
  Linkedin,
  Send
} from "lucide-react";
import toast from "react-hot-toast";

const faqData = [
  {
    question: "What is your minimum order quantity?",
    answer: "Our minimum order quantity starts at 50 units per product. For custom OEM orders, MOQ may vary based on the product type and customization required."
  },
  {
    question: "Do you offer custom branding/OEM?",
    answer: "Yes! We offer full OEM and private label services. You can add your own logo, choose custom colors and request custom packaging. Contact us for details."
  },
  {
    question: "Which countries do you ship to?",
    answer: "We ship to 30+ countries worldwide including Middle East, Europe, USA, Canada and Australia via DHL and FedEx."
  },
  {
    question: "How long does production take?",
    answer: "Standard production takes 7-14 business days depending on order size. Rush orders can be accommodated — contact us for availability."
  },
  {
    question: "Can I request product samples?",
    answer: "Yes, sample orders are available. Contact us with your requirements and we will arrange samples for your review before bulk ordering."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Cash on Delivery for local orders. For international export orders contact us via WhatsApp or email for payment arrangements."
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const WHATSAPP_NUMBER = "923216146452";

  return (
    <div className="bg-[#1A1A1A] text-white min-h-screen">
      {/* SECTION 1 — HERO BANNER */}
      <section className="py-20 bg-neutral-900 border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-neutral-400 mb-6 font-body">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Contact</span>
          </nav>
          <motion.h1 
            {...fadeIn}
            className="text-5xl md:text-7xl font-athletic font-bold italic tracking-tighter mb-4"
          >
            CONTACT <span className="text-primary">US</span>
          </motion.h1>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-300 font-body max-w-2xl"
          >
            Get in touch with our team. We respond within 24 business hours.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2 — CONTACT INFO */}
      <section className="py-24 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="bg-[#242424] p-8 rounded-2xl border border-neutral-800 hover:border-primary/50 transition-colors">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-primary/20 p-3 rounded-lg text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-athletic font-bold uppercase tracking-wider">LOCATION</h3>
              </div>
              <p className="text-neutral-300 font-body">Lahore, Punjab, Pakistan</p>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-[#242424] p-8 rounded-2xl border border-neutral-800 hover:border-primary/50 transition-colors">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-primary/20 p-3 rounded-lg text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-athletic font-bold uppercase tracking-wider">EMAIL</h3>
              </div>
              <a href="mailto:exports@meharstare.com" className="text-neutral-300 font-body hover:text-primary transition-colors block">
                exports@meharstare.com
              </a>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="bg-[#242424] p-8 rounded-2xl border border-neutral-800 hover:border-primary/50 transition-colors">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-primary/20 p-3 rounded-lg text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-athletic font-bold uppercase tracking-wider">PHONE / WHATSAPP</h3>
              </div>
              <p className="text-neutral-300 font-body mb-4">+92 321 6146452</p>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors font-athletic font-bold uppercase tracking-widest text-xs"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="bg-[#242424] p-8 rounded-2xl border border-neutral-800 hover:border-primary/50 transition-colors">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-primary/20 p-3 rounded-lg text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-athletic font-bold uppercase tracking-wider">BUSINESS HOURS</h3>
              </div>
              <div className="text-neutral-300 font-body space-y-1">
                <p>Monday - Saturday</p>
                <p>9:00 AM - 6:00 PM (PKT)</p>
                <p className="text-primary text-sm font-bold mt-2 italic">"We respond to emails 24/7"</p>
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.5 }} className="bg-[#242424] p-8 rounded-2xl border border-neutral-800 hover:border-primary/50 transition-colors lg:col-span-2">
              <h3 className="text-xl font-athletic font-bold uppercase tracking-wider mb-6">FOLLOW US</h3>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" }
                ].map((social, i) => (
                  <Link key={i} href={social.href} className="bg-neutral-800 px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-primary hover:text-white transition-all group">
                    <social.icon className="h-5 w-5" />
                    <span className="font-athletic uppercase tracking-widest text-sm font-bold">{social.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FAQ SECTION */}
      <section className="py-24 bg-neutral-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2 
            {...fadeIn}
            className="text-4xl font-athletic font-bold text-center mb-16 tracking-tight"
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#242424] border border-neutral-800 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="text-lg font-athletic font-bold tracking-wide uppercase">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-primary transition-transform duration-300 ${expandedFaq === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-neutral-400 font-body leading-relaxed border-t border-neutral-800/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHATSAPP CTA BANNER */}
      <section className="py-20 bg-[#1A1A1A] border-t border-neutral-800">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            {...fadeIn}
            className="text-4xl font-athletic font-bold mb-4 tracking-tight"
          >
            PREFER TO CHAT DIRECTLY?
          </motion.h2>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 font-body mb-10"
          >
            Message us on WhatsApp for faster response
          </motion.p>
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-4 bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl transition-all font-athletic font-bold uppercase tracking-[0.2em] text-xl shadow-xl hover:shadow-green-600/20"
          >
            <MessageSquare className="h-8 w-8" />
            <span>CHAT ON WHATSAPP</span>
          </motion.a>
        </div>
      </section>
    </div>
  );
}
