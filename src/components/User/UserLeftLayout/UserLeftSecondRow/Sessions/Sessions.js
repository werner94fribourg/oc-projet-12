import { useContext, useEffect, useState } from 'react';
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

const Sessions = () => {
  const { id } = useParams();
  const { averageSessions, getAverageSessions } = useContext(UserContext);

  const [posX, setPosX] = useState(244);
  useEffect(() => {
    getAverageSessions(id);
  }, [id, getAverageSessions]);

  const CustomTooltip = ({ active, payload }) => {
    if (!(active && payload && payload.length)) return null;

    const [
      {
        payload: { sessionLength },
      },
    ] = payload;

    return <div className={styles.tooltip}>{sessionLength} min</div>;
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
    <div className={styles.sessions}>
      <div className={styles['sessions__header']}>
        <h2 className={styles['sessions__title']}>
          Durée moyenne des sessions
        </h2>
      </div>
      <div
        className={styles['sessions__background']}
        style={{ width: `${((238 - posX) / 238) * 93}%` }}
      ></div>
      <div className={styles['sessions__plot']}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={258}
            height={263}
            data={averageSessions.sessions}
            margin={{
              top: 6,
              right: 20,
              left: -55,
              bottom: 10,
            }}
            onMouseEnter={event => {
              if (!event) {
                setPosX(238);
                return;
              }
              setPosX(event.chartX);
            }}
            onMouseMove={event => {
              if (!event) {
                setPosX(238);
                return;
              }
              setPosX(event.chartX);
            }}
            onMouseLeave={() => {
              setPosX(238);
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
              dataKey="sessionLength"
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
