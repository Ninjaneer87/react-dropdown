import { createContext, useContext } from 'react';
import { DropdownClassNames, ListAutoFocus } from '../types';

type DropdownContextType = {
  shouldCloseOnSelection?: boolean;
  autoFocus?: ListAutoFocus;
  classNames?: DropdownClassNames;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdownContext = () => useContext(DropdownContext);
