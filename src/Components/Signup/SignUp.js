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
    <View style={{flex: 1, backgroundColor: '#ff9999'}}>
    <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/note.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
              marginTop:100
            }}
          />
          <Text style={styles.welcome}>Join us to start save notes </Text>
        </View>
      
          <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter Name"
            placeholderTextColor="black"
            keyboardType="default"
            value={name}
            onChangeText={name => setName(name)}
          />
          </View>
          <View style={styles.SectionStyle}>
          <TextInput
                style={styles.inputStyle}
                placeholder="Enter Email"
                placeholderTextColor="black"
                keyboardType="email-address"
                value={email}
                onChangeText={email => setEmail(email)}
          />
          </View>
          <View style={styles.SectionStyle}>
            <TouchableOpacity
              onPress={() => setIsVisiblePassword(!isVisiblePassword)}
              style={{
                width: 40,
                height: 45,
                position: 'absolute',
                right: 28,
                top: 10,
                zIndex: 999,
              }}>
              {isVisiblePassword ? (
                <Image
                  source={require('../../assets/hide.png')}
                  style={{
                    width: 20,
                    height: 20,
                    left: 25,
                  }}
                />
              ) : (
                <Image
                  source={require('../../assets/show.png')}
                  style={{
                    width: 25,
                    height: 25,
                    left: 23,
                    top: - 2,
                  }}
                />
              )}
            </TouchableOpacity>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Password" 
                placeholderTextColor="black"
                secureTextEntry={isVisiblePassword}
                keyboardType="default"
                value={password}
                onChangeText={password => setPassword(password)}
              />
            </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => onLogin()}
            >
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
          <View>
           <TouchableOpacity onPress={() => navigation.navigate('login')}>
           <Text
              style={styles.registerTextStyle}>
             Have an account? Log in
            </Text>
              </TouchableOpacity>
          </View>
          </ScrollView>
    </View>
  );
  
};

export default SignUp;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#ff2746',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  welcome: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
   
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
});
