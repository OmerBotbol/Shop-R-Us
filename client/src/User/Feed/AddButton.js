import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { myUserContext } from '../../General/UserContext';
import { myCartContext } from '../CartContext';

function AddButton(id, navigation) {
  const { add, quantity } = useContext(myCartContext);
  const { ipAddress } = useContext(myUserContext);
  const [item, setItem] = useState({});

  useEffect(() => {
    axios
      .get(`http://${ipAddress}:8080/api/item?key=id&value=${id}`)
      .then((result) => {
        setItem(result.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePress = () => {
    add(item, quantity);
    Alert.alert(
      'Added successfully',
      `you added ${quantity} ${item.name} to your cart`,
      [
        { text: 'go cart', onPress: () => navigation.navigate('Cart') },
        { text: 'continue' },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <Text style={{ fontSize: 30 }}>+</Text>
    </TouchableOpacity>
  );
}

export default AddButton;
