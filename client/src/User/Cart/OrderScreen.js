import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../General/colors';
import { myCartContext } from '../CartContext';
import { myUserContext } from '../../General/UserContext';
import axios from 'axios';

function OrderScreen() {
  const { cart } = useContext(myCartContext);
  const { user } = useContext(myUserContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8080/api/user/?id=${user.userId}`, {
        headers: {
          authorization: 'Bearer ' + user.userToken,
        },
      })
      .then((result) => {
        setUserData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>{userData?.address}</Text>
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
