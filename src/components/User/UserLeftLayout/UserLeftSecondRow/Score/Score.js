/**
 * Component for rendering the score radial bar chart in the application.
 * @module Score
 */
import styles from './Score.module.scss';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

/**
 * @typedef {object} Props
 * @prop {number} score - the value of the score we want to display on the component
 */

/**
 * Component for rendering the score radial bar chart in the application.
 *
 * @param {Props} props - the [props]{@link Props} passed to the React Component
 * @component
 * @example
 * const score = 0.25;
 * return (
 *   <Score score={score} />
 * )
 */
const Score = props => {
  const { score } = props;
  return (
    <div className={styles.score}>
      <div className={styles['score__title']}>
        <span className={styles['score__percentage']}>{score * 100}%</span>
        <span className={styles['score__objectif']}>de votre objectif</span>
      </div>
      <div className={styles['score__chart']}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="100%"
            barSize={7.5}
            data={[
              { score: 0, fill: 'transparent' },
              { score: score, fill: 'red' },
              { score: 1, fill: 'transparent' },
            ]}
          >
            <RadialBar
              minAngle={15}
              background={false}
              clockWise
              dataKey="score"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

Score.propTypes = {
  /**
   * The value of the score we want to display on the component
   */
  score: PropTypes.number,
};

export default Score;
