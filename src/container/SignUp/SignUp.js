import React, { useState, useEffect, createRef, useRef } from 'react';
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
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
  Dimensions
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { IconAsset, Strings, UiColor } from '../../theme';
import { h, w } from '../../utils/Dimensions';
import styles from './styles';
import { connect } from 'react-redux';
// import { LoginAPI } from './../../actions/Login';
import AsyncStorage from '@react-native-community/async-storage';
import { signUp } from '../../actions/SignUpAction';

let _captchaRef = createRef();

let checkedServerStatus = true;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const SignUp = ({ navigation }) => {
  // console.log(navigation)
  const [recaptcha, setRecaptcha] = useState('');
  const [dataValidated, setDataValidated] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const screenStatus = navigation.isFocused();
  const dispatch = useDispatch();
  const [Show, setShow] = useState(false);
  const [email, setEmail] = useState('check@fm.com');
  const [fName, setFName] = useState('jack');
  const [lName, setLName] = useState('reacher');
  const [dob, setDob] = useState('1981-03-01');
  const [password, setPassword] = useState('ROFLFjsjk@1237');
  const [captcha, setCaptcha] = useState('');
  const [showButton, setshowButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [filldata, setFillData] = useState(false);
  const userInfo = {};
  const white = require(`../../assets/icon/eye.png`);
  const black = require(`../../assets/icon/password-hide.png`);
  //social login elements
  const [user, setUser] = useState({})
  const [socialProvider, setSocialProvider] = useState(null);
  const [socialUserId, setSocialUserId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(async () => {
    // setFillData(false);
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

  const colorChange = async () => {
    setshowButton(!showButton);

  };
  const ShowRecaptcha = () => {

  }

  const ValidationFunction = (socialProvider) => {

    let pass = password;
    let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@@#\$%\^&\*])(?=.{8,})/;
    let text = email;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (fName == '' || fName == null) {
      Alert.alert("Please Enter First Name");
    } else if (lName == '' || lName == null) {
      Alert.alert("Please Enter Last Name");
    } else if (email == '' || email == null) {
      Alert.alert("Please Enter Email");
    } else if (reg.test(text) == false) {
      Alert.alert("Please Enter Valid Email");
    } else if (dob == '' || dob == null) {
      Alert.alert("Please Enter Date Of Birth");
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
      firstName: fName,
      lastName: lName,
      email: email,
      dateOfBirth: dob,
      password: password,
      recaptchaToken: recaptcha.recaptcha,
      clientId: 'Btb.App',
    }
    console.log('second token',)
    console.log(data)
    setDataSubmitted(true);
    dispatch(signUp(data, navigation));
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
      firstName: fName,
      lastName: lName,
      email: email,
      dateOfBirth: dob,
      recaptchaToken: recaptcha.recaptcha,
      clientId: 'Btb.App',
      socialProvider: socialProvider,
      socialUserId: socialUserId
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
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View
        style={styles.mainContainerBox}>
        <View style={{ flex: 0.6 }}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txt}>
            Sign Up BTB!
          </Text>
        </View>

        <View flex={1.43}>

          <TextInput
            style={styles.inputFieldContainer}
            placeholderTextColor="#383B3F"
            color="#4D4D4D"
            underlineColorAndroid="transparent"
            placeholder="Enter First Name"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            onChangeText={(fName) => setFName(fName)}
            value={fName}
          />

          <TextInput
            style={styles.inputFieldContainer}
            placeholderTextColor="#383B3F"
            color="#4D4D4D"
            underlineColorAndroid="transparent"
            placeholder="Enter Last Name"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            onChangeText={(lName) => setLName(lName)}
            value={lName}
          />

          <TextInput
            style={styles.inputFieldContainer}
            placeholderTextColor="#383B3F"
            color="#4D4D4D"
            underlineColorAndroid="transparent"
            placeholder="Enter Email"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            onChangeText={(email) => setEmail(email)}
            value={email}
          />


          <View style={{ height: 35, justifyContent: 'center', borderRadius: 25, borderWidth: 1, marginHorizontal: h(6.5), marginVertical: 5 }}>
            <DatePicker
              style={{ width: 300 }}
              date={dob}
              mode="date"
              placeholder="Enter Date Of Birth"
              format="YYYY-MM-DD"
              // minDate="2016-05-01"
              // maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  height: 20,
                  width: 20,
                  marginLeft: 200
                },
                dateInput: {
                  //backgroundColor:'red',

                  // borderRadius:25,
                  color: '#000',
                  borderWidth: 0,
                  marginLeft: h(2.5),
                  position: 'absolute',
                  left: 0,
                  top: 0,
                },
                placeholderText: {
                  fontSize: 14,
                  color: '#4D4D4D'
                },

                // ... You can check the source to find the other keys.
              }}
              onDateChange={(dob) => {
                setDob(dob);
              }}

            />
          </View>


          <View
            style={styles.passwordBox}>
            <TextInput
              style={styles.inputFieldContainer2}
              placeholderTextColor="#383B3F"
              color="#4D4D4D"
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

          {/* {displayReCaptcha()}       */}
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
          <TouchableOpacity
            onPress={() => ValidationFunction()}
            //onPress={doLogin} 
            style={styles.buttonContainer}>
            <Text style={styles.AndText}>SIGN UP</Text>
          </TouchableOpacity>

        </View>
        <View style={{ flex: 0.6 }}>
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

          <TouchableOpacity
            onPress={Actions.dispatch('Login')}>
            <Text
              style={styles.signUpView}>
              Login
            </Text>
          </TouchableOpacity>

        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >

          <View style={styles.centeredView}>

            <View style={styles.modalView}>

              <View flex={1.43}>
                <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txt}>
                  Fill Details to Complete Signup
                </Text>
                {!email ?
                  <TextInput
                    style={styles.inputFieldContainerSocial}
                    placeholderTextColor="#383B3F"
                    color="#4D4D4D"
                    underlineColorAndroid="transparent"
                    placeholder="Enter Email"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                  /> :
                  <View></View>
                }

                <View style={{ height: 35, justifyContent: 'center', borderRadius: 25, borderWidth: 1, marginVertical: 15 }}>
                  <DatePicker
                    style={{ width: 300 }}
                    date={dob}
                    mode="date"
                    placeholder="Enter Date Of Birth"
                    format="YYYY-MM-DD"
                    // minDate="2016-05-01"
                    // maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        height: 20,
                        width: 20,
                        marginLeft: 170
                      },
                      dateInput: {
                        //backgroundColor:'red',

                        // borderRadius:25,
                        color: '#000',
                        borderWidth: 0,
                        marginLeft: h(2.5),
                        position: 'absolute',
                        left: 0,
                        top: 0,
                      },
                      placeholderText: {
                        fontSize: 14,
                        color: '#4D4D4D'
                      },

                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(dob) => {
                      setDob(dob);
                    }}

                  />
                </View>
                <TouchableOpacity
                  onPress={() => ValidationFunction()}
                  //onPress={doLogin} 
                  style={styles.buttonContainer}>
                  <Text style={styles.AndText}>COMPLETE SIGN UP</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>

      </View>
    </TouchableWithoutFeedback>

  );
};
export default SignUp;