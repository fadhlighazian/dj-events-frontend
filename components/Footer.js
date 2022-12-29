import React from 'react';
import styles from '../styles/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events 2021</p>
      <p>
        <Link href='/'>About This Project</Link>
      </p>
    </footer>
  );
}
