import React, { useContext, useState } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import { colors } from '../../General/colors';
import CustomButton from '../../General/CustomButton';
import DismissKeyboard from '../../General/DismissKeyboard';
import { myUserContext } from '../../General/UserContext';

function HomeScreen({ navigation }) {
  const [searchInput, setSearchInput] = useState('');
  const [items, setItems] = useState([]);
  const { ipAddress } = useContext(myUserContext);

  const handlePress = () => {
    axios
      .get(`http://${ipAddress}:8080/api/item?key=name&value=${searchInput}`)
      .then((result) => {
        setItems(result.data);
        Keyboard.dismiss();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
        <DismissKeyboard>
          <TextInput
            style={styles.searchInput}
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder="I'm looking for..."
          />
        </DismissKeyboard>
        <CustomButton onPress={() => handlePress()}>search</CustomButton>
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
