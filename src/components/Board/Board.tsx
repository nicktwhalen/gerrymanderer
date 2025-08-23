import React from 'react';
import styles from './Board.module.css';

export type BoardProps = React.HTMLAttributes<HTMLDivElement> & {
  square?: boolean;
  interactive?: boolean;
};

const Board = React.forwardRef<HTMLDivElement, BoardProps>(
  ({ square, interactive = true, ...restProps }, ref) => {
    const className = [
      styles.board,
      square && styles.square,
      interactive && styles.interactive,
    ];
    return (
      <div
        ref={ref}
        className={className.join(' ')}
        role={interactive ? undefined : 'presentation'}
        {...restProps}
      />
    );
  },
);

export default Board;
