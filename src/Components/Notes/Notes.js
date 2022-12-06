import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SearchBar from './SearchBar';
import NoteInputModal from './NoteInputModal';

const Notes = () => {

  const navigation = useNavigation();
  const [name, setName] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [notes, setNotes] = useState([]);

  const onLogout = async () => {
    await AsyncStorage.setItem('isLogin', JSON.stringify(false));
    navigation.replace('login');
    return true;
  };

  const getUserName = async() => {
    let retrivedItem = await AsyncStorage.getItem('userData');
    let item = JSON.parse(retrivedItem);
    setName(item.name);
}

const handleonSubmit =async(title,desc) =>{
const note ={id : Date.now() ,title,desc,time : Date.now()}
const updatedNotes =[ ...notes,note]
setNotes(updatedNotes)
await AsyncStorage.setItem('notes',JSON.stringify(updatedNotes))
}

const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null){
      setNotes(JSON.parse(result));
    }
}

useEffect(() => {
findNotes()
}, [])


useEffect(() => {
  getUserName();
}, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity>
    <View style={styles.parent}>
      <Text style={styles.userName}>Hello,{name}</Text>
        <View style={styles.logoutBtn}>
          <TouchableOpacity onPress={() => onLogout()}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        </View>
        <SearchBar/>
        <FlatList data={notes} keyExtractor={item =>  item.id.toString()}/>
        <View style={styles.emptyHeaderContainer}>
        <Text style={styles.emptyHeader}>Add Notes</Text>
        <TouchableOpacity onPress={()=> setModalVisible(true)}>
        <Image
              source={require('../../assets/addIcon.png')}
              style={{
                width: 40,
                height: 40,
                // position: 'absolute',
                marginTop:20
              }}
            />
        </TouchableOpacity>
         </View>
         </TouchableOpacity>
        <NoteInputModal
         visible={modalVisible} 
         onClose={() => setModalVisible(false)}
         onSubmit={handleonSubmit}
         />
       
      </ScrollView>
    </View>
    )
}

export default Notes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff9999',
    flex: 1,
  },

parent:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems:'center',
  marginTop: 35,
  marginBottom: 25,
},

userName:{
  color:'#ff2746',
  marginLeft: 25,
  fontSize:40
},

  logoutBtn: {
    marginRight: 25,
    height: 50,
    width: 80,
    backgroundColor:'#ff2746',
    borderRadius: 6,
  },

  logoutText: {
    paddingTop: 15,
    textAlign: 'center',
    color: 'white',
  },
  emptyHeaderContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // marginTop:200
  },

  emptyHeader:{
    color:'black',
    marginLeft: 25,
    marginTop:180,
    fontSize:30,
    textTransform:'uppercase'
  },
});