import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { colors } from './colors';

const allItems = [
  { name: 'book', price: 7 },
  { name: 'shirt', price: 5 },
  { name: 'computer', price: 20 },
  { name: 'chair', price: 4 },
  { name: 'blanket', price: 3 },
  { name: 'xbox', price: 27 },
  { name: 'dog', price: 30 },
  { name: 'cake', price: 3 },
  { name: 'table', price: 4 },
];

function HomeScreen({ navigation }) {
  const [searchInput, setSearchInput] = useState('');
  const [items, setItems] = useState(allItems);

  const handlePress = () => {
    const re = new RegExp(searchInput, 'g');
    const newItemsArr = allItems.filter((item) => item.match(re));
    setItems(newItemsArr);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          value={searchInput}
          onChangeText={setSearchInput}
          placeholder="I'm looking for..."
        />
        <Button
          title="SEARCH"
          color={colors.darkBlue}
          style={styles.searchButton}
          onPress={() => handlePress()}
        />
      </View>
      <FlatList
        data={items}
        style={styles.itemList}
        keyExtractor={(item, idx) => item + idx}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('product', {
                name: item.name,
                price: item.price,
              })
            }
          >
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.beige,
  },
  searchBox: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    height: 50,
    borderWidth: 1,
    marginTop: 50,
    padding: 5,
    backgroundColor: colors.darkGray,
  },
  searchInput: {
    flex: 0.9,
    fontSize: 20,
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  searchButton: {
    flex: 0.2,
    paddingTop: 8,
  },

  item: {
    flex: 1,
    justifyContent: 'flex-end',
    textAlign: 'center',
    borderWidth: 1,
    fontSize: 30,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.lightBlue,
  },

  itemList: {
    flex: 1,
    marginTop: 120,
    width: '100%',
  },
});

export default HomeScreen;
