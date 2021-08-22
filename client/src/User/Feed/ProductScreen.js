import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { myCartContext } from '../CartContext';
import { colors } from '../../General/colors';
import { myUserContext } from '../../General/UserContext';

function ProductScreen({ route }) {
  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(true);
  const { quantity, setQuantity } = useContext(myCartContext);
  const { user } = useContext(myUserContext);
  useEffect(() => {
    console.log(user);
    axios
      .get(`http://10.0.2.2:8080/api/item?key=id&value=${route.params.id}`)
      .then((result) => {
        setItemData(result.data[0]);
        setQuantity(1);
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
            <TouchableOpacity
              onPress={() => quantity > 1 && setQuantity((prev) => prev - 1)}
            >
              <Text style={styles.changeButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity((prev) => prev + 1)}>
              <Text style={styles.changeButton}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>Price: {itemData.price * quantity}$</Text>
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
    flex: 2,
    width: '100%',
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
    height: 30,
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  changeButton: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.darkGray,
    width: 30,
    height: 30,
    textAlign: 'center',
    backgroundColor: colors.lightGray,
    color: 'white',
    elevation: 8,
  },
  price: {
    flex: 1,
    alignItems: 'flex-start',
    fontSize: 25,
    width: '100%',
    paddingLeft: 10,
  },
});

export default ProductScreen;
