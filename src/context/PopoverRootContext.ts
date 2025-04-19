import { createContext, useContext } from 'react';

type PopoverRootContextType = {
  isRootOpen: boolean;
  handleCloseRoot: () => void;
};

export const PopoverRootContext = createContext<PopoverRootContextType | null>(
  null,
);

export const usePopoverRootContext = () => useContext(PopoverRootContext);
