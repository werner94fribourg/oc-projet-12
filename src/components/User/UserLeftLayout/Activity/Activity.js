import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../../../context/user-context';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './Activity.module.scss';

/**
 * Component rendering the activity bar chart in the application.
 *
 * @component
 * @example
 * const App = () => {
 *   return (
 *     <Activity />
 *    );
 * };
 */
const Activity = () => {
  const { id } = useParams();
  const { activity, getActivity } = useContext(UserContext);

  const [posX, setPosX] = useState(0);

  useEffect(() => {
    getActivity(id);
  }, [id, getActivity]);

  const CustomTooltip = ({ active, payload }) => {
    if (!(active && payload && payload.length)) return null;

    const [
      {
        payload: { kilogram, calories },
      },
    ] = payload;

    return (
      <div className={styles.tooltip}>
        <div>{kilogram}kg</div>
        <div>{calories}Kcal</div>
      </div>
    );
  };

  const CustomXAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          y={16}
          style={{ fontSize: 14, fontWeight: 500 }}
          textAnchor="start"
          fill="#9b9eac"
        >
          {payload.value}
        </text>
      </g>
    );
  };
  const CustomYAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={45}
          style={{ fontSize: 14, fontWeight: 500 }}
          textAnchor="start"
          fill="#9b9eac"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className={styles['activity__chart']}>
      <div className={styles['activity__header']}>
        <h2 className={styles['activity__title']}>Activité quotidienne</h2>
        <div className={styles['activity__categories']}>
          <span
            className={`${styles['activity__category']} ${styles['activity__weight']}`}
          >
            <span className={styles.dot}></span>Poids (kg)
          </span>
          <span
            className={`${styles['activity__category']} ${styles['activity__calories']}`}
          >
            <span className={styles.dot}></span>
            Calories brûlées (kCal)
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" aspect={4.0}>
        <BarChart
          width={835}
          height={207.5}
          data={activity}
          barGap={8}
          margin={{
            top: 24,
            right: 30,
            left: 32,
            bottom: 24,
          }}
          onMouseEnter={event => {
            if (!event) {
              setPosX(0);
              return;
            }
            setPosX(event.chartX);
          }}
          onMouseMove={event => {
            if (!event) {
              setPosX(0);
              return;
            }
            setPosX(event.chartX);
          }}
          onMouseLeave={() => {
            setPosX(0);
          }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            horizontalStroke={['#dedede']}
            strokeWidth={1}
          />
          <XAxis
            dataKey="day"
            dy={16}
            tickLine={false}
            tick={<CustomXAxisTick />}
          />
          <YAxis
            orientation="right"
            dx={45}
            axisLine={false}
            tickLine={false}
            tick={<CustomYAxisTick />}
          />
          <Tooltip
            cursor={{ fill: '#c4c4c4', opacity: 0.5 }}
            content={<CustomTooltip />}
            position={{ x: posX + 40 }}
          />
          <Bar
            name="Poids (kg)"
            dataKey="kilogram"
            fill="#282d30"
            radius={[3.5, 3.5, 0, 0]}
            barSize={7}
          />
          <Bar
            name="Calories brûlées (kCal)"
            dataKey="calories"
            fill="#e60000"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Activity;
