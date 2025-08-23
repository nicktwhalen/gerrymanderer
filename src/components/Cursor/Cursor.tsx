import classNames from 'classnames';
import styles from './Cursor.module.css';

type CursorProps = {
  x: string;
  y: string;
  visible?: boolean;
};

export default function Cursor({ x, y, visible = false }: CursorProps) {
  const className = classNames(styles.cursor, {
    [styles.hidden]: !visible,
  });

  return (
    <div
      className={className}
      style={
        {
          '--x': `${x}`,
          '--y': `${y}`,
        } as React.CSSProperties
      }
    >
      👆
    </div>
  );
}
