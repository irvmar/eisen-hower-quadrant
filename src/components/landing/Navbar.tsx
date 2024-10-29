'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-medium text-lg">
              Eisenhower
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/customers" className="text-sm text-white/60 hover:text-white transition-colors">
              Customers
            </Link>
            <Link href="/docs" className="text-sm text-white/60 hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="text-sm px-4 py-2 rounded-full bg-white text-black hover:bg-white/90 
                transition-all font-medium"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 