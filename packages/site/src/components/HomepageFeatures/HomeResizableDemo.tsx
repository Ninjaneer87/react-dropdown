import { Resizable } from '@andrejground/lab';
import BrowserOnly from '@docusaurus/BrowserOnly';
import React from 'react';
import styles from './HomeResizableDemo.module.scss';
import clsx from 'clsx';

function HomeResizableDemoContent() {
  const [currentWidthLeft, setCurrentWidthLeft] =
    React.useState<number>(null);
  const [currentWidthRight, setCurrentWidthRight] =
    React.useState<number>(null);

  return (
    <div className={styles.container}>
            <Resizable
              className={clsx(styles.resizable, styles['resizable--right'])}
              minWidth={220}
              initialWidth={220}
              maxWidth={280}
              resizableSide="right"
              name="home-resizable-demo-right"
              onResize={(width) => setCurrentWidthRight(Math.round(width))}
            >
              <div>
                Resizable side: <code>right</code>
              </div>
              <div>
                Min: <code>220px</code>
              </div>
              <div>
                Max: <code>280px</code>
              </div>
              <div>
                Current: <code>{currentWidthRight}px</code>
              </div>
            </Resizable>

            <Resizable
              className={clsx(styles.resizable, styles['resizable--left'])}
              minWidth={220}
              initialWidth={220}
              maxWidth={280}
              resizableSide="left"
              name="home-resizable-demo-left"
              onResize={(width) => setCurrentWidthLeft(Math.round(width))}
            >
              <div>
                Resizable side: <code>left</code>
              </div>
              <div>
                Min: <code>220px</code>
              </div>
              <div>
                Max: <code>280px</code>
              </div>
              <div>
                Current: <code>{currentWidthLeft}px</code>
              </div>
            </Resizable>
    </div>
  );
}

function HomeResizableDemo() {
  return <BrowserOnly>{() => <HomeResizableDemoContent />}</BrowserOnly>;
}

export default HomeResizableDemo;
