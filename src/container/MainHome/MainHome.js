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


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const MainHome = ({ navigation }) => {
  console.log(navigation)
  const screenStatus = navigation.isFocused();

 


  // Return Ui For Home Page
  return (
    <TouchableWithoutFeedback
      onPress={() => { Keyboard.dismiss(); }}>
      <View
        style={styles.mainContainerBox}>
        <Text>Hello Home</Text>


      </View>
    </TouchableWithoutFeedback>
  );
};
export default MainHome;