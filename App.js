import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import ProductScreen from './src/ProductScreen';
import addButton from './src/addButton';
import CartContext from './src/CartContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartContext>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            options={{ headerShown: false }}
            name="home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="product"
            options={({ route }) => ({
              headerTitle: route.params.name,
              headerRight: () => addButton(route.params.name),
            })}
            component={ProductScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext>
  );
}
