import React from 'react';
import CartContext from './CartContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './Feed/HomeStack';
import CartStack from './Cart/CartStack';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from '../General/colors';

const Tab = createBottomTabNavigator();

export default function UserTabs() {
  return (
    <CartContext>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            activeTintColor: colors.darkBlue,
            inactiveTintColor: colors.lightGray,
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Feed') {
                iconName = 'list';
              } else {
                iconName = 'shopping-cart';
              }
              return <FontAwesome name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Feed" component={HomeStack} />
          <Tab.Screen name="Cart" component={CartStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </CartContext>
  );
}
