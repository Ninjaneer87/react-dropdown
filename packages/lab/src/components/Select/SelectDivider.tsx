import { useSelectContext } from '@/context/SelectContext';
import { SelectDividerProps } from '@/types';
import { cn } from '@/utils/common';
import { dividerBaseClassName } from '@/utils/elements';

function SelectDivider({ classNames }: SelectDividerProps) {
  const selectContext = useSelectContext();
  const { dividerClassNames: contextClassNames } = selectContext || {};

  return (
    <div
      data-select-divider
      className={cn(
        dividerBaseClassName,
        contextClassNames?.base,
        classNames?.base,
      )}
    />
  );
}

export default SelectDivider;
