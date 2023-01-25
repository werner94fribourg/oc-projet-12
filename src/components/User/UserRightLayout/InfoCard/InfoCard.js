/**
 * Card component used to display the user's key data.
 * @module InfoCard
 */
import styles from './InfoCard.module.scss';
import PropTypes from 'prop-types';

/**
 * @typedef {object} Props
 * @prop {string} info - the value of the information we want to display
 * @prop {Object} cat - the related data related with the category of the information (category name, unit, ...)
 */

/**
 * Card component used to display the user's key data.
 *
 * @param {Props} props - the [props]{@link Props} passed to the React Component
 * @component
 * @example
 * const key = 'calorie';
 * const info = 1200;
 * const cat = {key: 'calorie', name: 'Calories', img: 'calories.jpg', unit: 'kCal'};
 * return (
 *   <InfoCard key={key} info={info} cat={cat} />
 * )
 */
const InfoCard = props => {
  const { info, cat } = props;
  return (
    <div className={styles.card}>
      <img className={styles['card__img']} src={cat.img} alt={cat.key} />
      <div className={styles['card__text']}>
        <div className={styles['card__info']}>
          {info}
          {cat.unit}
        </div>
        <div className={styles['card__cat']}>{cat.name}</div>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  /**
   * The value of the information we want to display
   */
  info: PropTypes.number,
  /**
   * The related data related with the category of the information (category name, unit, ...)
   */
  cat: PropTypes.object,
};

export default InfoCard;
