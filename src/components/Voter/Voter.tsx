import { TileBorders, TileState, VoterColor, VoterMood } from '@/types/game';
import styles from './Voter.module.css';

export type VoterProps = {
  borders?: TileBorders;
  color: VoterColor;
  districtColor?: VoterColor;
  mood?: VoterMood;
  state?: TileState;
};

const getFace = (face: VoterMood) => {
  switch (face) {
    case 'elated':
      return '😁';
    case 'happy':
      return '😊';
    case 'sad':
      return '😢';
    case 'worried':
      return '🥺';
    case 'thinking':
      return '🤔';
    default:
      return '😐';
  }
};

export default function Voter(
  props: VoterProps & React.HTMLAttributes<HTMLButtonElement>,
) {
  const {
    borders,
    color,
    districtColor,
    mood = 'neutral',
    state = 'default',
    ...restProps
  } = props;

  const classNames = [
    styles.voter,
    styles[color],
    styles[mood],
    styles[state],
    districtColor && styles[`district-${districtColor}`],
  ];

  return (
    <button className={classNames.join(' ')} {...restProps}>
      {districtColor && color !== districtColor && (
        <div className={styles.districtColor} />
      )}
      {color !== 'empty' && <div className={styles.face}>{getFace(mood)}</div>}
      {state === 'available' && <div className={styles.selectable} />}
      {borders && (
        <div className={styles.districtBorders}>
          {borders.top && <div className={styles.top} />}
          {borders.right && <div className={styles.right} />}
          {borders.bottom && <div className={styles.bottom} />}
          {borders.left && <div className={styles.left} />}
        </div>
      )}
    </button>
  );
}
