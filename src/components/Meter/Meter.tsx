import styles from './Meter.module.css';

type MeterProps = {
  red: number;
  blue: number;
  total: number;
};

export default function Meter({ red, blue, total }: MeterProps) {
  return (
    <ul className={styles.meter}>
      <li
        className={styles.open}
        style={{ width: `${((total - red - blue) / total) * 100}%` }}
      >
        <span className="visually-hidden">
          {total - red - blue} open districts
        </span>
      </li>
      <li className={styles.blue} style={{ width: `${(blue / total) * 100}%` }}>
        <span className="visually-hidden">{blue} blue districts</span>
      </li>
      <li
        className={`red ${styles.red}`}
        style={{ width: `${(red / total) * 100}%` }}
      >
        <span className="visually-hidden">{red} red districts</span>
      </li>
    </ul>
  );
}
