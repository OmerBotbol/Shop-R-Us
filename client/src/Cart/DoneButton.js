import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { myCartContext } from '../CartContext';
import { myUserContext } from '../userContext';

function DoneButton(navigation) {
  const { deleteAll } = useContext(myCartContext);
  const { user } = useContext(myUserContext);
  const handlePress = () => {
    if (Object.keys(user).length !== 6) {
      return Alert.alert(
        'Ops',
        'Please fill all the sections before submitting',
        ['ok']
      );
    }
    console.log(user);
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
