import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NumericInput from '../../Common/NumericInput/NumericInput';
import NormalSelect from '../../Common/NormalSelect/NormalSelect';
import SearchSelect from '../../Common/SearchSelect/SearchSelect';
import Checkbox from '../../Common/Checkbox/Checkbox';
import Loading from '../../Common/Loading/Loading';
import Switches from '../../Common/Switch/Switch';
import ImageSelect from '../../Common/ImageSelect/ImageSelect';
import DownloadImage from '../../Common/Download Image/DownloadImage';
import ShareSnap from '../../Common/ShareSnap/ShareSnap';
import Rangeslide from '../../Common/Rangleslide/Rangeslide';
import DateandTime from '../../Common/Date/Date'
import TimeLine from '../../Common/TimeLine/TimeLine';
import ModalComponent from '../../Common/Modal/ModalComponent';
import Timepick from '../../Common/Time/Time';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const Dashboard = () => {
  const navigation = useNavigation();
  const [no, setNo] = useState('');
  const [value, setValue] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const onLogout = async () => {
    await AsyncStorage.setItem('isLogin', JSON.stringify(false));
    navigation.replace('login');
    return true;
  };

  const onSlidingComplete = (low, high) => {
    console.log(low, high);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logoutBtn}>
          <TouchableOpacity onPress={() => onLogout()}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  logoutBtn: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    width: 80,
    backgroundColor: '#da1b3f',
    borderRadius: 6,
  },

  logoutText: {
    paddingTop: 15,
    textAlign: 'center',
    color: 'white',
  },
});
