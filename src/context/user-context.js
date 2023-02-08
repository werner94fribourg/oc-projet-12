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
import {
  MOCK_ACTIVITY,
  MOCK_AVERAGE_SESSIONS,
  MOCK_PERFORMANCE,
  MOCK_USER,
} from './mock-data';

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
  user: formatter.formatUser(MOCK_USER),
  activity: formatter.formatActivity(MOCK_ACTIVITY),
  averageSessions: formatter.formatAverageSessions(MOCK_AVERAGE_SESSIONS),
  performance: formatter.formatPerformance(MOCK_PERFORMANCE),
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
  const [user, setUser] = useState(formatter.formatUser(MOCK_USER));
  const [activity, setActivity] = useState(
    formatter.formatActivity(MOCK_ACTIVITY)
  );
  const [averageSessions, setAverageSessions] = useState(
    formatter.formatAverageSessions(MOCK_AVERAGE_SESSIONS)
  );
  const [performance, setPerformance] = useState(
    formatter.formatPerformance(MOCK_PERFORMANCE)
  );

  const getUser = useCallback(async id => {
    try {
      const userData = await fetchAndTransformData(USER_URL + id);
      console.log(userData);
      const formatted = formatter.formatUser(userData);

      setUser(() => {
        return {
          ...formatted,
        };
      });
    } catch (err) {
      const dummyUser = formatter.formatUser(MOCK_USER);
      console.log(dummyUser);
      setUser(() => {
        return {
          ...dummyUser,
        };
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
      const dummyActivity = formatter.formatActivity(MOCK_ACTIVITY);
      setActivity(() => {
        return [...dummyActivity];
      });
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
      const dummyAvgSessions = formatter.formatAverageSessions(
        MOCK_AVERAGE_SESSIONS
      );
      setAverageSessions(() => {
        return [...dummyAvgSessions];
      });
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
      const dummyPerformance = formatter.formatPerformance(MOCK_PERFORMANCE);
      setPerformance(() => {
        return [...dummyPerformance];
      });
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
