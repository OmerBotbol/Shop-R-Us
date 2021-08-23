import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../General/colors';
import { AntDesign } from '@expo/vector-icons';

function ListItem({ children, onPress, image, Component }) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Component name={image} size={24} color="black" style={{ padding: 10 }} />
      <View style={styles.optionLine}>
        <Text style={styles.optionText}>{children}</Text>
        <AntDesign
          name="right"
          size={24}
          color="black"
          style={{ paddingRight: 10 }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },

  optionLine: {
    borderColor: colors.darkGray,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionText: {
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    color: 'black',
  },
});

export default ListItem;
