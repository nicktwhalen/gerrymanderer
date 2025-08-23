'use client';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Text.module.css';

type TextProps = {
  children: React.ReactNode;
  color?: 'white';
  delay?: number;
};

export default function Text({ children, color, delay = 0 }: TextProps) {
  const [rotate, setRotate] = useState(0);

  const className = classNames(styles.text, {
    [styles.white]: color === 'white',
  });

  useEffect(() => {
    // Random rotation between -1 and 1 degrees
    setRotate(2 * Math.random() - 1);
  }, []);

  return (
    <div
      className={className}
      style={{ transitionDelay: `${delay}ms`, rotate: `${rotate}deg` }}
    >
      {children}
    </div>
  );
}
