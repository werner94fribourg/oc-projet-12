import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import Title from '../components/User/Title/Title';
import { UserContext } from '../context/user-context';

const User = () => {
  const { user, getUser } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    getUser(id);
  }, [id, getUser]);

  console.log(user);

  const { userInfos } = user;
  return (
    <React.Fragment>
      <Title firstName={userInfos?.firstName} />
    </React.Fragment>
  );
};

export default User;
