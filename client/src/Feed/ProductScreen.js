import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../colors';

function ProductScreen({ route }) {
  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8080/api/item?key=id&value=${route.params.id}`)
      .then((result) => {
        setItemData(result.data[0]);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.productData}>
          <Text style={styles.header}>{itemData.name}</Text>
          <Image source={{ uri: itemData.imageUrl }} style={styles.image} />
          <Text style={styles.description}>{itemData.description}</Text>
          <View style={styles.numberOfItems}>
            <TouchableOpacity onPress={() => setQuantity((prev) => prev - 1)}>
              <Text style={styles.changeButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity((prev) => prev + 1)}>
              <Text style={styles.changeButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.beige,
    flex: 1,
  },
  productData: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    paddingLeft: 5,
    paddingBottom: 10,
  },
  image: {
    width: 250,
    height: 250,
  },
  description: {
    padding: 10,
    fontSize: 20,
  },
  numberOfItems: {
    flex: 1,
    flexDirection: 'row',
  },
  quantity: {
    width: 30,
    backgroundColor: 'white',
    height: 30,
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  changeButton: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    textAlign: 'center',
    padding: 0,
    backgroundColor: colors.darkGray,
    color: 'white',
  },
});

export default ProductScreen;
