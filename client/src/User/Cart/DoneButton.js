import axios from 'axios';
import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { myCartContext } from '../CartContext';
import { myUserContext } from '../../General/UserContext';

function DoneButton(navigation) {
  const { cart, deleteAll } = useContext(myCartContext);
  const { user } = useContext(myUserContext);
  const handlePress = () => {
    if (Object.keys(user).length !== 6) {
      return Alert.alert(
        'Ops',
        'Please fill all the sections before submitting',
        ['ok']
      );
    }
    const totalPrice = cart.reduce((initial, item) => {
      return initial + item.price;
    }, 0);
    user.totalPrice = totalPrice;
    axios.post('http://10.0.2.2:8080/api/order', user).then(() => {
      deleteAll();
      Alert.alert(
        'Your Order Has Received!',
        'You will get your reservation up to 14 business days',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      ).catch((e) => {
        console.log(e);
      });
    });
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <Text style={{ fontSize: 25 }}>Done</Text>
    </TouchableOpacity>
  );
}

export default DoneButton;
