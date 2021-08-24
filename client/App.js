import React, { useEffect, useReducer } from 'react';
import AuthStack from './src/Auth/AuthStack';
import { myUserContext } from './src/General/UserContext';
import UserTabs from './src/User/UserTabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoadingScreen from './src/General/LoadingScreen';
// import { IP_ADDRESS } from 'react-native-dotenv';

export default function App() {
  const initialLoginState = {
    userId: null,
    userToken: null,
    isAdmin: null,
    isLoading: true,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          userId: action.id,
          userToken: action.token,
          isAdmin: action.admin,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userId: null,
          userToken: null,
          isAdmin: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = {
    login: async (userData) => {
      const id = userData[0];
      const admin = userData[1];
      const token = userData[2];
      try {
        await AsyncStorage.setItem('accessToken', token);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', id, admin, token });
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem('accessToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    user: loginState,
    ipAddress: process.env.IP_ADDRESS || '10.0.2.2',
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const userToken = await AsyncStorage.getItem('accessToken');
        let userData = { data: { id: null, admin: null } };
        if (userToken) {
          userData = await axios.get(
            `http://${authContext.ipAddress}:8080/api/user/data`,
            {
              headers: {
                authorization: 'Bearer ' + userToken,
              },
            }
          );
        }
        dispatch({
          type: 'LOGIN',
          id: userData.data._id,
          admin: userData.data.isAdmin,
          token: userToken,
        });
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  if (loginState.isLoading) {
    return <LoadingScreen />;
  }
  return (
    <myUserContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken ? <UserTabs /> : <AuthStack />}
      </NavigationContainer>
    </myUserContext.Provider>
  );
}
