import React, { useContext } from 'react';
import UserContext from './src/General/UserContext';
import AuthStack from './src/Auth/AuthStack';
import { myUserContext } from './src/General/UserContext';
import UserTabs from './src/User/UserTabs';

export default function App() {
  const { user } = useContext(myUserContext);
  console.log(user);
  return (
    <UserContext>
      {Object.keys(user).length ? <UserTabs /> : <AuthStack />}
    </UserContext>
  );
}
