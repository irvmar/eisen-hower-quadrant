'use client';

import { motion } from 'framer-motion';
import { Clock, Target, Shield, Zap } from 'lucide-react';

const benefits = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Save Time",
    description: "Reduce decision fatigue and spend less time organizing, more time doing"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Stay Focused",
    description: "Clear prioritization helps you focus on what truly matters"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Reduce Stress",
    description: "Know exactly what needs your attention and what can wait"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Boost Productivity",
    description: "Complete tasks efficiently by tackling them in the right order"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-medium text-white">Why Choose Eisenhower Matrix?</h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Experience the benefits of structured task management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
            >
              <div className="text-white/80 mb-4">{benefit.icon}</div>
              <h3 className="text-white font-medium text-lg mb-2">{benefit.title}</h3>
              <p className="text-white/60">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection; 