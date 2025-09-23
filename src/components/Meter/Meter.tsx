import styles from './Meter.module.css';
import { VoterColor } from '@/types/game';

type MeterProps = {
  red: number;
  blue: number;
  purple: number;
  total: number;
  party: VoterColor;
};

export default function Meter({ red, blue, purple, total, party }: MeterProps) {
  // Pie chart constants
  const CENTER_X = 100;
  const CENTER_Y = 120;
  const RADIUS = 80;
  const STROKE_WIDTH = 3.2;

  // Calculate section angle based on total districts
  const sectionAngle = 360 / total;

  // Helper function to get coordinates for a given angle
  const getCoordinates = (angleInDegrees: number) => {
    const radians = (angleInDegrees * Math.PI) / 180;
    const x = CENTER_X + RADIUS * Math.cos(radians);
    const y = CENTER_Y + RADIUS * Math.sin(radians);
    return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
  };

  // Helper function to create a pie section path
  const createPieSection = (
    startAngle: number,
    endAngle: number,
    sweepFlag: number,
    color: string,
    key: string,
  ) => {
    const startPoint = getCoordinates(startAngle);
    const endPoint = getCoordinates(endAngle);
    const largeArcFlag = sectionAngle > 180 ? 1 : 0;

    return (
      <path
        key={key}
        d={`M ${CENTER_X} ${CENTER_Y} L ${startPoint.x} ${startPoint.y} A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} ${sweepFlag} ${endPoint.x} ${endPoint.y} Z`}
        fill={`var(--${color})`}
      />
    );
  };

  // Starting angle (pointing left = 180 degrees)
  const START_ANGLE = 180;

  // Helper function to get Us/Them district mapping based on party
  const getDistrictMapping = () => {
    if (party === VoterColor.Red) {
      return {
        usColor: 'red',
        usDistricts: red,
        nonUsDistricts: blue + purple,
        nonUsOrder: [
          ...Array(blue).fill('blue'),
          ...Array(purple).fill('purple'),
        ],
      };
    } else {
      return {
        usColor: 'blue',
        usDistricts: blue,
        nonUsDistricts: red + purple,
        nonUsOrder: [
          ...Array(red).fill('red'),
          ...Array(purple).fill('purple'),
        ],
      };
    }
  };

  // Helper function to render Us districts (clockwise)
  const renderUsDistricts = (usColor: string, usDistricts: number) => {
    const sections = [];
    for (let i = 0; i < usDistricts && i < total; i++) {
      const currentAngle = START_ANGLE + i * sectionAngle;
      const nextAngle = START_ANGLE + (i + 1) * sectionAngle;
      sections.push(
        createPieSection(currentAngle, nextAngle, 1, usColor, `us-${i}`),
      );
    }
    return sections;
  };

  // Helper function to render non-Us districts (counter-clockwise)
  const renderNonUsDistricts = (
    nonUsDistricts: number,
    nonUsOrder: string[],
    usDistricts: number,
  ) => {
    const sections = [];
    for (let i = 0; i < nonUsDistricts && total - usDistricts - i > 0; i++) {
      const currentAngle = START_ANGLE - i * sectionAngle;
      const nextAngle = START_ANGLE - (i + 1) * sectionAngle;
      sections.push(
        createPieSection(
          currentAngle,
          nextAngle,
          0,
          nonUsOrder[i],
          `nonus-${i}`,
        ),
      );
    }
    return sections;
  };

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
      <div className={styles['pie-chart']}>
        <svg viewBox="0 0 200 230" className={styles['pie-svg']}>
          {/* Draw white background circle first */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RADIUS}
            fill="white"
            stroke="none"
          />

          {/* Dynamic pie sections */}
          {(() => {
            const { usColor, usDistricts, nonUsDistricts, nonUsOrder } =
              getDistrictMapping();

            return [
              ...renderUsDistricts(usColor, usDistricts),
              ...renderNonUsDistricts(nonUsDistricts, nonUsOrder, usDistricts),
            ];
          })()}

          {/* Circle border on top */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RADIUS}
            fill="none"
            stroke="var(--black)"
            strokeWidth={STROKE_WIDTH}
          />

          {/* Draw dynamic dividing lines */}
          {Array.from({ length: total }, (_, i) => {
            const angle = START_ANGLE + i * sectionAngle;
            const endPoint = getCoordinates(angle);

            return (
              <line
                key={i}
                x1={CENTER_X}
                y1={CENTER_Y}
                x2={endPoint.x}
                y2={endPoint.y}
                stroke="var(--black)"
                strokeWidth={STROKE_WIDTH}
              />
            );
          })}

          {/* Labels */}
          <text
            x={CENTER_X}
            y="34"
            textAnchor="middle"
            className={styles.label}
          >
            Us
          </text>
          <text
            x={CENTER_X}
            y="226"
            textAnchor="middle"
            className={styles['label-red']}
          >
            Them
          </text>
        </svg>
      </div>
    </div>
  );
}
