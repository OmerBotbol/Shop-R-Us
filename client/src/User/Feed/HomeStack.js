import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ProductScreen from './ProductScreen';
import AddButton from './AddButton';
import ItemsScreen from './ItemsScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        options={{ headerShown: false }}
        name="home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="List"
        options={({ route }) => ({ headerTitle: route.params.searchInput })}
        component={ItemsScreen}
      />
      <Stack.Screen
        name="product"
        options={({ navigation, route }) => ({
          headerTitle: route.params.name,
          headerRight: () => AddButton(route.params.id, navigation),
        })}
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
