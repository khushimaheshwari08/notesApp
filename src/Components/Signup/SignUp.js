import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-native-date-picker'

// import DateTimePicker from '@react-native-community/datetimepicker';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import axios from 'axios';

const SignUp = () => {

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  // const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  // const onLogin = async () => {
  //   {
  //     let temp={name: name,country:country,city:city,phoneNo:phoneNo,date:date,email:email,password:password};
  //     await AsyncStorage.setItem('userData', JSON.stringify(temp));
  //     navigation.navigate('login');
  //     } else {
  //       alert('Please enter details');
  //     }
  // }
  
//     const getApiData = async () => {
//     const data ={firstName: name,city:city,phone:phoneNo,birthDate:date,email:email,password:password}
//     await axios.post('http://localhost:3006/users',data).then((response) => {
//       console.log(response)
//     }).catch((error) => {
//       console.log(error);
//   })
// }
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])/
 
  const onLogin = async () => {
    if(name ===''){
      alert ('Please Enter Name' )
      return
    }
    if( name.length <= 2){
      alert ('Please Enter Full Name' )
      return
    }
    if(country ===''){
      alert ('Please Enter country')
      return
    } if(city ===''){
      alert ('Please Enter city')
      return
    }  if(phoneNo ===''){
      alert ('Please Enter phone no')
      return
    }   if(phoneNo.length !== 10){
      alert ('Please Enter valid phone no')
      return
    } if(date ===''){
      alert ('Please Enter date of birth')
      return
    }  if(email ===''){
      alert ('Please Enter email')
      return
    } if (reg.test(email) === false) {
      alert('Invalid Email');
      return
    }  if(password ===''){
      alert ('Please Enter password')
      return
    }  if (re.test(password) === false) {
      alert( 'Password must be at least one uppercase, one lowercase, one special character and one number');
      return
    } 
    let temp={name: name,country:country,city:city,phoneNo:phoneNo,date:date,email:email,password:password};
    await AsyncStorage.setItem('userData', JSON.stringify(temp));
    // getApiData()
    navigation.navigate('login');
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
            }}
          />
          <Text style={styles.welcome}>Join us to start save notes </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            placeholderTextColor="black"
            keyboardType="default"
            value={name}
            onChangeText={name => setName(name)}
          />
          </View>
        
          <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Country"
            placeholderTextColor="black"
            keyboardType="default"
            value={country}
            onChangeText={country => setCountry(country)}
          />
          </View>
          <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="City"
            placeholderTextColor="black"
            keyboardType="default"
            value={city}
            onChangeText={city => setCity(city)}
          />
          </View>
          <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Phone No."
            placeholderTextColor="black"
            keyboardType="numeric"
            value={phoneNo}
            onChangeText={phoneNo => setPhoneNo(phoneNo)}
          />
          </View>

      <View style={styles.SectionStyle} >
        
      <Text style={[styles.inputStyle,styles.dob]} onPress={() => setOpen(true)} value={date}  onChange={date => setDate(date)}>
        {date ? moment(date.toString()).format('DD/MM/YYYY') : "Date Of Birth"}
        <DatePicker
        modal
        open={open}
        date={date ? date : new Date()}
        mode="date"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      /> 
  
      </Text>
         
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
  dob:{
    paddingTop:10
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
