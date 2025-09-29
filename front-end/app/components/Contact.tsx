// components/Contact.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, Twitter, Linkedin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-gray-800/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300">
            Ready to revolutionize your real estate experience? Contact us today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 focus:shadow-lg focus:shadow-blue-400/10"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 focus:shadow-lg focus:shadow-blue-400/10"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Message</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-2xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 focus:shadow-lg focus:shadow-blue-400/10 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-lg font-semibold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-400/30 transition-all duration-300"
              >
                Send Message
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-300">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">hello@drearl.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Support</div>
                    <div className="text-gray-300">24/7 Live Chat</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold mb-6">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: Twitter, color: "from-blue-400 to-blue-600", name: "Twitter" },
                  { icon: Linkedin, color: "from-blue-500 to-blue-700", name: "LinkedIn" },
                  { icon: Send, color: "from-cyan-400 to-cyan-600", name: "Telegram" }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className={`p-4 bg-gradient-to-br ${social.color} rounded-xl hover:shadow-lg transition-all duration-300`}
                  >
                    <social.icon className="w-6 h-6 text-white" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;