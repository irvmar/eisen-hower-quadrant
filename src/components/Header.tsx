'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../services/auth';

const Header: React.FC = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="w-full border-b border-white/[0.1] bg-black sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-medium text-white">
            Eisenhower Matrix
          </h1>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/80"></div>
        </div>
        {user && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></div>
              <span className="text-sm text-white/70">
                {user.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-white/70 hover:text-white
              border border-white/[0.1] rounded-md
              hover:border-white/[0.2] transition-colors
              bg-white/[0.02] hover:bg-white/[0.05]"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header; 