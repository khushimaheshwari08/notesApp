import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const Note = ({ item, onPress }) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '',
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
    marginLeft:30
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black'
  },
});

export default Note;