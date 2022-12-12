import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState} from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
// import SearchBar from './SearchBar';
import NoteInputModal from './NoteInputModal';
import Note from './Note';
import { useNotes } from '../../context/NoteProvider';

const Notes = () => {

  const navigation = useNavigation();
  const [name, setName] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const { notes, setNotes } = useNotes();
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

// const findNotes = async () => {
//     const result = await AsyncStorage.getItem('notes');
//     if (result !== null){
//       setNotes(JSON.parse(result));
//     }
// }
const openNote = note => {
  navigation.navigate('noteDetail', { note });
};
// useEffect(() => {
// findNotes()
// // AsyncStorage.clear()
// }, [])


useEffect(() => {
  getUserName();
}, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity>
      <View style={styles.parent}>
      <Text style={styles.text}>Hii,</Text>
      <TouchableOpacity  onPress={() => navigation.navigate('userDetail')}>
      <Image
              source={require('../../assets/user.png')}
              style={{
                width: 50,
                height: 50,
                left:70
              }}
            />
      </TouchableOpacity>
        {/* <View
         style={styles.logoutBtn}
        > */}
          <TouchableOpacity onPress={() => onLogout()}>
            {/* <Text style={styles.logoutText}>Logout</Text> */}
            <Image
              source={require('../../assets/logout.png')}
              style={{
                width: 38,
                height: 38,
                right:15
              }}
            />
          </TouchableOpacity>
        </View>
        {/* </View> */}
        <Text style={styles.userName}>{name}</Text>
        {/* {notes.length ? (
        <SearchBar/>
        ) : null} */}
           <TouchableHighlight
            onPress={()=>navigation.navigate('startQR')}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              Open QR Scanner
            </Text>
          </TouchableHighlight>
        <FlatList 
        data={notes} 
        numColumns={2}
        columnWrapperStyle={{justifyContent:'space-between'}}
        keyExtractor={item =>  item.id.toString()}
        renderItem={({ item }) => (
          <Note onPress={() => openNote(item)} item={item}/>
        )}/>

        {!notes.length ?(
        <View style={styles.emptyHeaderContainer}>
        <Text style={styles.emptyHeader}>Add Notes</Text>
        
         </View>
        ) : null}
         </TouchableOpacity>
         
         <TouchableOpacity onPress={()=> setModalVisible(true)}>
        <Image
              source={require('../../assets/addIcon.png')}
              style={{
                width: 40,
                height: 40,
                // position: 'absolute',
                marginTop:50,
                left:150
              }}
            />
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
  marginBottom: 20,
},

text:{
  color:'#ff2746',
  marginLeft: 25,
  fontSize:25,
  fontWeight:'900'
},
userName:{
  color:'#ff2746',
  marginLeft: 25,
  fontSize:20,
  fontWeight:'bold',
  marginTop:-30
},
buttonStyle: {
  flex: 1,
  // fontSize: 16,
  color: 'white',
  backgroundColor: '#ff2746',
  padding: 5,
  // minWidth: 250,
  height:40,
  width:150,
  marginLeft:25,
  marginTop:10,
  borderRadius:50
},
buttonTextStyle: {
  padding: 5,
  color: 'white',
  textAlign: 'center',
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
    marginTop:150,
    fontSize:30,
    textTransform:'uppercase'
  },
});