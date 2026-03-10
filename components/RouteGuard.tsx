'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingScreen from './ui/LoadingScreen';

interface RouteGuardProps {
  children: React.ReactNode;
  role: string;
  type: 'protected' | 'guest';
  redirectTo?: string;
}

export default function RouteGuard({ children, role, type, redirectTo }: RouteGuardProps) {
  const { token, role: userRole, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    // Protected ROUTES 
    if (type === 'protected') {
      if (!token || userRole !== role) {
        // router.push(redirectTo || `/${role}/login`);
        router.replace(redirectTo || `/${role}/login`);
        return;
      }

      setAuthorized(true);
    }

    // Guest pages (login)
    if (type === 'guest') {
      if (token && userRole === role) {
        router.replace(redirectTo || `/${role}/dashboard`);
        return;
      }

      setAuthorized(true);
    }
    // }, [token, userRole, loading]);
  }, [token, userRole, loading, role, type, redirectTo, router]);

  // Wait until auth is loaded
  if (loading) {
    return <LoadingScreen />;
  }

  // Prevent page render before auth decision
  if (!authorized) return null;

  return <>{children}</>;
}
