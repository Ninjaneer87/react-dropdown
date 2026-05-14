import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.scss';
import Heading from '@theme/Heading';
import Icon from '@mdi/react';
import { mdiArrowRightThin } from '@mdi/js';

export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <main
        style={{ textAlign: 'center', padding: '4rem 2rem', margin: 'auto' }}
      >
        <section className={styles.section}>
          <Heading as="h2" className={styles.heading}>
            Page <span className={styles.headingAccent}>Not Found</span>
          </Heading>

          <div className={styles.errorCode}>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </div>

          <p className={styles.description}>
            Wrong turn - check your map again!
          </p>

          <Link
            to="/"
            className="button button--danger button--outline button--lg"
          >
            Go back home <Icon path={mdiArrowRightThin} size={1} />
          </Link>
        </section>
      </main>
    </Layout>
  );
}
