import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'

const UserDetail = () => {

    const [userDetail, setUserDetail] = useState('')

    const getUserDetails = async() => {
        let retrivedItem = await AsyncStorage.getItem('userData');
        let item = JSON.parse(retrivedItem);
        setUserDetail(item)
    }
useEffect(() => {
    getUserDetails()
}, [])


  return (
    <View style={{flex: 1, backgroundColor: '#ff9999'}}>
        <Text style={styles.header}>Your Name</Text>
        <Text style={styles.text}>{userDetail.name}</Text>
        <Text style={styles.header}>Your Country</Text>
        <Text style={styles.text}>{userDetail.country}</Text>
        <Text style={styles.header}>Your City</Text>
        <Text style={styles.text}>{userDetail.city}</Text>
        <Text style={styles.header}>Your Phone no</Text>
        <Text style={styles.text}>{userDetail.phoneNo}</Text>
        <Text style={styles.header}>Your DOB</Text>
        <Text style={styles.text}>{moment(userDetail.date).format('DD/MM/YY')}</Text>
    </View>
  )
  {/* moment(testDate).format(); */}
}

export default UserDetail;

const styles = StyleSheet.create({
     text: {
        color: 'black',
        fontSize: 16,
        marginLeft:20
      },
      header:{
        color:'#ff2746',
        paddingTop:20,
        marginLeft:20,
        fontSize: 20,
      }
})