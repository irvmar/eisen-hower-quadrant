'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "This tool has completely transformed how I manage my daily tasks. The AI categorization is spot-on!",
    author: "Sarah Chen",
    role: "Product Manager"
  },
  {
    quote: "Finally, a task management system that actually helps me focus on what's important.",
    author: "Michael Roberts",
    role: "Software Engineer"
  },
  {
    quote: "The interface is beautiful and intuitive. It's become an essential part of my workflow.",
    author: "Emma Thompson",
    role: "Creative Director"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-32 border-t border-white/[0.06] bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-medium text-white">Loved by professionals</h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            See what others are saying about their experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]"
            >
              <p className="text-white/80 mb-6 text-lg">"{testimonial.quote}"</p>
              <div>
                <p className="text-white font-medium">{testimonial.author}</p>
                <p className="text-white/60 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 