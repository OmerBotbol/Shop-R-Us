import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../User/Feed/HomeStack';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../General/colors';
import ProfileStack from '../User/Profile/ProfileStack';
import NewItemScreen from './NewItemScreen';

const Tab = createBottomTabNavigator();

function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        activeTintColor: colors.darkBlue,
        inactiveTintColor: colors.lightGray,
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = 'list';
          }
          if (route.name === 'Add item') {
            iconName = 'plus';
          }
          if (route.name === 'Profile') {
            iconName = 'user';
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={HomeStack} />
      <Tab.Screen name="Add item" component={NewItemScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default AdminTabs;
