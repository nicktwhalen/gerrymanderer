'use client';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Text.module.css';

type TextProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: 'white';
  delay?: number;
};

export default function Text(props: TextProps) {
  const {
    className: classNameProp,
    color,
    delay = 0,
    style: styleProp,
    ...restProps
  } = props;
  const [rotate, setRotate] = useState(0);

  const style = {
    rotate: `${rotate}deg`,
    transitionDelay: `${delay}ms`,
    ...styleProp,
  };

  const className = classNames(
    styles.text,
    { [styles.white]: color === 'white' },
    classNameProp,
  );

  useEffect(() => {
    // Random rotation between -2.5 and 2.5 degrees
    setRotate(3 * Math.random() - 1.5);
  }, []);

  return <div {...restProps} className={className} style={style} />;
}
