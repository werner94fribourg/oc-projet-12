/**
 * Store the single UserFormatter instance, a class used to format the data returned by the API.
 * @module UserFormatter
 */
import calories from './calories-icon.svg';
import carbs from './carbs-icon.svg';
import lipid from './lipid-icon.svg';
import protein from './protein-icon.svg';

const perfRelatedData = {
  1: {
    french: 'Cardio',
    position: { x: -17, y: -2, rotation: 0 },
  },
  2: {
    french: 'Energie',
    position: { x: -18, y: -2, rotation: 60 },
  },
  3: {
    french: 'Endurance',
    position: { x: -27, y: 2, rotation: -60 },
  },
  4: {
    french: 'Force',
    position: { x: -15, y: 2, rotation: 0 },
  },
  5: {
    french: 'Vitesse',
    position: { x: -24, y: 2, rotation: 60 },
  },
  6: {
    french: 'Intensité',
    position: { x: -25, y: -2, rotation: -60 },
  },
};

const catRelData = {
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

/**
 * Class representing a formatter, which stores all functions formatting the user data returned by the API.
 */
class UserFormatter {
  /**
   * Function used to format the data returned by the <i>/user/:id<i/> endpoint.
   * @param {Object} data - the data returned by the <i>/user/:id<i/> endpoint
   * @returns {Object} - The formatted data of the <i>/user/:id<i/> endpoint's data.
   * @author Werner Schmid
   */
  formatUser(data) {
    try {
      const {
        todayScore: score,
        userInfos: { firstName: name },
        keyData,
      } = data;
      return {
        name,
        score,
        data: Object.entries(keyData).map(([key, value]) => {
          const catKey = key.slice(0, -5);
          return {
            key: catKey,
            cat: { key: catKey, ...catRelData[catKey] },
            info: value,
          };
        }),
      };
    } catch (err) {
      return {
        name: '',
        score: 0,
        data: [
          {
            key: 'calorie',
            info: 0,
            cat: {
              key: 'calorie',
              name: 'Calories',
              img: calories,
              unit: 'kCal',
            },
          },
        ],
      };
    }
  }

  /**
   * Function used to format the data returned by the <i>/user/:id/activity<i/> endpoint.
   * @param {Object} data - the data returned by the <i>/user/:id/activity<i/> endpoint
   * @returns {Object} - The formatted data of the <i>/user/:id/activity<i/> endpoint's data.
   * @author Werner Schmid
   */
  formatActivity(data) {
    try {
      const { sessions } = data;
      if (sessions.length === 0) throw new Error('empty array');
      return sessions.map((session, index) => {
        return {
          day: index + 1,
          kilogram: session.kilogram,
          calories: session.calories,
        };
      });
    } catch (err) {
      return [{ day: 1, kilogram: 0, calories: 0 }];
    }
  }

  /**
   * Function used to format the data returned by the <i>/user/:id/performance<i/> endpoint.
   * @param {Object} data - the data returned by the <i>/user/:id/performance<i/> endpoint
   * @returns {Object} - The formatted data of the <i>/user/:id/performance<i/> endpoint's data.
   * @author Werner Schmid
   */
  formatPerformance(perfData) {
    try {
      const { kind, data } = perfData;
      return data
        .sort((d1, d2) => (d1.kind < d2.kind ? -1 : 1))
        .map(entry => {
          return {
            kind: entry.kind,
            english: kind[entry.kind],
            french: perfRelatedData[entry.kind].french,
            value: entry.value,
            position: perfRelatedData[entry.kind].position,
          };
        });
    } catch (err) {
      return [
        {
          kind: 1,
          english: 'cardio',
          french: 'Cardio',
          value: 80,
          position: { x: 0, y: 0, rotation: 0 },
        },
      ];
    }
  }

  /**
   * Function used to format the data returned by the <i>/user/:id/average-sessions<i/> endpoint.
   * @param {Object} data - the data returned by the <i>/user/:id/average-sessions<i/> endpoint
   * @returns {Object} - The formatted data of the <i>/user/:id/average-sessions<i/> endpoint's data.
   * @author Werner Schmid
   */
  formatAverageSessions(data) {
    try {
      const { sessions } = data;
      if (sessions.length === 0) throw new Error('empty array');
      return sessions.map(session => {
        return {
          day: session.day,
          length: session.sessionLength,
        };
      });
    } catch (err) {
      return [{ day: 1, length: 30 }];
    }
  }
}

/**
 * Single existing instance of the UserFormatter class (see {@link UserFormatter}).
 * @type {UserFormatter}
 */
const formatter = new UserFormatter();

export default formatter;
