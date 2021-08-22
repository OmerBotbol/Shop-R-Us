import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../../General/CustomButton';
import { myUserContext } from '../../General/UserContext';

function ProfileScreen() {
  const { logout } = useContext(myUserContext);
  return (
    <View>
      <CustomButton onPress={() => logout()}>logout</CustomButton>
      <Text>this is the profile screen</Text>
    </View>
  );
}

export default ProfileScreen;
