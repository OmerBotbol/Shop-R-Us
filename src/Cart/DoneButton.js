import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { myContext } from '../CartContext';

function DoneButton(navigation) {
  const { deleteAll } = useContext(myContext);
  const handlePress = () => {
    deleteAll();
    Alert.alert(
      'Your Order Has Received!',
      'You will get your reservation up to 14 business days',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <Text style={{ fontSize: 25 }}>Done</Text>
    </TouchableOpacity>
  );
}

export default DoneButton;
