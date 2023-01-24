import { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../../../../context/user-context';
import styles from './Performance.module.scss';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

const Performance = () => {
  const { id } = useParams();

  const { performance, getPerformance } = useContext(UserContext);

  useEffect(() => {
    getPerformance(id);
  }, [id, getPerformance]);

  const frenchNamesPerformance = {
    cardio: 'Cardio',
    intensity: 'Intensité',
    speed: 'Vitesse',
    strength: 'Force',
    endurance: 'Endurance',
    energy: 'Energie',
  };

  const titlePositions = {
    Cardio: { x: -17, y: -2 },
    Intensité: { x: -30, y: -10 },
    Vitesse: { x: -30, y: 10 },
    Force: { x: -15, y: 2 },
    Endurance: { x: -22, y: 10 },
    Energie: { x: -7, y: -10 },
  };

  let performanceData = [
    {
      kind: '',
      value: 0,
    },
  ];

  if (performance.data)
    performanceData = performance.data
      .sort((a, b) => (a.kind < b.kind ? -1 : 1))
      .map(perf => {
        return {
          ...perf,
          kind: frenchNamesPerformance[performance.kind[perf.kind]],
        };
      });

  const CustomAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={titlePositions[payload.value]?.x || 0}
          y={5 + titlePositions[payload.value]?.y || 0}
          style={{ fontSize: 12, fontWeight: 500 }}
          textAnchor="start"
          fill="#ffffff"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className={styles.performance}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
          <PolarGrid stroke="#ffffff" />
          <PolarAngleAxis dataKey="kind" tick={<CustomAxisTick />} />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="rgba(255, 1, 1, 0.7)"
            fill="rgba(255, 1, 1, 0.7)"
            fillOpacity={1}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Performance;
