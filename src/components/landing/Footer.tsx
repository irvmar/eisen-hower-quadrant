import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.06] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Eisenhower</h3>
            <p className="text-white/60 text-sm">
              Prioritize tasks effectively with AI-powered organization
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-white/60 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">Features</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">API</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">Integration</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">Guides</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">About</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacy</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Eisenhower Matrix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 