import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { OnSelectionChange, OptionItem, SelectTruncate } from '../types';

export type SelectContextType<T extends OptionItem = OptionItem> = {
  multiple: boolean;
  onSelectionChange: OnSelectionChange<T>;
  setSelected: Dispatch<SetStateAction<T[]>>;
  selected: T[];
  renderOption?: (option: T) => React.ReactNode;
  truncate?: SelectTruncate;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectContext = createContext<SelectContextType<any> | null>(null);

export const useSelectContext = <T extends OptionItem>() =>
  useContext(SelectContext) as SelectContextType<T> | null;
