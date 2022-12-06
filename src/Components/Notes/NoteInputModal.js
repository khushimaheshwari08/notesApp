import React, { useEffect, useState } from 'react'
import { Modal, Text, View ,StatusBar, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Image} from 'react-native'

const NoteInputModal = ({visible,onClose,onSubmit}) => {
 const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');


  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  
  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();
    onSubmit(title,desc);
    setTitle('');
    setDesc('');
  }

  const closeModal = () => {
    setTitle('');
    setDesc('');
    onClose();
  }


  return (
    <>
        <StatusBar hidden/>
    <Modal
     visible={visible} animationType='fade'>
        <View style={styles.container}>
        <TextInput
            value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
            placeholder='Title'
            placeholderTextColor="black"
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={desc}
            multiline
            placeholder='Note'
            placeholderTextColor="black"
            style={[styles.input, styles.desc]}
            onChangeText={text => handleOnChangeText(text, 'desc')}
          />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={handleSubmit}>
          <Image
              source={require('../../assets/rightIcon.png')}
              style={{
                width: 17,
                height: 17,
              }}
              
            />
            </TouchableOpacity>
            <TouchableOpacity  onPress={closeModal}>
             {title.trim() || desc.trim() ? (
            <Image
              source={require('../../assets/hide.png')}
              style={{
                width: 17,
                height: 20,
                marginLeft:15
              }}
            
            />
            ) : null}
            </TouchableOpacity>
            </View>
        <TouchableOpacity onPress={handleModalClose}>
              <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableOpacity>
     </Modal>
     </>
  )
}
export default NoteInputModal;

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingTop: 15,
      marginTop:20,
    },
    input: {
      borderBottomWidth: 2,
      borderBottomColor: '#dadae8',
      fontSize: 20,
      color: 'black'
    },
    title: {
      height: 50,
      marginBottom: 15,
      fontWeight: 'bold',
    },
    desc: {
      height: 100,
    },
    modalBG: {
      flex: 1,
      zIndex: -1,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 15,
    },
  })
  
