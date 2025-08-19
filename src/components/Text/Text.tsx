'use client';
import { useEffect, useState } from 'react';
import styles from './Text.module.css';

type TextProps = {
  children: React.ReactNode;
  color?: 'white';
};

export default function Text({ children, color }: TextProps) {
  const [rotate, setRotate] = useState(0);

  const className = [styles.text, color === 'white' ? styles.white : ''].join(' ');

  useEffect(() => {
    // Random rotation between -0.5 and 0.5 degrees
    setRotate(2 * Math.random() - 1);
  }, []);

  return (
    <div className={className} style={{ rotate: `${rotate}deg` }}>
      {children}
    </div>
  );
}
