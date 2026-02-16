import { VoterColor } from '@/types/game';
import styles from './Meter.module.css';

type MeterProps = {
  party: VoterColor;
  districtsWon: number;
  districtsNeeded: number;
};

export default function Meter({
  party,
  districtsWon,
  districtsNeeded,
}: MeterProps) {
  return (
    <div className={styles.container}>
      <div className={styles.meter}>
        <div
          className={styles[party]}
          style={{ width: `${(districtsWon / districtsNeeded) * 100}%` }}
        ></div>
        <div className={styles.ticks}>
          {Array.from({ length: districtsNeeded + 1 }, (_, index) => (
            <div key={index} className={styles.tick} />
          ))}
        </div>
      </div>
    </div>
  );
}
