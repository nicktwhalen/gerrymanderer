import classNames from 'classnames';
import styles from './Bubble.module.css';

type BubbleProps = {
  children: string;
  arrow?: 'center' | 'left' | 'right' | 'all';
  delay?: number;
};

export default function Bubble({
  children,
  arrow = 'center',
  delay = 0,
}: BubbleProps) {
  const className = classNames(styles.bubble, styles[arrow]);
  return (
    <p className={className} style={{ transitionDelay: `${delay}ms` }}>
      <span className={styles.arrows}>
        {arrow === 'all' ? (
          <>
            <span className={styles.arrow} />
            <span className={styles.arrow} />
            <span className={styles.arrow} />
          </>
        ) : (
          <span className={styles.arrow} />
        )}
      </span>
      {children}
    </p>
  );
}
