import { createContext, useContext } from 'react';

type DropdownContextType = {
  shouldCloseOnSelection?: boolean;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdownContext = () => useContext(DropdownContext);
