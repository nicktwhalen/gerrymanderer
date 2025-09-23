import styles from './Meter.module.css';

type MeterProps = {
  red: number;
  blue: number;
  purple: number;
  total: number;
};

export default function Meter({ red, blue, purple, total }: MeterProps) {
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
            const sections = [];

            // Blue districts - fill clockwise from left
            for (let i = 0; i < blue && i < total; i++) {
              const currentAngle = START_ANGLE + i * sectionAngle;
              const nextAngle = START_ANGLE + (i + 1) * sectionAngle;
              sections.push(
                createPieSection(
                  currentAngle,
                  nextAngle,
                  1,
                  'blue',
                  `blue-${i}`,
                ),
              );
            }

            // Red/Purple districts - fill counter-clockwise from left
            const nonBlueDistricts = red + purple;
            const redPurpleOrder = [
              ...Array(red).fill('red'),
              ...Array(purple).fill('purple'),
            ];

            for (let i = 0; i < nonBlueDistricts && total - blue - i > 0; i++) {
              const currentAngle = START_ANGLE - i * sectionAngle;
              const nextAngle = START_ANGLE - (i + 1) * sectionAngle;
              sections.push(
                createPieSection(
                  currentAngle,
                  nextAngle,
                  0,
                  redPurpleOrder[i],
                  `nonblue-${i}`,
                ),
              );
            }

            return sections;
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
