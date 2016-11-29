import React from 'react';
import { Link } from 'react-router';

import styles from './style.pcss';

const Header = () => (
  <header className={styles.header}>
    <article className={styles.container}>
      <section className={styles.logoContainer}>
        <h1 className={styles.logo}>KreasiKamu</h1>
        <div className={styles.logoDivider} />
        <h1 className={styles.logoDescriptor}>Business</h1>
      </section>
      <nav className={styles.nav}>
        <Link className={styles.link} activeClassName={styles.linkActive} onlyActiveOnIndex to="/">
          Dashboard
        </Link>
        <Link className={styles.link} activeClassName={styles.linkActive} to="/series">Series</Link>
        <Link className={styles.link} activeClassName={styles.linkActive} to="/announcements">
          Announcements
        </Link>
        <Link className={styles.link} activeClassName={styles.linkActive} to="/wallet">Wallet</Link>
      </nav>
    </article>
  </header>
);

export default Header;
