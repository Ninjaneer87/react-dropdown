import { createContext, useContext } from 'react';

type DropdownRootContextType = {
  isRootOpen: boolean;
  handleCloseRoot: () => void;
};

export const DropdownRootContext =
  createContext<DropdownRootContextType | null>(null);

export const useDropdownRootContext = () => useContext(DropdownRootContext);
