import React, { useState, useEffect, createRef, useRef } from 'react';
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3';
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
import { NavigationActions } from 'react-navigation';

// import ReactNativeRecaptchaV3 from 'react-native-google-recaptcha-v3';
// import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
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
  console.log(navigation)
  const [recaptcha, setRecaptcha] = useState('');
  const [dataValidated, setDataValidated] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const screenStatus = navigation.isFocused();
  const dispatch = useDispatch();
  const [Show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [showButton, setshowButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [filldata, setFillData] = useState(false);
  const userInfo = {};
  const white = require(`../../assets/icon/eye.png`);
  const black = require(`../../assets/icon/password-hide.png`);




  useEffect(async () => {
    setFillData(false);
    // if (dataValidated && !dataSubmitted) {
    //   await _captchaRef.refreshToken();
    //   console.log('token from use', recaptcha)
    //   postData();
    // }
  }, [recaptcha, dataValidated, dataSubmitted]);


  const colorChange = async () => {
    setshowButton(!showButton);

  };
  const ShowRecaptcha = () => {

  }

  const ValidationFunction = () => {
    // let data = {
    //   fname : fName,
    //   lName : lName,
    //   email : email,
    //   dob : dob,
    //   password : password,
    //   captcha : captcha,
    //   clientId :1,

    // }
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
    } else if (password == '' || password == null) {
      Alert.alert("Please Enter Password");
    } else if (regPass.test(pass) == false) {
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
    // dispatch(signUp(data,navigation));
  }

  // const displayReCaptcha = async () => {
  //   if (dataValidated) {
  //     return <ReCaptchaV3
  //       ref={(ref: RecaptchaV3) => _captchaRef = ref}
  //       action="signinregister"
  //       captchaDomain={'https://app.bookbtb.com'}
  //       siteKey={'6LeudroaAAAAAMqbusMXJqt9HMzUQBgABPcaktCf'}
  //       onReceiveToken={(token) => {
  //         console.log('from token', token)
  //         setRecaptcha({ recaptcha: token });
  //         return true;
  //       }} />;  
  //   }
  // }

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
          <ReCaptchaV3
            // ref={(ref: RecaptchaV3) => _captchaRef = ref}
            ref={_captchaRef}
            // action="signinregister"
            captchaDomain={'https://app.bookbtb.com'}
            siteKey={'6LeudroaAAAAAMqbusMXJqt9HMzUQBgABPcaktCf'}
            onReceiveToken={(token) => {
              console.log('from token', token)
              setRecaptcha({ recaptcha: token });
              return true;
            }} 
            />
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
              //onPress={fbLogin}
              style={styles.fbView}>
              <Image
                style={styles.innerTxt}
                source={require('../../assets/icon/Facebook-glass.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              //onPress={googleLogin}
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

      </View>
    </TouchableWithoutFeedback>



  );
};
export default SignUp;