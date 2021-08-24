import axios from 'axios';
import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { myCartContext } from '../CartContext';
import { myUserContext } from '../../General/UserContext';

function DoneButton(navigation) {
  const { cart, deleteAll } = useContext(myCartContext);
  const { user, ipAddress } = useContext(myUserContext);
  const handlePress = () => {
    const totalPrice = cart.reduce((initial, item) => {
      return initial + item.price;
    }, 0);
    const dataToSend = { items: cart, totalPrice, userId: user.userId };
    axios
      .post(`http://${ipAddress}:8080/api/order`, dataToSend)
      .then(() => {
        deleteAll();
        Alert.alert(
          'Your Order Has Received!',
          'You will get your reservation up to 14 business days',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <Text style={{ fontSize: 25 }}>Done</Text>
    </TouchableOpacity>
  );
}

export default DoneButton;
