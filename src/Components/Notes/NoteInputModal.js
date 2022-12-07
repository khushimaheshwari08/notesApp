import React, { useEffect, useState } from 'react'
import { Modal, Text, View ,StatusBar, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Image} from 'react-native'

const NoteInputModal = ({visible,onClose,onSubmit,note,isEdit}) => {
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

    if(isEdit) {
      onSubmit(title, desc, Date.now());
    } else{
    onSubmit(title,desc);
    setTitle('');
    setDesc('');
  }
    onClose();
  }

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setDesc('');
    }
    onClose();
  };
  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  return (
    <>
    {/* <StatusBar hidden/> */}
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
               {title.trim() || desc.trim() ? (
          <Image
              source={require('../../assets/rightIcon.png')}
              style={{
                width: 40,
                height: 40,
                marginRight:90
              }}
              
            />
             ) : null}
            </TouchableOpacity>
            <TouchableOpacity  onPress={closeModal}>
             {/* {title.trim() || desc.trim() ? ( */}
            <Image
              source={require('../../assets/wrongIcon.png')}
              style={{
                width: 37,
                height: 37,
              }}
            
            />
            {/* ) : null} */}
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
      flex:1,
      paddingHorizontal: 20,
      paddingTop: 15,
      backgroundColor:'#ff9999'
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
  
