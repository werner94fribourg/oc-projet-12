import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import Header from '../components/User/Header/Header';
import Activity from '../components/User/UserLayout/Activity/Activity';
import UserLayout from '../components/User/UserLayout/UserLayout';
import { UserContext } from '../context/user-context';

const User = () => {
  const { user, getUser } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    getUser(id);
  }, [id, getUser]);

  const { userInfos } = user;
  return (
    <React.Fragment>
      <Header firstName={userInfos?.firstName} />
      <UserLayout>
        <Activity />
      </UserLayout>
    </React.Fragment>
  );
};

export default User;
