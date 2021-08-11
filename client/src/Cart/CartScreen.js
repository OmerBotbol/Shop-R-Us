import React, { useContext } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { myCartContext } from '../CartContext';
import { colors } from '../colors';

function CartScreen({ navigation }) {
  const { cart, deleteOne } = useContext(myCartContext);

  const handleOrder = () => {
    if (cart.length === 0) {
      return Alert.alert('Ops!', 'Your cart is empty!', ['ok']);
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
          data={cart}
          style={styles.cartList}
          keyExtractor={(item, idx) => item + idx}
          renderItem={({ item }) => (
            <View>
              <Text
                style={styles.cartListItem}
              >{`${item.quantity}x ${item.name} - ${item.price}$`}</Text>
              <Button title="DELETE" onPress={() => deleteOne(item)} />
            </View>
          )}
        />
      )}
      <Text style={styles.totalPrice}>
        {`Total Price: ${cart.reduce((initial, item) => {
          return initial + item.price;
        }, 0)}$`}
      </Text>
      <Button
        title="Order"
        color={colors.darkBlue}
        onPress={() => handleOrder()}
      />
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
  cartListItem: {
    fontSize: 25,
    textAlign: 'center',
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
