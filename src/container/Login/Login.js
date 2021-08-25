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
import { connect } from 'react-redux';
import { LoginAPI } from './../../actions/Login';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../../component/Drawer/Styles';
const DeviceInfo = require('react-native-device-info');
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3';

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
  const [Show, setShow] = useState(false);
  const [shareVisible, shareSetVisible] = useState(false);
  const [email, setEmail] = useState('jaimahakal@gmail.com');
  const [password, setPassword] = useState('ROFLFjsjk@1237');
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



  const colorChange = async () => {
    setshowButton(!showButton);
  };
  console.log(socialProvider, 'socialProvider')
  //setting unique id 
  // DeviceInfo.getDeviceName().then((deviceName) => {
  //   setDeviceName(deviceName);
  //   console.log(deviceName)
  // });
  useEffect(async () => {
    console.log(DeviceInfo)
    console.log(dataValidated, 'dataValidated')
    console.log(dataSubmitted, 'dataSubmitted')

    // setFillData(false);
    console.log(dataValidated, 'dataValidated')
    console.log(dataSubmitted, 'dataSubmitted')
    console.log(socialProvider, 'socialProvider')
    if (dataValidated && !dataSubmitted && socialProvider == null) {
      await _captchaRef.refreshToken();
      console.log('token from use', recaptcha)
      postData();
    }

    if (dataValidated && !dataSubmitted && socialProvider != null) {
      console.log("i am here")
      await _captchaRef.refreshToken();
      console.log(recaptcha)
      console.log('token from use', recaptcha)
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
    } else if (socialProvider == null && (regPass.test(pass) == false)) {
      Alert.alert("Please Enter Valid Password");
    }
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
      rememberMe: true
    }
    console.log('second token',)
    console.log(data)
    setDataSubmitted(true);
    dispatch(LoginAPI(data, navigation));
  }

  //Social Login 

  useEffect(() => {
    GoogleSignin.configure({
      //ClientId: "574073884202-1c2cherr7mvgq23mep4hh72tpq1q3ll8.apps.googleusercontent.com",
      //ClientSecret: "BXKFKvpnU-l7tlROrxeggjJy",
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
        if (userInfo.familyName)
          setFName(userInfo.familyName)
        if (userInfo.givenName)
          setLName(userInfo.givenName)
        if (userInfo.id)
          setSocialUserId(userInfo.id)
        if (userInfo.email)
          setEmail(userInfo.email)
        setModalVisible(true);
        ValidationFunction(socialProvider);
      }
    } catch (error) {
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
        if (userInfo.familyName)
          setFName(userInfo.familyName)
        if (userInfo.givenName)
          setLName(userInfo.givenName)
        if (userInfo.id)
          setSocialUserId(userInfo.id)
        if (userInfo.email)
          setEmail(userInfo.email)
        setModalVisible(true);
      }
    } catch (error) {
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


  useEffect(() => {
    setFillData(false);
  }, [socialProvider, modalVisible]);

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
        console.log("Login fail with error: " + error);
      }
    );
  }

  const postSocialData = async () => {
    let data = {
      email: email,
      recaptchaToken: recaptcha.recaptcha,
      clientId: 'Btb.App',
      socialProvider: socialProvider,
      socialUserId: socialUserId,
      deviceId: deviceUniqueId
    }
    await _captchaRef.refreshToken();
    console.log('second token',)
    console.log(data)
    setDataSubmitted(true);
    //signinSocialAction
    // dispatch(signUp(data, navigation));
  }

  //end social login

  // Return Ui For Login Page
  return (
    <TouchableWithoutFeedback
      onPress={() => { Keyboard.dismiss(); }}>
      <View
        style={styles.mainContainerBox}>
        <View flex={0.9}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txt}>
            Welcome to BTB!
          </Text>
        </View>

        <View flex={1.43}>
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

          <View
            style={styles.passwordBox}>
            <TextInput
              style={styles.inputFieldContainer2}
              placeholderTextColor="#383B3F"
              underlineColorAndroid="transparent"
              placeholder="Enter password"
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
            <TouchableOpacity onPress={() => colorChange()}>
              <ImageBackground
                source={require('../../assets/image/Outline_Button.png')}
                style={styles.showRemember}>
                {showButton ? (
                  <Image
                    source={require('../../assets/icon/login4eve.png')}
                    style={styles.notShowRemember}
                  />
                ) : null}
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => colorChange()}>
              <Text
                style={styles.rememberTxt}>
                Remember me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={Actions.ForgetScreen}>
              <Text style={styles.forgotButton}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            {!dataSubmitted ?
              <ReCaptchaV3
                ref={(ref: RecaptchaV3) => _captchaRef = ref}
                action="signinregister"
                captchaDomain={'https://app.bookbtb.com'}
                siteKey={'6LeudroaAAAAAMqbusMXJqt9HMzUQBgABPcaktCf'}
                onReceiveToken={(token) => {
                  console.log('from token', token)
                  setRecaptcha({ recaptcha: token });
                  return true;
                }}
              />
              : <View></View>
            }
          </View>

          <TouchableOpacity
            onPress={() => ValidationFunction()}
            style={styles.buttonContainer}>
            <Text style={styles.AndText}>LOGIN</Text>
          </TouchableOpacity>

          {/* <ConfirmGoogleCaptcha
          // eslint-disable-next-line no-undef
          ref={(_ref: {show: () => void} | null) => (captchaForm = _ref)}
          // siteKey={'6LfH7nIaAAAAAEgbcYkQz0wbmUFHs2R79lRj0EsC'}
          siteKey={'6LeDXPEaAAAAAOEOSDo-4lkVHU3TV5e3tf-5AhCe'}
          baseUrl={'http://3.140.234.233/pitch/apiV1'}
          languageCode="en"
          onMessage={onMessage}
        />
          */}
        </View>
        <View flex={1.5}>
          <View
            style={styles.socialLogin}>
            <TouchableOpacity
              onPress={fbLogin}
              style={styles.fbView}>
              <Image
                style={styles.innerTxt}
                source={require('../../assets/icon/Facebook-glass.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={gLogin}
              style={styles.gmailView}>
              <Image
                style={styles.innerTxt}
                source={require('../../assets/icon/google-glass-logo.png')}
              />
            </TouchableOpacity>
          </View>
          {/* <View
            style={styles.socialLogin}>
            <TouchableOpacity
              onPress={fbLogin}
            //style={styles.fbView}
            >
              <LoginButton

                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      console.log("login has error: " + result.error);
                    } else if (result.isCancelled) {
                      console.log("login is cancelled.");
                    } else {
                      console.log(result)
                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          console.log(data);
                          console.log('access token');
                          console.log(data.accessToken.toString())
                          currentProfile();
                        }
                      )
                    }
                  }
                }
                onLogoutFinished={() => console.log("logout.")} />
            </TouchableOpacity>

            {!user.idToken ?
              <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
              /> :
              <TouchableOpacity onPress={signOut}>
                <Text>Logout</Text>
              </TouchableOpacity>
            }
          </View> */}

          <TouchableOpacity onPress={Actions.SignUp}>
            <Text style={styles.signUpView}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* {loginLoading || socialLoading ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 5,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}>
            <View>
              <ActivityIndicator size="large" color="#000" />
            </View>
          </View>
        ) : null} */}


      </View>
    </TouchableWithoutFeedback>
  );
};
export default Login;