import React, { useState, useEffect, createRef } from 'react';
import { LoginButton, AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next';
import {
  View,
  Image,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  BackHandler,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
// import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { IconAsset, Strings, UiColor } from '../../theme';
import { h, w } from '../../utils/Dimensions';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const MainHome = ({ navigation }) => {
  console.log(navigation)
  const screenStatus = navigation.isFocused();
  const [userFullName, setUserFullName] = useState(null)

  useEffect(() => {
    readData()
  }, [])

  
  const readData = async () => {
    try {
      const userFullName = await AsyncStorage.getItem('fullName')
      console.log(userFullName)
      if (userFullName !== null) {
        setUserFullName(userFullName)
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
  

  // Return Ui For Home Page
  return (
    <TouchableWithoutFeedback
      onPress={() => { Keyboard.dismiss(); }}>
      <View
        style={styles.mainContainerBox}>
        <Text>Welcome,{userFullName}</Text>


      </View>
    </TouchableWithoutFeedback>
  );
};
export default MainHome;