import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const SignUp = () => {

  const navigation = useNavigation();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);

  const onLogin = async () => {
    if (name !== '' && email !== '' && password !== '') {
      let temp={name: name,email:email,password:password};
      await AsyncStorage.setItem('userData', JSON.stringify(temp));
      navigation.navigate('login');
      } else {
        alert('Please enter name, username and password');
      }
  }


  return (
    <View style={styles.container}>
      <ScrollView>
      <View>
        <View style={styles.headerImg}>
          <Image
            source={require('../../assets/logo-light.png')}
            style={{width: 100, height: 30, marginTop: 30}}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.welcome}>Join us to start searching </Text>
        </View>
        <Text style={styles.course}>Discover your perfect university</Text>

        <View style={styles.btn}>
          <View elevation={12} style={styles.button}>
            <Image
              source={require('../../assets/googleIcon.png')}
              style={{width: 20, height: 25, marginTop: 2}}
            />
            <Text style={[styles.googlefb,styles.google]}>Google</Text>
          </View>
          <View elevation={12} style={styles.button}>
            <Image
              source={require('../../assets/fbbb.png')}
              style={{width: 22, height: 25, marginBottom: 2}}
            />
            <Text style={[styles.googlefb,styles.fb]}>Facebook</Text>
          </View>
        </View>

        <View style={styles.inputParent}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={name => setName(name)}
          />
        </View>
        <View style={styles.inputParent}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={styles.inputParent}>
        <TouchableOpacity
            onPress={() => setIsVisiblePassword(!isVisiblePassword)}
            style=
            {{
              width: 40,
              height: 45,
              position: 'absolute',
              right: 28,
              top: 12,
              zIndex: 999,
            }}>
            {isVisiblePassword ? (
              <Image
                source={require('../../assets/hideIcons.png')}
                style={{
                  width: 30,
                  height: 22,
                  left:5,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/images.png')}
                style={{
                  width: 25,
                  height: 25,
                  left:6
                }}
              />
            )}
          </TouchableOpacity>
          <TextInput
           secureTextEntry={isVisiblePassword}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="gray"
            value={password}
            onChangeText={password => setPassword(password)}
          />
        </View>
        <TouchableOpacity onPress={() => onLogin()}>
        <View style={[styles.signBtn, styles.inputParent]}>
          <Image
            source={require('../../assets/adminIcons.png')}
            style={{
              width: 20,
              height: 20,
              position: 'absolute',
              top: 15,
              left:100,
            }}
          />
          <Text style={[styles.signText,styles.joinUs]}>Join Us</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
      <View style={styles.join}>
        <Text style={styles.forgetPassword}>Have an account? Log in</Text>
      </View>
      </TouchableOpacity>
      </View>
     
      </ScrollView>
    </View>
  );
  
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
  },

  headerImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  welcome: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },

  course: {
    color: 'black',
    marginLeft: 11,
    marginRight: 10,
    marginTop: 10,
    textAlign: 'center',
  },

  btn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems:'center',
    marginTop: 35,
    marginBottom: 25,
  },

  button: {
    width: 155,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 15,
    // margin: 15,
    // gap: 5,
    borderWidth:2,
    borderRadius: 6,
    marginBottom: 5,
    borderColor:"#c9c7c7",
    backgroundColor:'white'
  },

  shadowProp: {
    elevation: 4,
    shadowColor: '#c9c7c7',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  googlefb: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  
  google:{
    marginLeft: 7,
  },

  fb:{
    marginLeft:1,
  },

  input: {
    marginLeft: 15,
    marginBottom: 20,
    marginRight: 15,
    height: 50,
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 6,
    paddingLeft: 10,
    color:'black'
  },

  signBtn: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    backgroundColor: 'lightgray',
    borderRadius: 6,
  },

  signText: {
    paddingTop: 10,
    textAlign: 'center',
    color: 'gray',
    fontSize: 20,
  },

  forgot: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  forgetPassword: {
    color: '#da1b3f',
  },

  join: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:100
  },

  joinUs: {
    marginTop:2
  },

  inputParent: {
    position: 'relative',
  },

});
