import { createContext } from 'react';

export const myUserContext = createContext({ user: null, setUser: () => {} });
