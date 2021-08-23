import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './colors';
import LoadingScreen from './LoadingScreen';

function ErrorScreen({ error }) {
  const [errorText, setErrorText] = useState(
    'Oops... Looks like there is a problem, please try again later'
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (error) {
      setErrorText(error);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.lightGray,
  },
  errorText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ErrorScreen;
