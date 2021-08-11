import React, { useContext } from 'react';
import { Button, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { myContext } from '../CartContext';
import { colors } from '../colors';

function CartScreen({ navigation }) {
  const { cart } = useContext(myContext);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cart}
        style={styles.cartList}
        keyExtractor={(item, idx) => item + idx}
        renderItem={({ item }) => (
          <Text
            style={styles.cartListItem}
          >{`${item.quantity}x ${item.name} - ${item.price}$`}</Text>
        )}
      />
      <Text style={styles.totalPrice}>
        {`Total Price: ${cart.reduce((initial, item) => {
          return initial + item.price;
        }, 0)}$`}
      </Text>
      <Button
        title="Order"
        color={colors.darkBlue}
        onPress={() => navigation.navigate('My Order')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
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
