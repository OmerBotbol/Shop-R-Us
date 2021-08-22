import axios from 'axios';
import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../General/colors';
import CustomButton from '../General/CustomButton';
import DismissKeyboard from '../General/DismissKeyboard';
import { myUserContext } from '../General/UserContext';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const { setUser } = useContext(myUserContext);

  const handleLogin = () => {
    axios
      .post('http://10.0.2.2:8080/api/user/login', { password, email })
      .then((result) => {
        setMessage('');
        setUser(result.data[0]);
      })
      .catch((err) => {
        err.message.split(' ')[5] === '404'
          ? setMessage("User doesn't exists")
          : setMessage('Incorrect password');
      });
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <Text style={styles.pageTitle}>Shop R Us</Text>
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              style={styles.input}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              style={styles.input}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <CustomButton
              containerStyle={styles.button}
              onPress={() => navigation.navigate('Register')}
            >
              register
            </CustomButton>
            <CustomButton
              containerStyle={styles.button}
              onPress={() => handleLogin()}
            >
              login
            </CustomButton>
          </View>
        </View>
        <Text style={styles.message}>{message}</Text>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.beige,
    position: 'relative',
  },

  pageTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    position: 'absolute',
    top: 100,
  },

  loginBox: {
    borderWidth: 1,
    padding: 20,
    backgroundColor: 'white',
    width: 300,
    height: 300,
    position: 'relative',
    borderRadius: 20,
    alignItems: 'center',
  },

  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    height: 50,
    borderRadius: 20,
    fontSize: 20,
    paddingLeft: 10,
  },

  inputContainer: {
    flex: 0.55,
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },

  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    margin: 12,
  },

  button: {
    width: 100,
  },

  message: {
    fontSize: 30,
    position: 'absolute',
    bottom: 50,
  },
});

export default LoginScreen;
