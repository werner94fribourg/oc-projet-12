import calories from './calories-icon.svg';
import carbs from './carbs-icon.svg';
import lipid from './lipid-icon.svg';
import protein from './protein-icon.svg';
import styles from './InfoCard.module.scss';

const categories = {
  calorie: {
    name: 'Calories',
    img: calories,
    unit: 'kCal',
  },
  protein: {
    name: 'Proteines',
    img: protein,
    unit: 'g',
  },
  carbohydrate: {
    name: 'Glucides',
    img: carbs,
    unit: 'g',
  },
  lipid: {
    name: 'Lipides',
    img: lipid,
    unit: 'g',
  },
};

const InfoCard = props => {
  const { info, cat } = props;
  return (
    <div className={styles.card}>
      <img
        className={styles['card__img']}
        src={categories[cat].img}
        alt={cat}
      />
      <div className={styles['card__text']}>
        <div className={styles['card__info']}>
          {info}
          {categories[cat].unit}
        </div>
        <div className={styles['card__cat']}>{categories[cat].name}</div>
      </div>
    </div>
  );
};

export default InfoCard;
