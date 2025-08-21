'use client';
import { useEffect, useState } from 'react';
import styles from './Logo.module.css';

export default function Logo() {
  const [rotate, setRotate] = useState(0);

  const className = [styles.logo];

  useEffect(() => {
    // Random rotation between -1 and 1 degrees
    setRotate(2 * Math.random() - 1);
  }, []);

  return (
    <h1 className={styles.logo}>
      <a href="/" className={styles.link}>
        <span className={styles.yellow}>
          <span className={styles.the}>The</span>
          <span className={styles.gerrymanderer}>Gerrymanderer</span>
        </span>
        <span role="presentation" className={styles.shadow}>
          <span className={styles.the}>The</span>
          <span className={styles.gerrymanderer}>Gerrymanderer</span>
        </span>
      </a>
    </h1>
  );
}
