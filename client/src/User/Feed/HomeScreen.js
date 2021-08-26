import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../../General/colors';
import CustomButton from '../../General/CustomButton';
import DismissKeyboard from '../../General/DismissKeyboard';
import LoadingScreen from '../../General/LoadingScreen';
import { myUserContext } from '../../General/UserContext';

function HomeScreen({ navigation }) {
  const [searchInput, setSearchInput] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(true);
  const { ipAddress } = useContext(myUserContext);

  useEffect(() => {
    axios
      .get(`http://${ipAddress}:8080/api/item/tags`)
      .then((result) => {
        setTags(result.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

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
        <CustomButton
          onPress={() => navigation.navigate('List', { searchInput })}
        >
          search
        </CustomButton>
      </View>
      <FlatList
        data={tags}
        style={styles.tagList}
        // contentContainerStyle={{ alignItems: 'center' }}
        keyExtractor={(item, idx) => item + idx}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('List', { searchInput: item.tag })
            }
          >
            <View style={styles.tagContainer}>
              <Image
                source={{ uri: item.imageUrl }}
                borderRadius={50}
                style={styles.tagImage}
              />
              <Text style={styles.tagName}>{item.tag}</Text>
            </View>
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

  tagList: {
    marginTop: 120,
    width: '100%',
  },
  tagContainer: {
    width: '95%',
    borderWidth: 1,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    backgroundColor: colors.lightBlue,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  tagImage: {
    width: 50,
    height: 50,
  },

  tagName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HomeScreen;
