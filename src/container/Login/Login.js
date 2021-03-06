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
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
// import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { IconAsset, Strings, UiColor } from '../../theme';
import { h, w } from '../../utils/Dimensions';
import styles from './styles';
import { connect } from 'react-redux';
import { loginDisptach, loginSocialDisptach } from '../../actions/LoginAction';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../../component/Drawer/Styles';
const DeviceInfo = require('react-native-device-info');
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3';
import { strings } from '../../constants/LocaleString'

let _captchaRef = createRef();
let checkedServerStatus = true;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Login = ({ navigation }) => {
  const [recaptcha, setRecaptcha] = useState('');
  const [dataValidated, setDataValidated] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [deviceUniqueId, setDeviceUniqueId] = useState(null);
  const [deviceName, setDeviceName] = useState(null);
  const screenStatus = navigation.isFocused();
  const dispatch = useDispatch();
  const [Show, setShow] = useState(false);
  const [shareVisible, shareSetVisible] = useState(false);
  const [email, setEmail] = useState('dev_host_lb@yopmail.com');
  const [password, setPassword] = useState('Asf-2020');
  const [hidePassword, sethidePassword] = useState(true);
  const [uiRender, setuiRender] = useState(false);
  const [showButton, setshowButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailError, issetEmailError] = useState('');
  const [isEmailExistError, setEmailExistError] = useState('');
  const [isPasswordError, isSetPasswordError] = useState('');
  const [errors, seterrors] = useState('');
  const [toggle, settoggle] = useState(false);
  const [filldata, setFillData] = useState(false);
  const [visibleServerModal, setVisibleServerModal] = useState(false);
  const userInfo = {};
  const white = require(`../../assets/icon/eye.png`);
  const black = require(`../../assets/icon/password-hide.png`);
  //social login elements
  const [user, setUser] = useState({})
  const [socialProvider, setSocialProvider] = useState(null);
  const [socialUserId, setSocialUserId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);



  const colorChange = () => {
    setshowButton(!showButton);
  };

  const callToAction = async (type) => {
    await setDataSubmitted(true);
    console.log('jai ho ')
    navigation.navigate(type)
  }

  useEffect(async () => {
    setDeviceUniqueId(DeviceInfo.getUniqueId());
    DeviceInfo.getDeviceName().then((deviceName) => {
      setDeviceName(deviceName);
    });
    console.log(dataValidated, 'dataValidated')
    console.log(dataSubmitted, 'dataSubmitted')

    // setFillData(false);
    console.log(dataValidated, 'dataValidated')
    console.log(dataSubmitted, 'dataSubmitted')
    console.log(socialProvider, 'socialProvider')
    if (dataValidated && !dataSubmitted && socialProvider == null) {
      await _captchaRef.refreshToken();
      console.log('token from post data', recaptcha)
      postData();
    }

    if (dataValidated && !dataSubmitted && socialProvider != null) {
      await _captchaRef.refreshToken();
      console.log(recaptcha)
      console.log('token from social', recaptcha)
      postSocialData();
    }
  }, [recaptcha, dataValidated, dataSubmitted]);

  const ValidationFunction = (socialProvider) => {
    let pass = password;
    let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@@#\$%\^&\*])(?=.{8,})/;
    let text = email;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setDataValidated(false)
    if (email == '' || email == null) {
      Alert.alert("Please Enter Email");
    } else if (reg.test(text) == false) {
      Alert.alert("Please Enter Valid Email");
    } else if (socialProvider == null && (password == '' || password == null)) {
      Alert.alert("Please Enter Password");
    }
    // else if (socialProvider == null && (regPass.test(pass) == false)) {
    //   Alert.alert("Please Enter Valid Password");
    // }
    else {
      setDataValidated(true);
      console.log('reacpt', recaptcha.recaptcha)
      // postData();
    }
  }

  const postData = async () => {
    let data = {
      email: email,
      password: password,
      recaptchaToken: recaptcha.recaptcha,
      clientId: 'Btb.App',
      deviceId: deviceUniqueId,
      deviceName: deviceName,
      rememberMe: true,
      provider: "string",
      providerKey: "string",
    }
    console.log('data from post data', data)
    setDataSubmitted(true);
    console.log("hello dispatch")
    dispatch(loginDisptach(data, navigation));
  }

  //Social Login 

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '480648947620-osbrk9l023l7umq63ovdoqmmkc6mtpl3.apps.googleusercontent.com',
      androidClientId: '480648947620-gjmacpsonl1uvvbq8o38r0lkbl5d6scq.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      //iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      scopes: ['profile', 'email']

    });
    isSignedIn()
  }, [])
  const gLogin = async () => {
    try {
      setSocialProvider("Google")
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userinfo', userInfo.user)
      setUser(userInfo.user)
      if (userInfo) {
        if (userInfo.user.id)
          setSocialUserId(userInfo.user.id)
        if (userInfo.user.email)
          setEmail(userInfo.user.email)
        if (userInfo.user.photo)
          AsyncStorage.setItem("photo", userInfo.user.photo)
        setModalVisible(true);
        setDataValidated(false)
        ValidationFunction(socialProvider);
      }
    } catch (error) {
      setDataSubmitted(false);
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo()
    } else {
      console.log('Please Login')
    }
  };
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo.user);
      console.log('userinfo', userInfo.user)
      if (userInfo) {
        if (userInfo.id)
          setSocialUserId(userInfo.id)
        if (userInfo.email)
          setEmail(userInfo.email)
        if (userInfo.photo)
          AsyncStorage.setItem("photo", userInfo.photo)
        setModalVisible(true);
      }
    } catch (error) {
      setDataSubmitted(false)
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  // signOut()

  const currentProfile = async () => {
    await Profile.getCurrentProfile().then(
      function (currentProfile) {
        console.log('crt', currentProfile)
        if (currentProfile) {
          if (currentProfile.firstName)
            setFName(currentProfile.firstName)
          if (currentProfile.lastName)
            setLName(currentProfile.lastName)
          if (currentProfile.userID)
            setSocialUserId(currentProfile.userID)
          setModalVisible(true);
          ValidationFunction(socialProvider);
        }
      }
    );
  }

  const fbLogin = async () => {
    setSocialProvider('facebook');
    await LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          setDataSubmitted(false)
          console.log("Login cancelled");
        } else {
          console.log(result, 'result')
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
          console.log(Profile)
          currentProfile();
        }
      },
      function (error) {
        setDataSubmitted(false)
        console.log("Login fail with error: " + error);
      }
    );
  }

  const postSocialData = async () => {
    let data = {
      email: email,
      recaptchaToken: recaptcha.recaptcha,
      clientId: 'Btb.App',
      provider: socialProvider,
      providerKey: socialUserId,
      deviceId: deviceUniqueId,
      deviceName: deviceName,
      rememberMe: true,
    }
    await _captchaRef.refreshToken();
    console.log('second token',)
    console.log(data)
    setDataSubmitted(true);
    //signinSocialAction
    dispatch(loginSocialDisptach(data, navigation));
  }

  //end social login

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
            {strings.login.titleHead1}
          </Text>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txt1}>
            {strings.login.titleHead2}
          </Text>
        </View>

        <View flex={4} >
          <Text style={styles.inputHead}>{strings.login.email}</Text>
          <TextInput
            style={styles.inputFieldContainer}
            placeholderTextColor="#383B3F"
            underlineColorAndroid="transparent"
            placeholder={strings.login.emailPlaceholder}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            onChangeText={(email) => setEmail(email)}
            value={email}
          />

          <Text style={styles.inputHead}>{strings.login.password}</Text>
          <View
            style={styles.passwordBox}>
            <TextInput
              style={styles.inputFieldContainer2}
              placeholderTextColor="#383B3F"
              underlineColorAndroid="transparent"
              placeholder={strings.login.passwordPlaceholder}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              secureTextEntry={!showPassword}
              onChangeText={(password) => setPassword(password)}
              value={password}
            />

            <TouchableOpacity
              style={styles.touchPassword}
              // onPress={PasswordVisibility}
              onPress={() => setShowPassword(!showPassword)}>
              {!showPassword ? (
                <Image
                  source={require('../../assets/icon/password-hide.png')}
                  style={styles.EyeImage}
                />
              ) : (
                <Image
                  source={require('../../assets/icon/eye.png')}
                  style={styles.EyeImage}
                />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={styles.rememberView}>
            <TouchableOpacity
             
             onPress={() => colorChange()}>
              {/* <ImageBackground
                source={require('../../assets/icon/unchecked.png')}
                style={styles.showRemember}> */}
                {showButton ? 
                  <Image
                    source={require('../../assets/icon/checked.png')}
                    style={styles.notShowRemember}
                  />
                 : 
                <View style={{ borderWidth: 1, height: 12, width: 12, marginTop: 2, borderColor: '#25B5A4', }} >
                  </View>}
              {/* </ImageBackground> */}

            </TouchableOpacity>

            <TouchableOpacity onPress={() => colorChange()}>
              <Text
                style={styles.rememberTxt}>
                {strings.login.rememberMe}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => callToAction('ForgetScreen')}>
              <Text style={styles.forgotButton}>
                {strings.login.forgotPassword}
              </Text>
            </TouchableOpacity>
            {!dataSubmitted ?
              <ReCaptchaV3
                ref={(ref: RecaptchaV3) => _captchaRef = ref}
                action="applogin"
                captchaDomain={'https://app.bookbtb.com'}
                siteKey={'6LeudroaAAAAAMqbusMXJqt9HMzUQBgABPcaktCf'}
                onReceiveToken={(token) => {
                  console.log('from token', token)
                  setRecaptcha({ recaptcha: token });
                  return true;
                }}
              />
              : <View>{console.log('No captcha zone')}</View>
            }
          </View>

          <TouchableOpacity
            onPress={() => ValidationFunction()}
            style={styles.buttonContainer}>
            <Text style={styles.AndText}>{strings.login.login}</Text>
          </TouchableOpacity>

          <View style={{flexDirection:'row',alignSelf:'center',marginTop:h(10)}}>
            <Text style={{fontSize:12}}>{strings.login.dontHaveAccount}</Text>
            <TouchableOpacity onPress={() => callToAction('SignUp')}>
              <Text style={{fontSize:12,color:'#25B5A4',marginLeft:h(0.5)}}>{strings.login.signUp}</Text></TouchableOpacity>
          </View>

          <Text style={{fontSize:20,textAlign:'center',marginTop:h(12),color:'#BDBDBD'}}>{strings.login.or}</Text>
        </View>
        <View flex={1} >
          <Text style={{textAlign:'center',fontSize:12,marginBottom:h(2)}}>{strings.login.signInWith}:</Text>
          <View
            style={styles.socialLogin}>
           
            <TouchableOpacity
              onPress={() => gLogin()}
              style={styles.gmailView}>
              <Image
                style={styles.innerTxt}
                source={require('../../assets/image/google.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => fbLogin()}
              style={styles.fbView}
              >
              <Image
                style={styles.innerTxt}
                source={require('../../assets/image/facebook-logo.png')}
              />
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity onPress={() => callToAction('SignUp')}>
            <Text style={styles.signUpView}>
              Sign Up
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default Login;