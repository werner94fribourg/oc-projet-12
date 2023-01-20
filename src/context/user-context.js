import React, { useCallback, useState } from 'react';
import { USER_URL } from '../helpers/globals';

export const UserContext = React.createContext({
  user: { activity: {}, averageSessions: {}, performance: {} },
  getUser: id => {},
  getActivity: id => {},
  getAverageSessions: id => {},
  getPerformance: id => {},
});

const fetchAndTransformData = async url => {
  const response = await fetch(url, { mode: 'cors' });

  const { data } = await response.json();

  return data;
};

const parrallelFetchAndTransformData = async (url1, url2) => {
  return await Promise.all([
    fetchAndTransformData(url1),
    fetchAndTransformData(url2),
  ]);
};

const UserContextProvider = props => {
  const [user, setUser] = useState({
    activity: {},
    averageSessions: {},
    performance: {},
  });

  const { id: userId } = user;

  const getUser = useCallback(
    async id => {
      if (userId === id) return;

      const userData = await fetchAndTransformData(USER_URL + id);

      setUser(user => {
        return {
          ...user,
          ...userData,
        };
      });
    },
    [userId]
  );

  const getActivity = useCallback(
    async id => {
      const userURL = USER_URL + id;
      const activityUrl = userURL + '/activity';

      if (userId !== id) {
        const [userData, activityData] = await parrallelFetchAndTransformData(
          userURL,
          activityUrl
        );

        setUser(user => {
          return {
            ...user,
            ...userData,
            activity: { ...activityData },
            averageSessions: {},
            performance: {},
          };
        });
        return;
      }

      const activityData = await fetchAndTransformData(activityUrl);

      setUser(user => {
        return {
          ...user,
          activity: { ...activityData },
        };
      });
    },
    [userId]
  );

  const getAverageSessions = useCallback(
    async id => {
      const userURL = USER_URL + id;
      const averageSessionsUrl = userURL + '/average-sessions';

      if (userId !== id) {
        const [userData, averageSessionsData] =
          await parrallelFetchAndTransformData(userURL, averageSessionsUrl);

        setUser(user => {
          return {
            ...user,
            ...userData,
            activity: {},
            averageSessions: { ...averageSessionsData },
            performance: {},
          };
        });
        return;
      }

      const averageSessionsData = fetchAndTransformData(averageSessionsUrl);

      setUser(user => {
        return {
          ...user,
          averageSessions: { ...averageSessionsData },
        };
      });
    },
    [userId]
  );

  const getPerformance = useCallback(
    async id => {
      const userURL = USER_URL + id;
      const averageSessionsUrl = userURL + '/performance';

      if (userId !== id) {
        const [userData, performanceData] =
          await parrallelFetchAndTransformData(userURL, averageSessionsUrl);

        setUser(user => {
          return {
            ...user,
            ...userData,
            activity: {},
            averageSessions: {},
            performance: { ...performanceData },
          };
        });
        return;
      }

      const performanceData = fetchAndTransformData(averageSessionsUrl);

      setUser(user => {
        return {
          ...user,
          performance: { ...performanceData },
        };
      });
    },
    [userId]
  );

  return (
    <UserContext.Provider
      value={{ user, getUser, getActivity, getAverageSessions, getPerformance }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
