import React, { useCallback, useState } from 'react';
import { USER_URL } from '../helpers/globals';

export const UserContext = React.createContext({
  user: { activity: {}, averageSessions: {}, performance: {} },
  activity: {},
  averageSessions: {},
  performance: {},
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

const UserContextProvider = props => {
  const [user, setUser] = useState({});
  const [activity, setActivity] = useState({});
  const [averageSessions, setAverageSessions] = useState({});
  const [performance, setPerformance] = useState({});

  const getUser = useCallback(async id => {
    try {
      const userData = await fetchAndTransformData(USER_URL + id);

      setUser(user => {
        return {
          ...user,
          ...userData,
        };
      });
    } catch (err) {
      setUser({});
    }
  }, []);

  const getActivity = useCallback(async id => {
    try {
      const userURL = USER_URL + id;
      const activityUrl = userURL + '/activity';

      const activityData = await fetchAndTransformData(activityUrl);

      setActivity(activity => {
        return {
          ...activity,
          ...activityData,
        };
      });
    } catch (err) {
      setActivity({});
    }
  }, []);

  const getAverageSessions = useCallback(async id => {
    try {
      const userURL = USER_URL + id;
      const averageSessionsUrl = userURL + '/average-sessions';

      const averageSessionsData = await fetchAndTransformData(
        averageSessionsUrl
      );
      setAverageSessions(averageSessions => {
        return {
          ...averageSessions,
          ...averageSessionsData,
        };
      });
    } catch (err) {
      setAverageSessions({});
    }
  }, []);

  const getPerformance = useCallback(async id => {
    try {
      const userURL = USER_URL + id;
      const performanceUrl = userURL + '/performance';

      const performanceData = await fetchAndTransformData(performanceUrl);

      setPerformance(performance => {
        return {
          ...performance,
          ...performanceData,
        };
      });
    } catch (err) {
      setPerformance({});
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

export default UserContextProvider;
