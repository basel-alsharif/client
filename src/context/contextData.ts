import { createContext } from 'react';
import { UserDataContextValue } from './types';

const userDataContext = createContext<UserDataContextValue | null>(null);

export default userDataContext;
