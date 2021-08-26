import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { myCartContext } from '../CartContext';
import { colors } from '../../General/colors';
import LoadingScreen from '../../General/LoadingScreen';
import { myUserContext } from '../../General/UserContext';

function ProductScreen({ navigation, route }) {
  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(true);
  const { quantity, setQuantity } = useContext(myCartContext);
  const { ipAddress } = useContext(myUserContext);
  useEffect(() => {
    axios
      .get(`http://${ipAddress}:8080/api/item?key=id&value=${route.params.id}`)
      .then((result) => {
        setItemData(result.data[0]);
        setQuantity(1);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
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
      </View>
      <FlatList
        data={itemData.tags}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'row',
          position: 'absolute',
          bottom: 80,
          left: 20,
        }}
        keyExtractor={(item, idx) => item + idx}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('List', { searchInput: item })}
          >
            <Text style={styles.tag}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.price}>Price: {itemData.price * quantity}$</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.beige,
    flex: 1,
    height: '100%',
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
    textAlign: 'center',
    maxHeight: 100,
    width: '90%',
  },
  numberOfItems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 20,
    padding: 5,
    color: 'white',
    backgroundColor: colors.lightGray,
    margin: 3,
  },
});

export default ProductScreen;
