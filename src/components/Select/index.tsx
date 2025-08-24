import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OptionItem, SelectCompositionProps, SelectProps } from '../../types';
import SelectDivider from './SelectDivider';
import SelectItem from './SelectItem';
import SelectSection from './SelectSection';
import Popover from '../Popover';
import { SelectContext, SelectContextType } from '../../context/SelectContext';
import SelectMenu from './SelectMenu';
import CaretIcon from '../ui/CaretIcon';
import { cn } from '../../utils/common';

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
  classNames,
  label,
  isRequired,
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
  const baseRef = useRef<HTMLDivElement | null>(null);

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

  const popoverContentClassName = cn('p-0');
  const baseClassName = cn(
    fullWidth ? 'w-full' : '',
    isDisabled ? 'opacity-60' : '',
  );
  const labelClassName = cn('mb-1');
  const placeholderClassName = cn('grow flex items-center opacity-60');
  const requiredAsteriskClassName = cn('text-red-700 ml-1');
  const triggerClassName = cn('w-full grow relative');
  const mainWrapperClassName = cn(
    'rounded-lg border p-2 grow flex items-center gap-2',
  );
  const selectorIconClassName = cn('ml-auto');
  const listboxClassName = cn(
    'max-h-[250px] overflow-y-auto relative  scroll-pt-12',
  );
  const helperWrapperClassName = cn('text-xs mt-1');
  const descriptionClassName = cn('opacity-60');
  const errorMessageClassName = cn('text-red-700');

  const showPlaceholder = !selected.length;

  const showValue = !!selected.length;

  const baseWidth = baseRef.current
    ? window.getComputedStyle(baseRef.current).width
    : 'initial';

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={cn(baseClassName, classNames?.base)} ref={baseRef}>
        {label && (
          <div
            className={cn(labelClassName, classNames?.label)}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {label}
            {isRequired && (
              <span
                className={cn(
                  requiredAsteriskClassName,
                  classNames?.requiredAsterisk,
                )}
              >
                *
              </span>
            )}
          </div>
        )}

        <Popover
          fullWidth
          shouldFlip={shouldFlip}
          shouldBlockScroll={shouldBlockScroll}
          shouldCloseOnScroll={shouldCloseOnScroll}
          shouldCloseOnBlur={shouldCloseOnBlur}
          shouldCloseOnEsc={shouldCloseOnEsc}
          backdrop={backdrop}
          focusTriggerOnClose
          placement="bottom-center"
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
            console.log({ selected });
            if (onClose) onClose(selected);
          }}
          onBlur={() => {
            if (onBlur) onBlur();
          }}
          onOpenChange={(isOpen) => {
            setIsOpen(isOpen);
            if (onOpenChange) onOpenChange(isOpen);
          }}
          classNames={{
            content: cn(popoverContentClassName, classNames?.popoverContent),
          }}
        >
          <Popover.Trigger>
            {trigger ? (
              trigger
            ) : (
              <div className={cn(triggerClassName, classNames?.trigger)}>
                <div
                  className={cn(mainWrapperClassName, classNames?.mainWrapper)}
                >
                  {showPlaceholder && (
                    <div
                      className={cn(
                        placeholderClassName,
                        classNames?.placeholder,
                      )}
                    >
                      {placeholder ?? 'Select'}
                    </div>
                  )}

                  {showValue && (
                    <div>{selected.map((item) => item.label).join(', ')}</div>
                  )}

                  <div
                    className={cn(
                      selectorIconClassName,
                      classNames?.selectorIcon,
                    )}
                  >
                    <CaretIcon open={open} />
                  </div>
                </div>
              </div>
            )}
          </Popover.Trigger>

          <Popover.Content>
            <div style={{ width: baseWidth }}>
              {topContent && topContent}
              <SelectMenu classNames={{ base: classNames?.listboxWrapper }}>
                <ul className={cn(listboxClassName, classNames?.listbox)}>
                  {typeof children !== 'function' && children}
                  {typeof children === 'function' &&
                    items &&
                    items.map((item) => {
                      const renderedItem = children(item);
                      if (
                        !React.isValidElement(renderedItem) ||
                        renderedItem.type !== SelectItem
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
            </div>
          </Popover.Content>
        </Popover>

        <div className={cn(helperWrapperClassName, classNames?.helperWrapper)}>
          <div className={cn(descriptionClassName, classNames?.description)}>
            Description Description Description Description Description
            Description Description Description Description
          </div>
          <div className={cn(errorMessageClassName, classNames?.errorMessage)}>
            Error
          </div>
        </div>
      </div>
    </SelectContext.Provider>
  );
}

Select.Section = SelectSection;
Select.Item = SelectItem;
Select.Divider = SelectDivider;

export default Select;
