import React from 'react'
import { StyleSheet, Text, TextInput, View , Image,} from 'react-native'

const SearchBar = () => {
  return (
   <View style={styles.container}>
       <Image
              source={require('../../assets/search.png')}
              style={{
                width: 17,
                height: 17,
                position: 'absolute',
                right: 20,
                top: 10,
              }}
            />
    <TextInput
     style={styles.searchBar}
     placeholder="Search here...."
     placeholderTextColor="black"
     keyboardType="default"
     />
     </View>
  )
}

export default SearchBar;
const styles = StyleSheet.create({
    searchBar: {
      borderWidth: 1,
      borderColor:'#dadae8',
      height: 40,
      borderRadius: 40,
      fontSize: 15,
      paddingLeft:15
    },
    container: {
    //   justifyContent: 'center',
      marginLeft:20,
      marginRight:20
    },
    clearIcon: {
      position: 'absolute',
      right: 10,
    },
  });