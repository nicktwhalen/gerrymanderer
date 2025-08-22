import Link from 'next/link';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <h1 className={styles.logo}>
      <Link href="/" className={styles.link}>
        <span className={styles.yellow}>
          <span className={styles.the}>The</span>
          <span className={styles.gerrymanderer}>Gerrymanderer</span>
        </span>
        <span role="presentation" className={styles.shadow}>
          <span className={styles.the}>The</span>
          <span className={styles.gerrymanderer}>Gerrymanderer</span>
        </span>
      </Link>
    </h1>
  );
}