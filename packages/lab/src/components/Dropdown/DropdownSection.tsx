import { useDropdownContext } from '../../context/DropdownContext';
import { useDropdownMenuContext } from '../../context/DropdownMenuContext';
import { usePopoverContext } from '../../context/PopoverContext';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { DropdownSectionProps } from '../../types';
import { cn } from '../../utils/common';

function DropdownSection({
  children,
  scrolling,
  title,
  isStickyTitle = true,
  infiniteScrollProps,
  classNames,
}: DropdownSectionProps) {
  const dropdownContext = useDropdownContext();
  const popoverContext = usePopoverContext();
  const dropdownMenuContext = useDropdownMenuContext();

  if (!dropdownContext) {
    throw new Error(
      'DropdownSection should be used within a Dropdown component',
    );
  }
  if (!popoverContext) {
    throw new Error(
      'DropdownSection should be used within a Popover component',
    );
  }

  if (!dropdownMenuContext) {
    throw new Error(
      'DropdownSection should be used within a DropdownMenu component',
    );
  }

  const { classNames: contextClassNames } = dropdownContext;

  const { isOpen } = popoverContext;

  const [loaderRef, scrollerRef] = useInfiniteScroll<never, HTMLDivElement>({
    hasMore: infiniteScrollProps?.hasMore,
    isEnabled: isOpen && !!infiniteScrollProps,
    onLoadMore: () => infiniteScrollProps?.onLoadMore(),
  });

  const baseClassName = cn(
    'bg-inherit',
    scrolling ? 'max-h-[250px] overflow-y-auto scroll-pt-12' : '',
  );

  const titleClassName = cn(
    'bg-gray-100 p-1 mb-2 text-sm font-semibold text-gray-400',
    isStickyTitle ? 'sticky top-0 z-10 rounded-sm' : '',
  );

  return (
    <div
      className={cn(
        baseClassName,
        contextClassNames?.section?.base,
        classNames?.base,
      )}
      ref={scrollerRef}
    >
      {title && (
        <div
          className={cn(
            titleClassName,
            contextClassNames?.section?.title,
            classNames?.title,
          )}
        >
          {title}
        </div>
      )}
      {children}
      {infiniteScrollProps?.hasMore && <div ref={loaderRef} />}
    </div>
  );
}

export default DropdownSection;
