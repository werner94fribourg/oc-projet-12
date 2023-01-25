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

/**
 * Component rendering the performance radar chart in the application.
 *
 * @component
 * @example
 * const App = () => {
 *   return (
 *     <Activity />
 *    );
 * };
 */
const Performance = () => {
  const { id } = useParams();

  const { performance, getPerformance } = useContext(UserContext);

  useEffect(() => {
    getPerformance(id);
  }, [id, getPerformance]);

  const CustomAxisTick = ({ x, y, payload }) => {
    const { position } = performance[payload.index];
    const rotation = `rotate(${position.rotation})`;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={position.x}
          y={5 + position.y}
          style={{ fontSize: 12, fontWeight: 500 }}
          textAnchor="start"
          fill="#ffffff"
          transform={rotation}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className={styles.performance}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performance}>
          <PolarGrid stroke="#ffffff" />
          <PolarAngleAxis dataKey="french" tick={<CustomAxisTick />} />
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
