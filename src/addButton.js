import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { myContext } from './CartContext';

function addButton(item) {
  const { add } = useContext(myContext);
  const handlePress = (itemToAdd) => {
    add(itemToAdd);
    Alert.alert('Added successfully!', `you added 1 ${item} to your cart`, [
      'ok',
    ]);
  };

  return (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Text style={{ fontSize: 30 }}>+</Text>
    </TouchableOpacity>
  );
}

export default addButton;
