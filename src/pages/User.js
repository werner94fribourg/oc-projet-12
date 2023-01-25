import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import UserHeader from '../components/User/UserHeader/UserHeader';
import Activity from '../components/User/UserLeftLayout/Activity/Activity';
import UserLeftSecondRow from '../components/User/UserLeftLayout/UserLeftSecondRow/UserLeftSecondRow';
import Sessions from '../components/User/UserLeftLayout/UserLeftSecondRow/Sessions/Sessions';
import Performance from '../components/User/UserLeftLayout/UserLeftSecondRow/Performance/Performance';
import UserLeftLayout from '../components/User/UserLeftLayout/UserLeftLayout';
import { UserContext } from '../context/user-context';
import Score from '../components/User/UserLeftLayout/UserLeftSecondRow/Score/Score';
import UserRightLayout from '../components/User/UserRightLayout/UserRightLayout';
import InfoCard from '../components/User/UserRightLayout/InfoCard/InfoCard';
import UserLayout from '../components/User/UserLayout/UserLayout';

/**
 * User page of the application, used by the router to create the content of an user's page.
 *
 * @component
 * @example
 * return (
 *   <Routes>
 *     <Route path="" element={<Navigate to="user/12" replace />} replace />
 *     <Route path="user/:id" element={<User />} />
 *   </Routes>
 * );
 */
const User = () => {
  const { user, getUser } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    getUser(id);
  }, [id, getUser]);

  const { name, score, data } = user;

  return (
    <React.Fragment>
      <UserHeader name={name} />
      <UserLayout>
        <UserLeftLayout>
          <Activity />
          <UserLeftSecondRow>
            <Sessions />
            <Performance />
            <Score score={score} />
          </UserLeftSecondRow>
        </UserLeftLayout>
        <UserRightLayout>
          {data.map(({ key, info, cat }) => (
            <InfoCard key={key} info={info} cat={cat} />
          ))}
        </UserRightLayout>
      </UserLayout>
    </React.Fragment>
  );
};

export default User;
