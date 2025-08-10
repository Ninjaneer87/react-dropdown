import React, { useEffect, useMemo, useState } from 'react';
import { OptionItem, SelectCompositionProps, SelectProps } from '../../types';
import SelectDivider from './SelectDivider';
import SelectItem from './SelectItem';
import SelectSection from './SelectSection';
import Popover from '../Popover';
import { SelectContext, SelectContextType } from '../../context/SelectContext';
import SelectMenu from './SelectMenu';

function Select<T extends OptionItem>({
  // caret,
  children,
  trigger,
  shouldFlip = true,
  shouldBlockScroll = true,
  shouldCloseOnScroll = !shouldBlockScroll,
  shouldCloseOnBlur = true,
  shouldCloseOnEsc = true,
  backdrop,
  placement = 'bottom-center',
  isDisabled,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onBlur,
  onOpenChange,
  fullWidth = false,
  // showCaret,
  growContent,
  offset,
  topContent,
  bottomContent,
  items,
  onSelectionChange,
  multiple = false,
  renderOption,
  placeholder = 'Select',
  value,
  defaultValue,
}: SelectProps<T> & SelectCompositionProps<T>) {
  if (items && children && typeof children !== 'function') {
    throw new Error(
      'Invalid items configuration. Use only "items" prop (can be used with "children" as function) or only "children" as ReactNode, not both.',
    );
  }

  if (!items && !children) {
    throw new Error(
      'Options are missing.Provide either "items" prop or "children".',
    );
  }

  // Validate children
  if (children && typeof children !== 'function') {
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      if (child.type !== SelectSection && child.type !== SelectItem) {
        throw new Error(
          `"Select" component only accepts "SelectSection" and "SelectItem" components as children`,
        );
      }
    });
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T[]>([]);
  const [hasMountedDefaultValue, setHasMountedDefaultValue] = useState(false);

  const open = controlledIsOpen ?? isOpen;

  useEffect(() => {
    if (!value) return;

    setSelected(value);
  }, [value]);

  useEffect(() => {
    if (!defaultValue || !defaultValue.length || hasMountedDefaultValue) return;

    setSelected(defaultValue);
    setHasMountedDefaultValue(true);
  }, [defaultValue, hasMountedDefaultValue]);

  const contextValue: SelectContextType<T> = useMemo(
    () => ({
      multiple,
      onSelectionChange,
      setSelected,
      selected,
      renderOption,
    }),
    [multiple, onSelectionChange, setSelected, selected, renderOption],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <Popover
        fullWidth={fullWidth}
        shouldFlip={shouldFlip}
        shouldBlockScroll={shouldBlockScroll}
        shouldCloseOnScroll={shouldCloseOnScroll}
        shouldCloseOnBlur={shouldCloseOnBlur}
        shouldCloseOnEsc={shouldCloseOnEsc}
        backdrop={backdrop}
        focusTriggerOnClose
        placement={placement}
        isDisabled={isDisabled}
        isOpen={open}
        growContent={growContent}
        offset={offset}
        onOpen={() => {
          setIsOpen(true);
          if (onOpen) onOpen();
        }}
        onClose={() => {
          setIsOpen(false);
          if (onClose) onClose();
        }}
        onBlur={() => {
          if (onBlur) onBlur();
        }}
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);
          if (onOpenChange) onOpenChange(isOpen);
        }}
      >
        <Popover.Trigger>
          {trigger ? (
            trigger
          ) : (
            <div className="rounded-lg border p-2 flex items-center gap-2">
              {placeholder ?? 'Select'}
              <svg
                aria-hidden="true"
                fill="none"
                focusable="false"
                height="1em"
                role="presentation"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="1em"
                data-open={open}
                className="w-4 h-4 transition-transform duration-150 ease motion-reduce:transition-none data-[open=true]:rotate-180"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          )}
        </Popover.Trigger>

        <Popover.Content>
          {topContent && topContent}
          <SelectMenu>
            <ul className="max-h-[250px] overflow-y-auto relative  scroll-pt-12">
              {typeof children !== 'function' && children}
              {typeof children === 'function' &&
                items &&
                items.map((item) => {
                  const renderedItem = children(item);
                  if (
                    !React.isValidElement(renderedItem) ||
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (renderedItem as any).type !== SelectItem
                  ) {
                    throw new Error(
                      `"Select" children function only accepts "SelectItem" as a root returned element`,
                    );
                  }

                  return renderedItem;
                })}

              {!children &&
                items &&
                items.map((item) => (
                  <SelectItem key={item.value} {...item}>
                    {item.label}
                  </SelectItem>
                ))}
            </ul>
          </SelectMenu>
          {bottomContent && bottomContent}
        </Popover.Content>
      </Popover>
    </SelectContext.Provider>
  );
}

Select.Section = SelectSection;
Select.Item = SelectItem;
Select.Divider = SelectDivider;

export default Select;
