import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { myContext } from './CartContext';
import { colors } from './colors';

function ProductScreen({ route }) {
  const { cart } = useContext(myContext);
  return (
    <View style={styles.container}>
      <Text>this it the product {route.params.name}</Text>
      <Text>
        your cart is:{' '}
        {cart.map((item) => `${item.quantity}x ${item.name}`).join()}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.beige,
    flex: 1,
  },
});

export default ProductScreen;
