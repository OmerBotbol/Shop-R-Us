import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../General/colors';
import CustomButton from '../General/CustomButton';
import DismissKeyboard from '../General/DismissKeyboard';
import { EvilIcons } from '@expo/vector-icons';
import { myUserContext } from '../General/UserContext';

function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [valid, setValid] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const { ipAddress } = useContext(myUserContext);

  useEffect(() => {
    const reg = '[a-zA-Z0-9]$';
    if (!password.match(reg) || password.length < 8) {
      setPasswordMessage(
        'the password need to be at least 8 characters (letters and numbers only)'
      );
      setValid(false);
    } else {
      setPasswordMessage('');
      setValid(true);
    }
  }, [password]);

  const handlePress = () => {
    const userToSend = {
      firstName,
      lastName,
      email,
      password,
      country,
      city,
      address,
      phoneNumber,
    };
    if (Object.values(userToSend).every((item) => item)) {
      if (valid && confirmPassword === password) {
        axios
          .post(`http://${ipAddress}:8080/api/user/create`, userToSend)
          .then(() => {
            navigation.goBack();
          })
          .catch((err) => {
            const httpError = err.message.split(' ')[5];
            httpError === '403'
              ? setMessage('Invalid password')
              : httpError === '409'
              ? setMessage('Email exists')
              : setMessage('Error occur, please try again later');
          });
      } else {
        setMessage('Invalid password');
      }
    } else {
      setMessage('Please fill ALL fields');
    }
  };

  return (
    <View style={styles.container}>
      <DismissKeyboard>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.header}>Register</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name: </Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name: </Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <View style={{ width: '60%' }}>
                <Text style={styles.label}>Password:</Text>
                <Text style={{ paddingBottom: 10 }}>{passwordMessage}</Text>
              </View>
              {password ? (
                <EvilIcons
                  name={!valid ? 'close-o' : 'check'}
                  size={30}
                  color={!valid ? 'red' : 'green'}
                />
              ) : (
                <Text></Text>
              )}
            </View>
            <TextInput
              style={styles.input}
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>confirm Password:</Text>
              {confirmPassword ? (
                <EvilIcons
                  name={confirmPassword !== password ? 'close-o' : 'check'}
                  size={30}
                  color={confirmPassword !== password ? 'red' : 'green'}
                />
              ) : (
                <Text></Text>
              )}
            </View>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email: </Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
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
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
            />
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
              keyboardType="number-pad"
              onChangeText={setPhoneNumber}
            />
          </View>
          <CustomButton
            onPress={() => handlePress()}
            containerStyle={styles.button}
          >
            register
          </CustomButton>
          <Text style={styles.message}>{message}</Text>
        </ScrollView>
      </DismissKeyboard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.beige,
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    fontSize: 20,
  },
  button: {
    marginTop: 10,
  },
  message: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    padding: 15,
  },
});

export default RegisterScreen;
