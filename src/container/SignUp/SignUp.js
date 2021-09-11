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
    Dimensions,
    StatusBar,
    KeyboardAvoidingView
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
import { signUp, signUpSocial } from '../../actions/SignUpAction';
const DeviceInfo = require('react-native-device-info');
import { strings } from '../../constants/LocaleString'

let _captchaRef = createRef();

let checkedServerStatus = true;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const SignUp = ({ navigation }) => {
    // console.log(navigation)
    const [recaptcha, setRecaptcha] = useState('');
    const [dataValidated, setDataValidated] = useState(false);
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const [deviceUniqueId, setDeviceUniqueId] = useState(null);
    const [deviceName, setDeviceName] = useState(null);
    const screenStatus = navigation.isFocused();
    const dispatch = useDispatch();
    const [Show, setShow] = useState(false);
    const [email, setEmail] = useState('jaimahakal@gmail.com');
    const [fName, setFName] = useState('jack');
    const [lName, setLName] = useState('reacher');
    const [phone, setPhone] = useState("9939393939");
    const [dob, setDob] = useState('1990-09-09');
    const [password, setPassword] = useState('ROFLFjsjk@1237');
    const [captcha, setCaptcha] = useState('');
    const [showButton, setshowButton] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [filldata, setFillData] = useState(false);
    const userInfo = {};
    const white = require(`../../assets/icon/eye.png`);
    const black = require(`../../assets/icon/password-hide.png`);
    //social singup elements
    const [user, setUser] = useState({})
    const [socialProvider, setSocialProvider] = useState(null);
    const [socialUserId, setSocialUserId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(async () => {
        //setting unique id 
        setDeviceUniqueId(DeviceInfo.getUniqueId());
        setDeviceName(DeviceInfo.getDeviceName());
        DeviceInfo.getDeviceName().then((deviceName) => {
            setDeviceName(deviceName);
        });
        console.log('defv', deviceName)

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
    }, [recaptcha, dataValidated, dataSubmitted, socialProvider, deviceUniqueId]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);


    const colorChange = async () => {
        setshowButton(!showButton);

    };
    const ShowRecaptcha = () => {

    }

    const callToAction = async (type) => {
        await setDataSubmitted(true);
        console.log('jai ho ')
        navigation.navigate(type)
    }

    const handleBackButtonClick = async () => {
        await setDataSubmitted(true);
        navigation.goBack();
        return true;
    }


    const ValidationFunction = (socialProvider) => {

        let pass = password;
        let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@@#\$%\^&\*])(?=.{8,})/;
        let text = email;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setDataValidated(false);
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
        }
    }

    const postData = async () => {
        let data = {
            email: email,
            password: password,
            clientId: 'Btb.App',
            deviceId: deviceUniqueId,
            DeviceName: deviceName,
            Provider: "dummy",
            ProviderKey: "dummy"
        }
        console.log('second token',)
        console.log(data)
        setDataSubmitted(true);
        navigation.navigate('DobScreen',data);
       // dispatch(signUp(data, navigation));
    }

    //Social Signup 

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
            if (userInfo) {
                if (userInfo.user.familyName)
                    setLName(userInfo.user.familyName)
                if (userInfo.user.givenName)
                    setFName(userInfo.user.givenName)
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
            if (userInfo) {
                if (userInfo.familyName)
                    setFName(userInfo.familyName)
                if (userInfo.givenName)
                    setLName(userInfo.givenName)
                if (userInfo.id)
                    setSocialUserId(userInfo.id)
                if (userInfo.email)
                    setEmail(userInfo.email)
                if (userInfo.photo)
                    AsyncStorage.setItem("photo", userInfo.photo)
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
                    setDataValidated(false);
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
        console.log(socialUserId)
        let data = {
            firstName: fName,
            lastName: lName,
            surName: lName,
            givenName: fName,
            email: email,
            phone: phone,
            dateOfBirth: dob,
            optOut: true,
            recaptchaToken: recaptcha.recaptcha,
            clientId: 'Btb.App',
            provider: socialProvider,
            providerKey: socialUserId,
            deviceId: deviceUniqueId,
            deviceName: deviceName,

        }
        await _captchaRef.refreshToken();
        console.log('second token',)
        console.log(data)
        setDataSubmitted(true);
        //signinSocialAction
        dispatch(signUpSocial(data, navigation));
    }

    //end social signup
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
                            {strings.signUp.titleHead1}
                        </Text>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txt1}>
                            {strings.signUp.titleHead2}
                        </Text>
                    </View>

                    <View flex={4} >
                        <Text style={styles.inputHead}>{strings.login.email}</Text>
                        <TextInput
                            style={styles.inputFieldContainer}
                            placeholderTextColor="#A4A4A4"
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
                                placeholderTextColor="#A4A4A4"
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
                                    <View style={{ borderWidth: 1, height: 12, width: 12, marginTop: 2, borderColor: '#25B5A4' }} >
                                    </View>}
                                {/* </ImageBackground> */}

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => colorChange()}>
                                <Text
                                    style={styles.rememberTxt}>
                                    {strings.signUp.agreeTerms}
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
                            //    onPress={()=>{navigation.navigate('DobScreen')}}
                            style={styles.buttonContainer}>
                            <Text style={styles.AndText}>{strings.signUp.signUp}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, textAlign: 'center', marginTop: h(20), color: '#BDBDBD' }}>{strings.login.or}</Text>
                    </View>


                    <View flex={1.5} >
                        <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: h(2) }}>{strings.signUp.signInWith}:</Text>
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
                                style={styles.fbView}>
                                <Image
                                    style={styles.innerTxt}
                                    source={require('../../assets/image/facebook-logo.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: h(3) }}>
                            <Text style={{ fontSize: 12 }}>{strings.signUp.haveAccount}</Text>
                            <TouchableOpacity onPress={() => callToAction('Login')}>
                                <Text style={{ fontSize: 12, color: '#25B5A4', marginLeft: h(0.5) }}>{strings.signUp.LogIn}</Text></TouchableOpacity>
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
export default SignUp;