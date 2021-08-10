import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './colors';
import { myContext } from './CartContext';

function OrderScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { cart } = useContext(myContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name: </Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>last Name: </Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Country: </Text>
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>City </Text>
        <TextInput style={styles.input} value={city} onChangeText={setCity} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address: </Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number: </Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <Text style={styles.totalPrice}>
        {`Total Price: ${cart.reduce((initial, item) => {
          return initial + item.price;
        }, 0)}$`}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.beige,
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 22,
  },
  input: {
    backgroundColor: 'white',
    width: 170,
    height: 25,
    fontSize: 22,
  },
  totalPrice: {
    fontSize: 25,
    borderWidth: 1,
    position: 'absolute',
    right: 0,
    margin: 10,
    padding: 5,
    backgroundColor: colors.lightGray,
    borderColor: colors.darkGray,
  },
});

export default OrderScreen;
