import styles from './Meter.module.css';

type MeterProps = {
  red: number;
  blue: number;
  purple: number;
  total: number;
};

export default function Meter({ red, blue, purple, total }: MeterProps) {
  return (
    <div className={styles.container}>
      <div className="visually-hidden">
        <h2>Districts:</h2>
        <ul>
          <li>{total - red - blue - purple} open districts</li>
          <li>{blue} blue districts</li>
          <li>{red} red districts</li>
          <li>{purple} purple districts</li>
        </ul>
      </div>
      <div className={styles.meter}>
        <div
          className={styles.open}
          style={{ width: `${((total - red - blue - purple) / total) * 100}%` }}
        ></div>
        <div
          className={styles.blue}
          style={{ width: `${(blue / total) * 100}%` }}
        ></div>
        <div
          className={styles.red}
          style={{ width: `${(red / total) * 100}%` }}
        ></div>
        <div
          className={styles.purple}
          style={{ width: `${(purple / total) * 100}%` }}
        ></div>
        <div className={styles.ticks}>
          {Array.from({ length: total + 1 }, (_, index) => (
            <div key={index} className={styles.tick} />
          ))}
        </div>
      </div>
    </div>
  );
}
