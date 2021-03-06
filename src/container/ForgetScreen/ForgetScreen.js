import React, { useState, useEffect, createRef } from 'react';
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
  KeyboardAvoidingView,
  StatusBar,
  ImageBackground,
  BackHandler,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { IconAsset, Strings, UiColor } from '../../theme';
import { h, w } from '../../utils/Dimensions';
import styles from './styles';
//import {Pages} from 'react-native-pages';
import { connect } from 'react-redux';
import { LoginAPI } from './../../actions/Login';
//import {forgetPasswordApi} from './../../actions/forgetPassword';
//import {SocialLoginApi} from './../../actions/SocialLogin';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../../component/Drawer/Styles';

let checkedServerStatus = true;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ForgetScreen = ({ navigation }) => {
  const screenStatus = navigation.isFocused();
  const [email, setEmail] = useState('');

  // Return Ui For Login Page
  return (
    <TouchableWithoutFeedback
      onPress={() => { Keyboard.dismiss(); }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -270 : -210}
      >

        <View
          style={styles.mainContainerBox}>
          <StatusBar backgroundColor="#fff"></StatusBar>
          <View flex={1.3}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txt}>
            Forgot Pass?
            </Text>
            <Text  style={styles.txt1}>
              Enter your email adress to reset your
              password instruction.
            </Text>
          </View>

          <View flex={2} >
            <Text style={styles.inputHead}>Email Address</Text>
            <TextInput
              style={styles.inputFieldContainer}
              placeholderTextColor="#383B3F"
              underlineColorAndroid="transparent"
              placeholder="Enter Email"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={(email) => setEmail(email)}
              value={email}
            />

            <TouchableOpacity
              onPress={Actions.ResetEmailScreen}
              style={styles.buttonContainer}>
              <Text style={styles.AndText}>Reset Password</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: h(5) }}>
              <Text style={{ fontSize: 12 }}>Remember Password?</Text>
              <TouchableOpacity onPress={Actions.Login}>
                <Text style={{ fontSize: 12, color: '#25B5A4', marginLeft: h(0.5) }}>Log In!</Text></TouchableOpacity>
            </View>

          </View>
          <View flex={1} >


          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default ForgetScreen;