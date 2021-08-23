import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MyOrdersScreen from './MyOrdersScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
      <Stack.Screen name="My Orders" component={MyOrdersScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
