import { createContext, useContext } from 'react';

type PopoverContextType = {
  popoverId: string;
  isOpen: boolean;
  handleClose: (focusTrigger?: boolean) => void;
  handleOpen: () => void;
};

export const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopoverContext = () => useContext(PopoverContext);
