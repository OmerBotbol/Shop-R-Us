import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../General/CustomButton';
import { myCartContext } from '../CartContext';
import { colors } from '../../General/colors';
import { myUserContext } from '../../General/UserContext';

function CartScreen({ navigation }) {
  const { cart, deleteOne } = useContext(myCartContext);
  const [cartDisplay, setCartDisplay] = useState([]);

  useEffect(() => {
    const newCart = cart?.reduce((filtered, item) => {
      const index = filtered.findIndex(
        (filteredItem) => filteredItem._id === item._id
      );
      if (index === -1) {
        filtered.push({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: 1,
        });
        return filtered;
      }
      filtered[index].quantity += 1;
      filtered[index].price += item.price;
      return filtered;
    }, []);

    setCartDisplay(newCart);
  }, [cart]);

  const handleOrder = () => {
    if (cart.length === 0) {
      return Alert.alert('Oops!', 'Your cart is empty!', ['ok']);
    }
    navigation.navigate('My Order');
  };

  return (
    <SafeAreaView style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.message}>
          <Text style={styles.messageText}>Your cart is empty!</Text>
        </View>
      ) : (
        <FlatList
          data={cartDisplay}
          style={styles.cartList}
          keyExtractor={(item, idx) => item + idx}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text
                style={styles.cartListItem}
              >{`${item.quantity}X ${item.name} - ${item.price}$`}</Text>
              <View style={styles.buttonContainer}>
                <CustomButton onPress={() => deleteOne(item)}>
                  REMOVE
                </CustomButton>
              </View>
            </View>
          )}
        />
      )}
      <Text style={styles.totalPrice}>
        {`Total Price: ${cart.reduce((initial, item) => {
          return initial + item.price;
        }, 0)}$`}
      </Text>
      <CustomButton onPress={() => handleOrder()}>Order</CustomButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  message: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 25,
  },
  cartList: {
    marginTop: 20,
    flexDirection: 'column',
    height: 300,
  },
  cartListItem: {
    fontSize: 25,
    textAlign: 'center',
    width: 250,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default CartScreen;
