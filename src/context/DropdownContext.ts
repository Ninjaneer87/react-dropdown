import { createContext, useContext } from 'react';
import { ListAutoFocus } from '../types';

type DropdownContextType = {
  shouldCloseOnSelection?: boolean;
  autoFocus?: ListAutoFocus;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdownContext = () => useContext(DropdownContext);
