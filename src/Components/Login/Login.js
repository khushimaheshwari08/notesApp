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
    }
  };

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
            <Text style={styles.welcome}>Welcome Back</Text>
          </View>
          <Text style={styles.course}>
            You can search course, apply course and find scholarship for abroad
            studies
          </Text>

          <View style={styles.btn}>
            <View elevation={12} style={styles.button}>
              <Image
                source={require('../../assets/googleIcon.png')}
                style={{width: 20, height: 25, marginTop: 2}}
              />
              <Text style={[styles.googlefb, styles.google]}>Google</Text>
            </View>
            <View elevation={12} style={styles.button}>
              <Image
                source={require('../../assets/fbbb.png')}
                style={{width: 22, height: 25, marginBottom: 2}}
              />
              <Text style={[styles.googlefb, styles.fb]}>Facebook</Text>
            </View>
          </View>

          <View style={styles.inputParent}>
            <Image
              source={require('../../assets/rightIcon.png')}
              style={{
                width: 20,
                height: 20,
                position: 'absolute',
                right: 40,
                top: 15,
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor="gray"
              // autoFocus={true}
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View style={styles.inputParent}>
            <TouchableOpacity
              onPress={() => setIsVisiblePassword(!isVisiblePassword)}
              style={{
                width: 40,
                height: 45,
                position: 'absolute',
                right: 28,
                top: 14,
                zIndex: 999,
              }}>
              {isVisiblePassword ? (
                <Image
                  source={require('../../assets/hideIcons.png')}
                  style={{
                    width: 30,
                    height: 22,
                    left: 5,
                  }}
                />
              ) : (
                <Image
                  source={require('../../assets/images.png')}
                  style={{
                    width: 25,
                    height: 25,
                    left: 6,
                  }}
                />
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              // secureTextEntry={true}
              secureTextEntry={isVisiblePassword}
              placeholder="Enter your Password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={password => setPassword(password)}
            />
          </View>
          <TouchableOpacity
            disabled={email && password ? false : true}
            onPress={() => onNotes()}>
            <View style={styles.logBtn}>
              <Text style={styles.loginText}>
                {loading === true ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  'Login'
                )}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.forgot}>
            <Text style={styles.forgetPassword}>Forgot Password?</Text>
          </View>
          <TouchableOpacity 
          onPress={() => navigation.navigate('signUp')}
          >
            <View style={styles.join}>
              <Text style={styles.forgetPassword}>
                Don't have an account join us?
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

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
    fontSize: 30,
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
    borderWidth: 2,
    borderRadius: 6,
    marginBottom: 5,
    borderColor: '#c9c7c7',
    backgroundColor: 'white',
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
    marginLeft: 7,
  },

  google: {
    marginLeft: 7,
  },

  fb: {
    marginLeft: 1,
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
    color: 'black',
  },

  logBtn: {
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    backgroundColor: '#da1b3f',
    borderRadius: 6,
  },

  loginText: {
    paddingTop: 15,
    textAlign: 'center',
    color: 'white',
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
    marginTop: 115,
  },

  inputParent: {
    position: 'relative',
  },
});
