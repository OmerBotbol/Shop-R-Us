import React from 'react';
import CartContext from './src/CartContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './src/Feed/HomeStack';
import CartStack from './src/Cart/CartStack';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/colors';
import UserContext from './src/UserContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <UserContext>
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
                return (
                  <FontAwesome name={iconName} size={size} color={color} />
                );
              },
            })}
          >
            <Tab.Screen name="Feed" component={HomeStack} />
            <Tab.Screen name="Cart" component={CartStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </CartContext>
    </UserContext>
  );
}
