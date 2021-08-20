import React, { useState } from 'react';
import AuthStack from './src/Auth/AuthStack';
import { myUserContext } from './src/General/UserContext';
import UserTabs from './src/User/UserTabs';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [user, setUser] = useState();

  return (
    <myUserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <UserTabs /> : <AuthStack />}
      </NavigationContainer>
    </myUserContext.Provider>
  );
}
