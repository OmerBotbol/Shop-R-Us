import React from 'react';
import CartContext from './CartContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './Feed/HomeStack';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../General/colors';
import ProfileStack from './Proflie/ProfileStack';
import CartScreen from './Cart/CartScreen';

const Tab = createBottomTabNavigator();

export default function UserTabs() {
  return (
    <CartContext>
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
            if (route.name === 'Cart') {
              iconName = 'shopping-cart';
            }
            if (route.name === 'Profile') {
              iconName = 'user';
            }
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Feed" component={HomeStack} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </CartContext>
  );
}
