import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../General/colors';
import { myCartContext } from '../CartContext';
import { myUserContext } from '../../General/UserContext';

function OrderScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { cart } = useContext(myCartContext);
  const { updateUser } = useContext(myUserContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name: </Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(e) => {
            setFirstName(e);
            updateUser('firstName', e);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>last Name: </Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(e) => {
            setLastName(e);
            updateUser('lastName', e);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Country: </Text>
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={(e) => {
            setCountry(e);
            updateUser('country', e);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>City </Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={(e) => {
            setCity(e);
            updateUser('city', e);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address: </Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(e) => {
            setAddress(e);
            updateUser('address', e);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number: </Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          keyboardType="number-pad"
          onChangeText={(e) => {
            setPhoneNumber(e);
            updateUser('phoneNumber', e);
          }}
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
