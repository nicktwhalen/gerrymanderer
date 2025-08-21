import styles from './Bubble.module.css';

type BubbleProps = {
  children: string;
  arrow?: 'center' | 'left' | 'right' | 'all';
};

export default function Bubble({ children, arrow = 'center' }: BubbleProps) {
  const className = [styles.bubble, styles[arrow]];
  return (
    <p className={className.join(' ')}>
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
