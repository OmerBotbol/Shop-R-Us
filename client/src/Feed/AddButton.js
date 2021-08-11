import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { myCartContext } from '../CartContext';

function AddButton(item, price, navigation) {
  const { add } = useContext(myCartContext);
  const handlePress = (itemToAdd) => {
    add(itemToAdd);
    Alert.alert('Added successfully', `you added 1 ${item} to your cart`, [
      { text: 'go homepage', onPress: () => navigation.goBack() },
      { text: 'go cart', onPress: () => navigation.navigate('Cart') },
    ]);
  };

  return (
    <TouchableOpacity onPress={() => handlePress({ name: item, price })}>
      <Text style={{ fontSize: 30 }}>+</Text>
    </TouchableOpacity>
  );
}

export default AddButton;
