import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../colors';

function ProductScreen({ route }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        {route.params.name}: {route.params.price}$
      </Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.beige,
    flex: 1,
  },
});

export default ProductScreen;
