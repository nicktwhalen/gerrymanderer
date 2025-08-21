'use client';
import { useEffect, useState } from 'react';
import styles from './Text.module.css';

type TextProps = {
  children: React.ReactNode;
  color?: 'white';
  delay?: number;
};

export default function Text({ children, color, delay = 0 }: TextProps) {
  const [rotate, setRotate] = useState(0);

  const className = [styles.text, color === 'white' ? styles.white : ''];

  useEffect(() => {
    // Random rotation between -1 and 1 degrees
    setRotate(2 * Math.random() - 1);
  }, []);

  return (
    <div
      className={className.join(' ')}
      style={{ transitionDelay: `${delay}ms`, rotate: `${rotate}deg` }}
    >
      {children}
    </div>
  );
}
