'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="h-12 w-12 rounded-full border-2 border-gray-800 border-t-gray-400 animate-spin"></div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default PrivateRoute; 