'use client';
import { JSX, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Text.module.css';

type TextProps = React.HTMLAttributes<HTMLElement> & {
  color?: 'white';
  delay?: number;
  tag?: keyof JSX.IntrinsicElements;
};

export default function Text({
  children,
  color,
  delay = 0,
  style: styleProp,
  tag: Tag = 'p',
}: TextProps) {
  const [rotate, setRotate] = useState(0);

  const style = {
    transitionDelay: `${delay}ms`,
    rotate: `${rotate}deg`,
    ...styleProp,
  };

  const className = classNames(styles.text, {
    [styles.white]: color === 'white',
  });

  useEffect(() => {
    // Random rotation between -1 and 1 degrees
    setRotate(2 * Math.random() - 1);
  }, []);

  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
}
