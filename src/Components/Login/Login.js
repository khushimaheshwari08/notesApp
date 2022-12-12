import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);

  const onNotes = async () => {
    let temp = await AsyncStorage.getItem('userData');
    setLoading(true);
    if (temp) {
      let item = JSON.parse(temp);
      if (email === item.email && password === item.password) {
        setTimeout(async () => {
          await AsyncStorage.setItem('isLogin', JSON.stringify(true));
          navigation.replace('notes');
        }, 2000);
      } else {
        alert('Incorrect username and password');
        setLoading(false);
      }
    } else {
      alert('Incorrect username and password');
      setLoading(false);
    }
  };

  
  return (
    <View style={styles.mainBody}>
      <ScrollView>
        <View>
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
                  <Text style={styles.welcome}>Welcome Back</Text>
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
              disabled={email && password ? false : true}
              onPress={() => onNotes()}
              >
              <Text style={styles.buttonTextStyle}> {loading === true ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  'LOGIN'
                )}</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('signUp')}>
              New Here ? Register
            </Text>
        
        </View>
        </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ff9999',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  welcome: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: 	'#ff2746',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
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
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});