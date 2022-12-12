import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';

import {CameraScreen} from 'react-native-camera-kit';

const StartQRScanner = () => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);

  const onOpenlink = () => {
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = qrvalue => {
    setQrvalue(qrvalue);
    setOpneScanner(false);
  };

  const onOpneScanner = () => {
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setQrvalue('');
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }

      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <CameraScreen
          showFrame={true}
          scanBarcode={true}
          laserColor={'blue'}
          frameColor={'yellow'}
          colorForScannerFrame={'black'}
          onReadCode={event => onBarcodeScan(event.nativeEvent.codeStringValue)}
        />
      </View>

      <View style={styles.container}>
        {qrvalue ? (
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 10,
            }}>
            <Text style={styles.textStyle}>{'Scanned Result: ' + qrvalue}</Text>
          </View>
        ) : (
          ''
        )}
        {qrvalue.includes('https://') ||
        qrvalue.includes('http://') ||
        qrvalue.includes('geo:') ? (
          <TouchableHighlight onPress={onOpenlink}>
            <Text style={styles.textLinkStyle}>
              {qrvalue.includes('geo:') ? 'Open in Map' : 'Open Link'}
            </Text>
          </TouchableHighlight>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default StartQRScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'red',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
});
