/**
 * Store the User global context and a Provider to make it accessible for other components.
 * @module user-context
 */
// eslint-disable-next-line
import React, { useCallback, Context, useState } from 'react';
import calories from './calories-icon.svg';
import { USER_URL } from '../helpers/globals';
import { fetchAndTransformData } from '../helpers/helpers';
import PropTypes from 'prop-types';
import formatter from '../formatter/UserFormatter';

/**
 * Getter function, used to retrieve an element from the API from a specific user.
 * @name Getter
 * @function
 * @param {string} id - id of the user we want to retrieve from the API
 */

/**
 * User context object, that stores all the informations related to the requested user.
 * @typedef UserContext
 * @property {Object} user - the requested user
 * @property {Object[]} activity - the requested user's activities
 * @property {Object[]} averageSessions - the requested user's average sessions
 * @property {Object[]} performance - the requested user's performance
 * @property {Getter} getUser - a function used to get the user's general informations from the API
 * @property {Getter} getActivity - a function used to get the user's activities from the API
 * @property {Getter} getAverageSessions - a function used to get the user's sessions time from the API
 * @property {Getter} getPerformance - a function used to get the user's performance from the API
 */

/**
 * @type {UserContext}
 */
const defaultContext = {
  user: {
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
  },
  activity: [{ day: 1, kilogram: 0, calories: 0 }],
  averageSessions: [{ day: 1, length: 0 }],
  performance: [
    {
      kind: 1,
      english: 'cardio',
      french: 'Cardio',
      value: 80,
      position: { x: 0, y: 0, rotation: 0 },
    },
  ],
  getUser: id => {},
  getActivity: id => {},
  getAverageSessions: id => {},
  getPerformance: id => {},
};

/**
 * @type {Context<UserContext>}
 */
export const UserContext = React.createContext(defaultContext);

/**
 * @typedef {object} Props
 * @prop {React.Component} children - the children components wrapped by the UserContextProvider
 */

/**
 * Component used to make the user context object globally accessible to all the subcomponents wrapped by it.
 *
 * @param {Props} props - the [props]{@link Props} passed to the React Component
 * @component
 * @example
 * const root = ReactDOM.createRoot(document.getElementById('root'));
 * root.render(
 * <UserContextProvider>
 *   <App />
 * </UserContextProvider>
 * );
 */
const UserContextProvider = props => {
  const [user, setUser] = useState({
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
  });
  const [activity, setActivity] = useState([
    { day: 1, kilogram: 0, calories: 0 },
  ]);
  const [averageSessions, setAverageSessions] = useState([
    { day: 1, length: 30 },
  ]);
  const [performance, setPerformance] = useState([
    {
      kind: 1,
      english: 'cardio',
      french: 'Cardio',
      value: 80,
      position: { x: 0, y: 0, rotation: 0 },
    },
  ]);

  const getUser = useCallback(async id => {
    try {
      const userData = await fetchAndTransformData(USER_URL + id);

      const formatted = formatter.formatUser(userData);

      setUser(() => {
        return {
          ...formatted,
        };
      });
    } catch (err) {
      setUser({
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
      });
    }
  }, []);

  const getActivity = useCallback(async id => {
    try {
      const userURL = USER_URL + id;
      const activityUrl = userURL + '/activity';

      const activityData = await fetchAndTransformData(activityUrl);

      const formatted = formatter.formatActivity(activityData);

      setActivity(() => {
        return [...formatted];
      });
    } catch (err) {
      setActivity([{ day: 1, kilogram: 0, calories: 0 }]);
    }
  }, []);

  const getAverageSessions = useCallback(async id => {
    try {
      const userURL = USER_URL + id;
      const averageSessionsUrl = userURL + '/average-sessions';

      const averageSessionsData = await fetchAndTransformData(
        averageSessionsUrl
      );

      const formatted = formatter.formatAverageSessions(averageSessionsData);

      setAverageSessions(() => {
        return [...formatted];
      });
    } catch (err) {
      setAverageSessions([{ day: 1, length: 30 }]);
    }
  }, []);

  const getPerformance = useCallback(async id => {
    try {
      const userURL = USER_URL + id;
      const performanceUrl = userURL + '/performance';

      const performanceData = await fetchAndTransformData(performanceUrl);

      const formatted = formatter.formatPerformance(performanceData);

      setPerformance(() => {
        return [...formatted];
      });
    } catch (err) {
      setPerformance([
        {
          kind: 1,
          english: 'cardio',
          french: 'Cardio',
          value: 80,
          position: { x: 0, y: 0, rotation: 0 },
        },
      ]);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        activity,
        averageSessions,
        performance,
        getUser,
        getActivity,
        getAverageSessions,
        getPerformance,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  /**
   * The children components wrapped by the UserContextProvider
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UserContextProvider;
