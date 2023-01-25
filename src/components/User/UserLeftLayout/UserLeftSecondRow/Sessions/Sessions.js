import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../../../../context/user-context';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './Sessions.module.scss';

/**
 * Component rendering the sessions line chart in the application.
 *
 * @component
 * @example
 * const App = () => {
 *   return (
 *     <Activity />
 *    );
 * };
 */
const Sessions = () => {
  const { id } = useParams();
  const { averageSessions, getAverageSessions } = useContext(UserContext);

  const [posX, setPosX] = useState(0);
  useEffect(() => {
    getAverageSessions(id);
  }, [id, getAverageSessions]);

  const sessionContainer = useRef(null);
  const CustomTooltip = ({ active, payload }) => {
    if (!(active && payload && payload.length)) return null;

    const [
      {
        payload: { session },
      },
    ] = payload;

    return <div className={styles.tooltip}>{session} min</div>;
  };

  const calcOffset = posX => {
    const rect = sessionContainer.current.getBoundingClientRect();

    return (rect.left + rect.width - posX) / rect.width;
  };

  const CustomAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          y={25}
          style={{ fontSize: 12, fontWeight: 500 }}
          textAnchor="start"
          fill="rgba(255, 255, 255, 0.504)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div
      className={styles.sessions}
      ref={sessionContainer}
      onMouseEnter={event => {
        if (!event) {
          setPosX(0);
          return;
        }
        setPosX(calcOffset(event.clientX));
      }}
      onMouseMove={event => {
        if (!event) {
          setPosX(0);
          return;
        }
        setPosX(calcOffset(event.clientX));
      }}
      onMouseLeave={() => {
        setPosX(0);
      }}
    >
      <div className={styles['sessions__header']}>
        <h2 className={styles['sessions__title']}>
          Durée moyenne des sessions
        </h2>
      </div>
      <div
        className={styles['sessions__background']}
        style={{ width: `${posX * 100}%` }}
      ></div>
      <div className={styles['sessions__plot']}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={258}
            height={263}
            data={averageSessions}
            margin={{
              top: 6,
              right: 20,
              left: -55,
              bottom: 10,
            }}
          >
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              dy={30}
              tick={<CustomAxisTick />}
            />
            <YAxis tickLine={false} axisLine={false} tick={false} />
            <Tooltip
              cursor={{ fill: '#000000', opacity: 0.1 }}
              content={<CustomTooltip />}
            />
            <Line
              type="monotone"
              dataKey="length"
              stroke="rgba(255, 255, 255, 0.504)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Sessions;
