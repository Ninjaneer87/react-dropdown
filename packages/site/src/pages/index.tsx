import type { ReactNode } from 'react';
import '@fontsource-variable/montserrat';
import '@andrejground/react-dropdown/style.css';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.scss';
import clsx from 'clsx';
import { TypeAnimation } from 'react-type-animation';
import Logo from '@site/src/components/Logo';
import Icon from '@mdi/react';
import { mdiArrowRightThin } from '@mdi/js';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroRow}>
          <div className="">
            <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
              {siteConfig.tagline}
            </p>

            <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
              <span className={styles['heroTitle--primary']}>Andrej</span>Ground
              <br />
              <TypeAnimation
                className={styles.typing}
                cursor={false}
                sequence={['Lab', 1500, 'Guides', 1500, 'Tutorials', 1500]}
                wrapper="span"
                repeat={Infinity}
              />
            </Heading>
          </div>

          <div className="">
            <Logo />

            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro"
              >
                Get started <Icon path={mdiArrowRightThin} size={1} />
              </Link>
              <Link className="button button--secondary button--lg" to="/blog">
                What's new <Icon path={mdiArrowRightThin} size={1} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
