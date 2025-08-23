import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <Image
      className={styles.hero}
      src="/superhero.png"
      alt="Superhero"
      width={400}
      height={400}
    />
  );
}
