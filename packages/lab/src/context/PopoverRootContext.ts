import { createContext, useContext } from 'react';

type PopoverRootContextType = {
  rootPopoverId: string;
  isRootOpen: boolean;
  handleCloseRoot: (focusTrigger?: boolean) => void;
};

export const PopoverRootContext = createContext<PopoverRootContextType | null>(
  null,
);

export const usePopoverRootContext = () => useContext(PopoverRootContext);
