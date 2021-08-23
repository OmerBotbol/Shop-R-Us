import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from './colors';

function CustomButton({
  children,
  onPress,
  textStyle,
  containerStyle,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: disabled ? colors.lightBlue : colors.darkBlue,
        ...containerStyle,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{ ...styles.text, ...textStyle }}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 10,
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default CustomButton;
