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

const Activity = () => {
  const { id } = useParams();
  const { activity, getActivity } = useContext(UserContext);

  const [posX, setPosX] = useState(0);

  useEffect(() => {
    getActivity(id);
  }, [id, getActivity]);

  let count = 0;

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
      <ResponsiveContainer width="100%" aspect={2.6}>
        <BarChart
          width={835}
          height={207.5}
          data={activity.sessions}
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
            tick={{ fontSize: 14, color: '9b9eac', fontWeight: 500 }}
            dy={16}
            tickLine={false}
            tickFormatter={() => {
              const prevCount = count++;
              return `${(prevCount % activity.sessions?.length) + 1}`;
            }}
          />
          <YAxis
            orientation="right"
            tick={{ fontSize: 14, color: '9b9eac', fontWeight: 500 }}
            dx={45}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: '#c4c4c4', opacity: 0.5 }}
            content={<CustomTooltip />}
            position={{ x: posX + 100 }}
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
