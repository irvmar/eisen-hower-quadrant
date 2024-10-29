'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CTASection = () => {
  const { user } = useAuth();
  const getStartedLink = user ? '/matrix' : '/login';

  return (
    <section className="py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-medium text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who are already managing their tasks more effectively
          </p>
          <Link
            href={getStartedLink}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white 
              text-black font-medium hover:bg-white/90 transition-all"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection; 