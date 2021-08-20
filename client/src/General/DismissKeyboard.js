import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

function DismissKeyboard({ children }) {
  return (
    <TouchableWithoutFeedback
      accessible={false}
      onPress={() => Keyboard.dismiss()}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}

export default DismissKeyboard;
