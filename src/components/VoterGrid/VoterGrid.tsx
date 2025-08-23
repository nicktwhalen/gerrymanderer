import styles from './VoterGrid.module.css';

export type VoterGridProps = React.HTMLAttributes<HTMLDivElement> & {
  rows: number;
  cols: number;
};

export default function VoterGrid({
  rows,
  cols,
  ...restProps
}: VoterGridProps) {
  return (
    <div
      className={styles.grid}
      style={
        {
          '--rows': rows,
          '--cols': cols,
        } as React.CSSProperties
      }
      {...restProps}
    />
  );
}
