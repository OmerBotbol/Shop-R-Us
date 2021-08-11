import React, { useState } from 'react';
import axios from 'axios';
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

import { colors } from '../colors';

function HomeScreen({ navigation }) {
  const [searchInput, setSearchInput] = useState('');
  const [items, setItems] = useState([]);

  const handlePress = () => {
    axios
      .get(`http://10.0.2.2:8080/api/item?key=name&value=${searchInput}`)
      .then((result) => {
        setItems(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
                id: item._id,
                name: item.name,
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
