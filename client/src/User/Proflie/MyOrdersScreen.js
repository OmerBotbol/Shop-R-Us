import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../General/colors';
import ErrorScreen from '../../General/ErrorScreen';
import LoadingScreen from '../../General/LoadingScreen';

function MyOrdersScreen({ route }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:8080/api/order?userId=${route.params.userId}`)
      .then((result) => {
        setOrders(result.data);
      })
      .catch((err) => {
        if (err.message.split(' ')[5] !== '404') {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {orders.length === 0 ? (
        <ErrorScreen error="Looks like you haven't made any orders yet" />
      ) : (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={orders}
            keyExtractor={(order, idx) => order + idx}
            renderItem={({ item }) => (
              <View style={styles.orderContainer}>
                <Text style={styles.orderData}>
                  <Text style={styles.orderDataTitle}>Order ID: </Text>
                  {item._id}
                </Text>
                <Text style={styles.orderData}>
                  <Text style={styles.orderDataTitle}>Ordered at: </Text>
                  {new Date(item.orderDate).toDateString()}
                </Text>
                <FlatList
                  horizontal={true}
                  contentContainerStyle={styles.itemsList}
                  data={item.items}
                  keyExtractor={(order, idx) => order + idx}
                  renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.image}
                      />
                    </View>
                  )}
                />
                <Text style={styles.orderData}>
                  <Text style={styles.orderDataTitle}>Total price: </Text>
                  {item.totalPrice}$
                </Text>
              </View>
            )}
          />
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.beige,
    width: '100%',
    height: '100%',
  },
  orderContainer: {
    backgroundColor: colors.darkBlue,
    margin: 10,
    padding: 10,
    borderRadius: 15,
  },
  orderData: {
    fontSize: 16,
    color: 'white',
  },
  orderDataTitle: {
    fontWeight: 'bold',
  },
  itemsList: {
    backgroundColor: colors.lightBlue,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 0.5,
    borderColor: colors.lightGray,
  },
});

export default MyOrdersScreen;
