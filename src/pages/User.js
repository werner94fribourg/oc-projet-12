import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import Header from '../components/User/Header/Header';
import Activity from '../components/User/UserLeftLayout/Activity/Activity';
import Sessions from '../components/User/UserLeftLayout/UserLeftSecondRow/Sessions/Sessions';
import UserLeftLayout from '../components/User/UserLeftLayout/UserLeftLayout';
import { UserContext } from '../context/user-context';
import UserLeftSecondRow from '../components/User/UserLeftLayout/UserLeftSecondRow/UserLeftSecondRow';

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
      <UserLeftLayout>
        <Activity />
        <UserLeftSecondRow>
          <Sessions />
        </UserLeftSecondRow>
      </UserLeftLayout>
    </React.Fragment>
  );
};

export default User;
