import BrowserOnly from '@docusaurus/BrowserOnly';
import SitePopover from '@site/src/components/lab/SitePopover/SitePopover';
import styles from './HomePopoverDemo.module.scss';

function HomePopoverDemo() {
  return (
    <BrowserOnly>
      {() => {
        return (
          <SitePopover>
            <SitePopover.Trigger>
              <div className={styles.flex}>
                <img
                  className="avatar__photo"
                  src="/img/andrej.webp"
                  alt="Andrej Forgac"
                />
                <div className={styles.headerContent}>
                  <div>Andrej Forgac</div>
                  <small className={styles.secondaryText}>
                    AndrejGround maintainer
                  </small>
                </div>
              </div>
            </SitePopover.Trigger>

            <SitePopover.Content>
              <div className={styles.flex}>
                <div className={styles.flex}>
                  <img
                    className="avatar__photo"
                    src="/img/andrej.webp"
                    alt="Andrej Forgac"
                  />
                  <div className={styles.headerContent}>
                    <div>Andrej Forgac</div>
                    <small className={styles.secondaryText}>
                      @andrejforgac87
                    </small>
                  </div>
                </div>

                <SitePopover openOnHover placement="top-center" delayHide={500}>
                  <SitePopover.Trigger>
                    <a
                      href="https://www.linkedin.com/in/andrejforgac87/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button--primary"
                    >
                      Connect
                    </a>
                  </SitePopover.Trigger>
                  <SitePopover.Content>
                    Let's connect on LinkedIn
                  </SitePopover.Content>
                </SitePopover>
              </div>

              <br />
              <div className={styles.secondaryText}>
                Senior Software Engineer @{' '}
                <a
                  href="https://snyk.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>Snyk</b>
                </a>
              </div>

              <div>
                <b>415</b>{' '}
                <span className={styles.secondaryText}>connections</span>
              </div>
            </SitePopover.Content>
          </SitePopover>
        );
      }}
    </BrowserOnly>
  );
}

export default HomePopoverDemo;
