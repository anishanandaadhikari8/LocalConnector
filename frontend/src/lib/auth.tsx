import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { api } from './api';

type User = { userId: number; name: string; role: 'RESIDENT' | 'ADMIN' | 'SECURITY'; unit?: string };

type AuthCtx = {
  token: string | null;
  user: User | null;
  signInDev: (u: Omit<User, 'userId'> & { userId: number }) => Promise<void>;
  signOut: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth must be inside AuthProvider');
  return c;
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const signInDev = useCallback(async (u: Omit<User, 'userId'> & { userId: number }) => {
    const res = await api.devMint({ userId: u.userId, name: u.name, role: u.role, unit: u.unit });
    setToken(res.token);
    setUser({ ...u });
  }, []);

  const signOut = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ token, user, signInDev, signOut }), [token, user, signInDev, signOut]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
