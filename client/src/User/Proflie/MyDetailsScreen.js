import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DismissKeyboard from '../../General/DismissKeyboard';
import CustomButton from '../../General/CustomButton';
import { colors } from '../../General/colors';
import axios from 'axios';
import { myUserContext } from '../../General/UserContext';

function MyDetailsScreen({ route, navigation }) {
  const { user } = useContext(myUserContext);
  const [firstName, setFirstName] = useState([
    route.params.user.firstName,
    false,
    true,
  ]);
  const [phoneNumber, setPhoneNumber] = useState([
    route.params.user.phoneNumber,
    false,
    true,
  ]);
  const [lastName, setLastName] = useState([
    route.params.user.lastName,
    false,
    true,
  ]);
  const [email, setEmail] = useState([route.params.user.email, false, true]);
  const [country, setCountry] = useState([
    route.params.user.country,
    false,
    true,
  ]);
  const [city, setCity] = useState([route.params.user.city, false, true]);
  const [address, setAddress] = useState([
    route.params.user.address,
    false,
    true,
  ]);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (
      !firstName[2] ||
      !lastName[2] ||
      !email[2] ||
      !country[2] ||
      !city[2] ||
      !address[2] ||
      !phoneNumber[2]
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  });

  const setValue = (stateName, newValue, setFunction, isFocus) => {
    const originalValue = route.params.user[stateName];
    let isEqual;
    newValue === originalValue ? (isEqual = true) : (isEqual = false);
    return setFunction([newValue, isFocus, isEqual]);
  };

  const handlePress = () => {
    const allValues = [
      { name: 'firstName', value: firstName },
      { name: 'lastName', value: lastName },
      { name: 'email', value: email },
      { name: 'country', value: country },
      { name: 'city', value: city },
      { name: 'address', value: address },
      { name: 'phoneNumber', value: phoneNumber },
    ];

    const changedValues = allValues.reduce((filtered, option, i) => {
      if (!option.value[2]) {
        filtered[option.name] = option.value[0];
      }
      return filtered;
    }, {});
    axios
      .put(`http://10.0.2.2:8080/api/user/${user.userId}`, changedValues, {
        headers: {
          authorization: 'Bearer ' + user.userToken,
        },
      })
      .then(() => {
        Alert.alert('Finished', 'We updated your profile', [
          {
            text: 'ok',
            onPress: () =>
              navigation.navigate('ProfileScreen', { update: true }),
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <DismissKeyboard>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name:</Text>
            <TextInput
              style={{
                ...styles.input,
                borderBottomColor: firstName[1]
                  ? colors.darkBlue
                  : colors.lightGray,
              }}
              value={firstName[0]}
              onChangeText={(e) => setValue('firstName', e, setFirstName, true)}
              onFocus={() =>
                setValue('firstName', firstName[0], setFirstName, true)
              }
              onBlur={() =>
                setValue('firstName', firstName[0], setFirstName, false)
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
              style={{
                ...styles.input,
                borderBottomColor: lastName[1]
                  ? colors.darkBlue
                  : colors.lightGray,
              }}
              value={lastName[0]}
              onChangeText={(e) => setValue('lastName', e, setLastName, true)}
              onFocus={() =>
                setValue('lastName', lastName[0], setLastName, true)
              }
              onBlur={() =>
                setValue('lastName', lastName[0], setLastName, false)
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={{
                ...styles.input,
                borderBottomColor: email[1]
                  ? colors.darkBlue
                  : colors.lightGray,
              }}
              value={email[0]}
              onChangeText={(e) => setValue('email', e, setEmail, true)}
              onFocus={() => setValue('email', email[0], setEmail, true)}
              onBlur={() => setValue('email', email[0], setEmail, false)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Country:</Text>
            <TextInput
              style={{
                ...styles.input,
                borderBottomColor: country[1]
                  ? colors.darkBlue
                  : colors.lightGray,
              }}
              value={country[0]}
              onChangeText={(e) => setValue('country', e, setCountry, true)}
              onFocus={() => setValue('country', country[0], setCountry, true)}
              onBlur={() => setValue('country', country[0], setCountry, false)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>City:</Text>
            <TextInput
              style={{
                ...styles.input,
                borderBottomColor: city[1] ? colors.darkBlue : colors.lightGray,
              }}
              value={city[0]}
              onChangeText={(e) => setValue('city', e, setCity, true)}
              onFocus={() => setValue('city', city[0], setCity, true)}
              onBlur={() => setValue('city', city[0], setCity, false)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address:</Text>
            <TextInput
              style={{
                ...styles.input,
                borderBottomColor: address[1]
                  ? colors.darkBlue
                  : colors.lightGray,
              }}
              value={address[0]}
              onChangeText={(e) => setValue('address', e, setAddress, true)}
              onFocus={() => setValue('address', address[0], setAddress, true)}
              onBlur={() => setValue('address', address[0], setAddress, false)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
              style={{
                ...styles.input,
                borderBottomColor: phoneNumber[1]
                  ? colors.darkBlue
                  : colors.lightGray,
              }}
              keyboardType="number-pad"
              value={phoneNumber[0]}
              onChangeText={(e) =>
                setValue('phoneNumber', e, setPhoneNumber, true)
              }
              onFocus={() =>
                setValue('phoneNumber', phoneNumber[0], setPhoneNumber, true)
              }
              onBlur={() =>
                setValue('phoneNumber', phoneNumber[0], setPhoneNumber, false)
              }
            />
          </View>
          <CustomButton
            disabled={disable}
            containerStyle={styles.button}
            onPress={() => handlePress()}
          >
            save changes
          </CustomButton>
        </ScrollView>
      </DismissKeyboard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.beige,
    width: '100%',
    height: '100%',
  },

  inputContainer: {
    width: '90%',
    margin: 10,
  },

  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  input: {
    width: '90%',
    height: 30,
    paddingLeft: 10,
    fontSize: 20,
    borderBottomWidth: 1,
  },

  button: {
    marginTop: 10,
  },
});

export default MyDetailsScreen;
