import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="login"
        component={LoginScreen}
      />
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;
