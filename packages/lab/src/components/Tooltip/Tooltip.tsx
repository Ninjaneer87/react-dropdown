'use client';

import { forwardRef, useState } from 'react';
import { TooltipProps } from '../../types';
import Popover from '../Popover/Popover';
import { cn } from '../../utils/common';

const Tooltip = forwardRef<HTMLElement, TooltipProps>(
  (
    {
      children,
      content,
      shouldFlip = true,
      shouldCloseOnClickOutside = true,
      shouldCloseOnEsc = true,
      isDisabled,
      isOpen: controlledIsOpen,
      onOpen,
      onClose,
      onTriggerFocus,
      onTriggerBlur,
      onClickOutside,
      onOpenChange,
      placement = 'top-center',
      offset = 8,
      showArrow = true,
      delayShow = 0,
      hoverableContent = false,
      delayHide = hoverableContent ? 200 : 0,
      classNames,
      triggerWrapper,
      fullWidthTriggerWrapper,
      openOnFocus = true,
      size = 'small',
      shouldCloseOnTriggerBlur = true,
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = controlledIsOpen ?? isOpen;

    if (!children) {
      throw new Error('Tooltip component requires a child element as trigger');
    }

    if (!content) {
      throw new Error('Tooltip component requires a content prop');
    }

    const contentClassName = cn(
      'px-2 py-1 text-[0.875rem] bg-gray-900 text-white rounded shadow-md',
      classNames?.content,
    );

    return (
      <Popover
        size={size}
        openOnHover
        openOnFocus={openOnFocus}
        shouldFlip={shouldFlip}
        shouldBlockScroll={false}
        shouldCloseOnScroll={false}
        shouldCloseOnClickOutside={shouldCloseOnClickOutside}
        shouldCloseOnEsc={shouldCloseOnEsc}
        shouldCloseOnTriggerBlur={shouldCloseOnTriggerBlur}
        backdrop="none"
        focusTriggerOnClose={false}
        placement={placement}
        offset={offset}
        isDisabled={isDisabled}
        isOpen={open}
        delayShow={delayShow}
        delayHide={delayHide}
        showArrow={showArrow}
        hoverableContent={hoverableContent}
        triggerWrapper={triggerWrapper}
        fullWidthTriggerWrapper={fullWidthTriggerWrapper}
        classNames={{
          ...classNames,
          content: contentClassName,
        }}
        onTriggerFocus={onTriggerFocus}
        onTriggerBlur={onTriggerBlur}
        focusTrapProps={{
          autoFocus: false,
          trapFocus: false,
        }}
        onOpen={() => {
          setIsOpen(true);
          if (onOpen) onOpen();
        }}
        onClose={() => {
          setIsOpen(false);
          if (onClose) onClose();
        }}
        onClickOutside={(event) => {
          setIsOpen(false);
          if (onClickOutside) onClickOutside(event);
        }}
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);
          if (onOpenChange) onOpenChange(isOpen);
        }}
      >
        <Popover.Trigger data-tooltip-trigger {...rest} ref={ref}>
          {children}
        </Popover.Trigger>
        <Popover.Content data-tooltip-content>{content}</Popover.Content>
      </Popover>
    );
  },
);

export default Tooltip;
