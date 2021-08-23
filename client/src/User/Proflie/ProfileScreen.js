import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../General/colors';
import ErrorScreen from '../../General/ErrorScreen';
import LoadingScreen from '../../General/LoadingScreen';
import { myUserContext } from '../../General/UserContext';
import ListItem from './ListItem';
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

function ProfileScreen({ navigation, route }) {
  const [userData, setUserData] = useState('');
  const { logout, user } = useContext(myUserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user.userId) {
      setLoading(true);
      axios
        .get(`http://10.0.2.2:8080/api/user/?id=${user.userId}`, {
          headers: {
            authorization: 'Bearer ' + user.userToken,
          },
        })
        .then((result) => {
          setUserData(result.data);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, route.params]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSquare}></View>
      <View style={styles.userCircle}>
        <Text style={styles.userCircleText}>
          {userData.firstName[0].toUpperCase()}
          {userData.lastName[0].toUpperCase()}
        </Text>
      </View>
      <Text>Hi, {`${userData.firstName} ${userData.lastName}`}</Text>
      <ScrollView style={styles.optionsContainer}>
        <ListItem
          onPress={() =>
            navigation.navigate('My Orders', { userId: user.userId })
          }
          image="shopping-bag"
          Component={Feather}
        >
          My Orders
        </ListItem>
        <ListItem
          onPress={() => navigation.navigate('My Details', { user: userData })}
          image="card-account-details-outline"
          Component={MaterialCommunityIcons}
        >
          My Details
        </ListItem>
        <ListItem
          onPress={() => logout()}
          image="logout"
          Component={MaterialIcons}
        >
          Logout
        </ListItem>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.beige,
  },
  topSquare: {
    width: '100%',
    height: 130,
    backgroundColor: colors.lightBlue,
  },
  userCircle: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 20,
    marginTop: -50,
    backgroundColor: 'white',
    borderColor: colors.darkGray,
  },
  userCircleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },

  optionsContainer: {
    width: '100%',
    marginTop: 30,
    paddingBottom: 70,
  },
});

export default ProfileScreen;
