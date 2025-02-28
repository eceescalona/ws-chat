import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './auth.context';
import { Token, UserDetails } from '@ws-chat/common/src';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [token, setToken] = useState(localStorage.getItem('site') || '');

  const getToken = () => {
    return localStorage.getItem('site');
  };

  const loginWithToken = async (token: string) => {
    if (!token) throw new Error('Token error');
    const res = await fetch(`http://localhost:4000/user/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) throw new Error(res.statusText);
    const userDetails = (await res.json()) as UserDetails & Token;
    login({ ...userDetails, token });
  };

  useEffect(() => {
    if (token && !user) {
      loginWithToken(token).catch((e) => console.error(e));
    }
  }, []);

  const login = (data: UserDetails & Token) => {
    setUser({ id: data.id, name: data.name, email: data.email });
    setToken(token);
    localStorage.setItem('site', data.token);
    return;
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('site');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
