import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.scss';
import ByosComponentsSvg from '@site/src/components/HomepageFeatures/ByosComponentsSvg';
import UtilityComponentsSvg from '@site/src/components/HomepageFeatures/UtilityComponentsSvg';
import UseAnythingSvg from '@site/src/components/HomepageFeatures/UseAnythingSvg';
import BlogSvg from '@site/src/components/HomepageFeatures/BlogSvg';
import Link from '@docusaurus/Link';
import Logo from '@site/src/components/Logo';
import HomeSelectDemo from '@site/src/components/HomepageFeatures/HomeSelectDemo';
import HomeDropdownDemo from '@site/src/components/HomepageFeatures/HomeDropdownDemo';
import HomePopoverDemo from '@site/src/components/HomepageFeatures/HomePopoverDemo';
import HomeResizableDemo from '@site/src/components/HomepageFeatures/HomeResizableDemo';
import WaveSvg from '@site/src/components/HomepageFeatures/WaveSvg';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

type FeatureItem = {
  title: string;
  svgImage?: ReactNode;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'BYOS Components',
    svgImage: <ByosComponentsSvg />,
    description: (
      <>
        <b>B</b>ring <b>Y</b>our <b>O</b>wn <b>S</b>tyles
        <br />
        Bring the components into your own design system. Customize each slot of
        each component to fit your needs.
      </>
    ),
  },
  {
    title: 'Utility Components',
    svgImage: <UtilityComponentsSvg />,
    description: (
      <>
        Handy toolbox of plug-and-play components for ordinary and no-ordinary
        everyday use cases.
      </>
    ),
  },
  {
    title: 'Utility Hooks',
    svgImage: <UseAnythingSvg />,
    description: (
      <>
        Constelation of all sorts of react hooks. Have your reusable pieces of
        logic ready to use across any of your projects.{' '}
      </>
    ),
  },
  {
    title: 'Blog',
    svgImage: <BlogSvg />,
    description: (
      <>
        Guides and tutorials on the latest trends and best practices in React.js
        ecosystem and beyond.
      </>
    ),
  },
];

function Feature({ title, svgImage, description }: FeatureItem) {
  return (
    <Link to="/blog" className={clsx(styles.feature)}>
      <div className={styles.feature__header}>
        <div className={styles.feature__image}>{svgImage}</div>
        <Heading className={styles.feature__heading} as="h3">
          {title}
        </Heading>
      </div>

      <div className="padding-horiz--md">
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <Logo background />
      <WaveSvg />

      <div className="container">
        <section className={styles.featureSection}>
          <Heading as="h2" className={styles.featureSectionHeading}>
            Take a{' '}
            <span className={styles['featureSectionHeading--primary']}>
              look inside
            </span>
          </Heading>

          <p className={styles.featureSectionDescription}>
            Explore the hooks, components, utilities, tips and tricks you need
            or didn't know you need.
          </p>

          <div className={styles.featuresRow}>
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </section>

        <section className={styles.featureSection}>
          <Heading as="h2" className={styles.featureSectionHeading}>
            Fresh from the{' '}
            <span className={styles['featureSectionHeading--primary']}>
              lab
            </span>
          </Heading>

          <p className={styles.featureSectionDescription}>
            See some of the latest experiments and ideas in action.
          </p>

          <div className="row">
            <div className="col col--6 padding--md">
              <Heading as={'h3'}>
                <Link to="/blog">Select</Link>
              </Heading>
              <p>
                Powerful select component with built-in support for some of the
                most common use cases, like multiselect, infinite-scroll,
                autocomplete, keyboard navigation, controlled/uncontrolled and
                more.
              </p>

              <div>
                <HomeSelectDemo />
              </div>
            </div>

            <div className="col col--6 padding--md">
              <Heading as="h3">
                <Link to="/blog">Dropdown</Link>
              </Heading>
              <p>
                Highly customizable dropdown with features like infinite-scroll,
                nested dropdowns, keyboard navigation, and more.
              </p>

              <div>
                <HomeDropdownDemo />
              </div>
            </div>

            <div className="col col--6 padding--md">
              <Heading as="h3">
                <Link to="/blog">Popover</Link>
              </Heading>
              <p>
                Mighty popover, the underlying component for Select and
                Dropdown. Can be used as a tooltip.
              </p>

              <div>
                <HomePopoverDemo />
              </div>
            </div>

            <div className="col col--6 padding--md">
              <Heading as="h3">
                <Link to="/blog">Resizable</Link>
              </Heading>
              <p>
                Resize horizontally any section or an element. Useful for side
                panels, toolbars or any horizontally stacked sections.
              </p>

              <div>
                <HomeResizableDemo />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.featureSection}>
          <Heading as="h2" className={styles.featureSectionHeading}>
            Use the lab in{' '}
            <span className={styles['featureSectionHeading--primary']}>
              your project
            </span>{' '}
            now
          </Heading>

          <p className={styles.featureSectionDescription}>
            AndrejGround Lab is available as an{' '}
            <Link to="docs/getting-started/installation#install-as-npm-package">
              NPM package
            </Link>
            . Set it up in these two steps:
          </p>

          <div className="row">
            <div className="col col--6 padding--md">
              <Heading as="h3">1. Install the package</Heading>

              <Tabs groupId="package-manager">
                <TabItem value="npm" label="npm" default>
                  <CodeBlock language="bash">
                    npm install @andrejground/lab
                  </CodeBlock>
                </TabItem>
                <TabItem value="pnpm" label="pnpm">
                  <CodeBlock language="bash">
                    pnpm install @andrejground/lab
                  </CodeBlock>
                </TabItem>
                <TabItem value="yarn" label="Yarn">
                  <CodeBlock language="bash">
                    yarn add @andrejground/lab
                  </CodeBlock>
                </TabItem>
              </Tabs>
            </div>

            <div className="col col--6 padding--md">
              <Heading as="h3">
                2. Import the styles in the root of your app
              </Heading>

              <CodeBlock language="tsx" title="App.tsx">
                {`//...
// add-next-line
import '@andrejground/lab/style.css';
//...`}
              </CodeBlock>
            </div>
          </div>
          <p>Happy coding! 🫡</p>
        </section>
      </div>
    </section>
  );
}
