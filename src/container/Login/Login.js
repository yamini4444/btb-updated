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

let captchaForm = createRef();

let checkedServerStatus = true;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Login = ({ navigation }) => {
  console.log(navigation)
  const screenStatus = navigation.isFocused();

  const [user, setUser] = useState({})
  const [Show, setShow] = useState(false);
  const [shareVisible, shareSetVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo) 
      setUser(userInfo)
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
      setUser(userInfo);
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
  }, []);

  const fbLogin = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
          currentProfile();
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );

  }



  const currentProfile = Profile.getCurrentProfile().then(
    function (currentProfile) {
      if (currentProfile) {
        console.log("The current logged user is: " +
          currentProfile.name
          + ". His profile id is: " +
          currentProfile.userID
        );
      }
    }
  );


  const colorChange = async () => {
    setshowButton(!showButton);

  };

  const onMessage = event => {
    console.log('event', event);
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        captchaForm.hide();
        return;
      } else {
        console.log('Verified code from Google', event.nativeEvent.data);
        setTimeout(() => {
          captchaForm.hide();
          setFillData(true);
          // do what ever you want here
        }, 1500);
      }
    }
  };

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
          </View>
          <TouchableOpacity
            onPress={() => captchaForm.show()}
            //onPress={doLogin} 
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


          </View>

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