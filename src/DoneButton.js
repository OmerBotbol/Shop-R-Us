import React from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';

function DoneButton(navigation) {
  const handlePress = () => {
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
