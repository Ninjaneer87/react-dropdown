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
import SiteDropdown from '@site/src/components/lib/SiteDropdown/SiteDropdown';
import HomeSelectDemo from '@site/src/components/HomepageFeatures/HomeSelectDemo';
import HomeDropdownDemo from '@site/src/components/HomepageFeatures/HomeDropdownDemo';
import HomePopoverDemo from '@site/src/components/HomepageFeatures/HomePopoverDemo';
import HomeResizableDemo from '@site/src/components/HomepageFeatures/HomeResizableDemo';

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
      {/* <WaveSvg /> */}
      <Logo background />
      <div className="container">
        <section className={styles.featureSection}>
          <Heading as="h2" className={styles.featureSectionHeading}>
            Inside the{' '}
            <span className={styles['featureSectionHeading--primary']}>
              toolbox
            </span>
          </Heading>

          <p className={styles.featureSectionDescription}>
            Explore the hooks, components, utilities, tips and tricks you need
            or didn't know you needed.
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
                <Link to="/docs/select">Select</Link>
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
                <Link to="/docs/dropdown">Dropdown</Link>
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
                <Link to="/docs/popover">Popover</Link>
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
                <Link to="/docs/resizable">Resizable</Link>
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
      </div>
    </section>
  );
}
