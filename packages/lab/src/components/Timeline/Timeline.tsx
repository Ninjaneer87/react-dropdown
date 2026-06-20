'use client';

import { forwardRef } from 'react';
import { TimelineProps } from '@/types';
import { cn } from '@/utils/common';
import styles from '@/components/Timeline/Timeline.module.scss';

const Timeline = forwardRef<HTMLUListElement, TimelineProps>(
  (
    {
      items,
      variant = 'default',
      showPulseOnActiveStep = true,
      activeDotContent,
      dotContent,
      renderDot,
      classNames,
    },
    ref,
  ) => {
    const activeIndex = items.findIndex((item) => item.isActive);
    const resolvedActiveIndex = activeIndex === -1 ? 0 : activeIndex;

    return (
      <ul
        ref={ref}
        className={cn(styles.timeline, classNames?.base)}
        data-variant={variant}
        data-timeline
      >
        {items.map((item, index) => {
          const isActive = index === resolvedActiveIndex;
          const isPast = index > resolvedActiveIndex;
          const isFuture = index < resolvedActiveIndex;
          const isLast = index === items.length - 1;

          const dotCtx = { item, index, isActive, isPast, isFuture };

          let resolvedDotContent: React.ReactNode;

          if (renderDot) {
            resolvedDotContent = renderDot(dotCtx);
          } else if (item.dotContent !== undefined) {
            resolvedDotContent = item.dotContent;
          } else if (isActive && activeDotContent !== undefined) {
            resolvedDotContent = activeDotContent;
          } else if (!isActive && dotContent !== undefined) {
            resolvedDotContent = dotContent;
          } else {
            resolvedDotContent =
              variant === 'simple' ? null : (
                <span className={cn(styles.dotDefaultInner, classNames?.dotDefaultInner, item.classNames?.dotDefaultInner)} />
              );
          }

          const isCustomDot =
            renderDot !== undefined ||
            item.dotContent !== undefined ||
            (isActive && activeDotContent !== undefined) ||
            (!isActive && dotContent !== undefined);

          return (
            <li
              key={item.name}
              className={cn(
                styles.item,
                classNames?.item,
                item.classNames?.item,
              )}
              data-timeline-item
              {...(isActive ? { 'data-active': '' } : undefined)}
              {...(isPast ? { 'data-past': '' } : undefined)}
              {...(isFuture ? { 'data-future': '' } : undefined)}
            >
              <div className={cn(styles.dotColumn, classNames?.dotColumn, item.classNames?.dotColumn)}>
                <span className={cn(styles.dotAlignWrapper, classNames?.dotAlignWrapper, item.classNames?.dotAlignWrapper)}>
                  <span
                    className={cn(
                      styles.dot,
                      !isCustomDot &&
                        (variant === 'simple'
                          ? styles.dotSimple
                          : styles.dotDefault),
                      !isCustomDot && isFuture && styles.dotDashed,
                      !isActive && styles.inactive,
                      isActive && showPulseOnActiveStep && styles.pulse,
                      classNames?.dot,
                      item.classNames?.dot,
                    )}
                    data-timeline-dot
                    {...(isActive ? { 'data-active': '' } : undefined)}
                  >
                    {resolvedDotContent}
                  </span>
                </span>

                {!isLast && (
                  <span
                    className={cn(
                      styles.line,
                      isFuture && styles.lineDashed,
                      styles.inactive,
                      classNames?.line,
                      item.classNames?.line,
                    )}
                    data-timeline-line
                    {...(isPast ? { 'data-past': '' } : undefined)}
                    {...(isFuture ? { 'data-future': '' } : undefined)}
                  />
                )}
              </div>

              <div
                className={cn(
                  styles.content,
                  classNames?.content,
                  item.classNames?.content,
                )}
                data-timeline-content
              >
                {item.content}
              </div>
            </li>
          );
        })}
      </ul>
    );
  },
);

Timeline.displayName = 'Timeline';

export default Timeline;
