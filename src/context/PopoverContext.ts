import { createContext, useContext } from 'react';

type PopoverContextType = {
  isOpen: boolean;
  handleClose: () => void;
};

export const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopoverContext = () => useContext(PopoverContext);
