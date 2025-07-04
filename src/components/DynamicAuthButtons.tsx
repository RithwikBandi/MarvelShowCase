import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface DynamicAuthButtonsProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  sectionIds: string[];
}

export const DynamicAuthButtons = ({ onOpenAuth, sectionIds }: DynamicAuthButtonsProps) => {
  const { user } = useAuth();

  if (user) {
    return null;
  }

  return (
    <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 flex flex-col gap-3 sm:gap-4 z-50">
      <button
        onClick={() => onOpenAuth('login')}
        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-red-500/25 transition-all hover:scale-105"
      >
        Sign In
      </button>
      <button
        onClick={() => onOpenAuth('signup')}
        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-red-500/25 transition-all hover:scale-105"
      >
        Sign Up
      </button>
    </div>
  );
}; 