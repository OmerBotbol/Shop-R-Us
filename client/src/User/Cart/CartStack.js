import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CartScreen from './CartScreen';
import OrderScreen from './OrderScreen';
import DoneButton from './DoneButton';

const Stack = createNativeStackNavigator();

function CartStack() {
  return (
    <Stack.Navigator initialRouteName="My Cart">
      <Stack.Screen name="My Cart" component={CartScreen} />
      <Stack.Screen
        name="My Order"
        options={({ navigation }) => ({
          headerRight: () => DoneButton(navigation),
        })}
        component={OrderScreen}
      />
    </Stack.Navigator>
  );
}

export default CartStack;
