import { Token, UserDetails } from '@ws-chat/common/src';
import { createContext } from 'react';

interface AuthContextType {
  user: UserDetails | null;
  login: (data: UserDetails & Token) => void;
  logout: () => void;
  getToken: () => string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
