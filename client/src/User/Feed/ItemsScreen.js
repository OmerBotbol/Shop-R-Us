import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
  View,
  Image,
} from 'react-native';
import { colors } from '../../General/colors';
import axios from 'axios';
import LoadingScreen from '../../General/LoadingScreen';
import { myUserContext } from '../../General/UserContext';

function ItemsScreen({ route, navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ipAddress } = useContext(myUserContext);

  useEffect(() => {
    axios
      .get(
        `http://${ipAddress}:8080/api/item?key=name&value=${route.params.searchInput}`
      )
      .then((result) => {
        setItems(result.data);
        Keyboard.dismiss();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [route.params.searchInput]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        style={styles.itemList}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        keyExtractor={(item, idx) => item + idx}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('product', {
                id: item._id,
                name: item.name,
              })
            }
          >
            <View style={styles.item}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.itemPrice}>{item.price}$</Text>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.beige,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    width: 150,
    borderWidth: 1,
    backgroundColor: colors.lightBlue,
    padding: 10,
    margin: 10,
  },

  image: {
    width: 100,
    height: 100,
  },

  itemName: {
    fontSize: 16,
    textAlign: 'center',
  },

  itemPrice: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  itemList: {
    paddingTop: 20,
    width: '100%',
    borderWidth: 1,
  },
});

export default ItemsScreen;
