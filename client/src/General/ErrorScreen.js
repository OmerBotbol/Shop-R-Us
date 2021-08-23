import React from 'react';
import { View, Text } from 'react-native';

function ErrorScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      ,
      <Text>Oops... Looks like there is a problem, please try again later</Text>
    </View>
  );
}

export default ErrorScreen;
