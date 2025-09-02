import { createContext, useContext } from 'react';

type PopoverRootContextType = {
  rootPopoverId: string;
  isRootOpen: boolean;
  handleCloseRoot: () => void;
};

export const PopoverRootContext = createContext<PopoverRootContextType | null>(
  null,
);

export const usePopoverRootContext = () => useContext(PopoverRootContext);
