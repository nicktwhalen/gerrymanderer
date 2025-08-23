'use client';
import { useEffect, useState } from 'react';
import styles from './Definition.module.css';

type DefinitionProps = {
  term: string;
  pronunciation: string;
  definition: string;
};

export default function Definition({
  term,
  pronunciation,
  definition,
}: DefinitionProps) {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    // Random rotation between -2.5 and 2.5 degrees
    setRotate(5 * Math.random() - 2.5);
  }, []);

  return (
    <dl
      className={styles.dictionary}
      style={{ rotate: `${rotate}deg` } as React.CSSProperties}
    >
      <dt className={styles.term}>{term}</dt>
      <dt className={styles.pronunciation}>{pronunciation}</dt>
      <dd className={styles.definition}>{definition}</dd>
    </dl>
  );
}
