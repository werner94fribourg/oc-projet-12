import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import Header from '../components/User/Header/Header';
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

const User = () => {
  const { user, getUser } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    getUser(id);
  }, [id, getUser]);

  const { userInfos, keyData } = user;
  let displayKeyData = [{ info: '', cat: 'calorie' }];

  if (keyData)
    displayKeyData = Object.entries(keyData).map(([key, value]) => {
      return {
        info: value,
        cat: key.slice(0, -5),
      };
    });

  console.log(displayKeyData);

  return (
    <React.Fragment>
      <Header firstName={userInfos?.firstName} />
      <UserLayout>
        <UserLeftLayout>
          <Activity />
          <UserLeftSecondRow>
            <Sessions />
            <Performance />
            <Score score={user.todayScore || 0} />
          </UserLeftSecondRow>
        </UserLeftLayout>
        <UserRightLayout>
          {displayKeyData.map(({ info, cat }) => (
            <InfoCard key={cat} cat={cat} info={info} />
          ))}
        </UserRightLayout>
      </UserLayout>
    </React.Fragment>
  );
};

export default User;
