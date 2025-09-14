import { createContext, useContext } from 'react';

type SelectMenuContextType = {
  setFocusedIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const SelectMenuContext = createContext<SelectMenuContextType | null>(
  null,
);

export const useSelectMenuContext = () => useContext(SelectMenuContext);
