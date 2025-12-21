import { createContext, useContext } from 'react';

type DropdownMenuContextType = Record<PropertyKey, unknown>;

export const DropdownMenuContext =
  createContext<DropdownMenuContextType | null>(null);

export const useDropdownMenuContext = () => useContext(DropdownMenuContext);
