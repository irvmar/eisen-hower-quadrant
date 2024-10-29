'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        <div className="relative bg-black rounded-lg max-w-2xl w-full p-6 
          border border-white/[0.1] shadow-2xl">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/[0.05] rounded-md transition-colors"
            >
              <svg
                className="w-5 h-5 text-white/40 hover:text-white/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 