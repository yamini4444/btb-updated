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
    ImageBackground,
    BackHandler,
    ActivityIndicator,
    Dimensions,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { IconAsset, Strings, UiColor } from '../../theme';
import { h, w } from '../../utils/Dimensions';
import styles from './styles';
import { connect } from 'react-redux';
import { LoginAPI } from './../../actions/Login';
import OtpInputs from 'react-native-otp-inputs';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../../component/Drawer/Styles';
import { strings } from '../../constants/LocaleString'


let checkedServerStatus = true;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const OtpAuth = ({ navigation }) => {
    console.log('data from dob',navigation.state.params)
    const screenStatus = navigation.isFocused();
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState('');




    // Return Ui For Login Page
    return (
        // <TouchableWithoutFeedback
        //   onPress={() => {Keyboard.dismiss();}}>
        //   <View
        //     style={styles.mainContainerBox}>
        //     <View flex= {1}>
        //       <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txt}>
        //         Enter OTP!
        //       </Text>
        //     </View>

        //     <View flex={2}>

        //     <View style={{ flexDirection: 'row', paddingLeft: w(10), paddingRight: w(10) }}>
        //                     <OtpInputs
        //                         numberOfInputs={4}
        //                         handleChange={(otp) => setOtp(otp)}
        //                         inputStyles={styles.otpInput}
        //                     />
        //                 </View>

        //       <TouchableOpacity 
        //       onPress={Actions.Login} 
        //       style={styles.buttonContainer}>
        //         <Text style={styles.AndText}>CHANGE PASSWORD</Text>
        //       </TouchableOpacity>

        //     </View>

        //   </View>
        // </TouchableWithoutFeedback>
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
                    <View flex={1} >
                        <TouchableOpacity onPress={Actions.SignUp} >
                            <Image
                                style={styles.backIcon}
                                source={require('../../assets/image/backImage.png')} />
                        </TouchableOpacity>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txtDob}>
                            {strings.otp.titleHead1}
                        </Text>
                        <Text style={styles.txt1Dob}>
                            {strings.otp.titleHead2}
                        </Text>
                        <View style={{ flexDirection: 'row', paddingLeft: w(10), paddingRight: w(10),marginBottom:h(4) }}>
                            <OtpInputs
                                numberOfInputs={4}
                                handleChange={(otp) => setOtp(otp)}
                                inputStyles={styles.otpInput}
                            />
                        </View>

                        {/* {!dataSubmitted ?
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
           } */}

                        <Text style={styles.txtResend}>
                            {strings.otp.phone}
                        </Text>
                        <Text style={styles.txtResend}>
                            {strings.otp.continue}
                        </Text>

                        <TouchableOpacity
                            onPress={Actions.OtpScreen}
                            style={styles.buttonContainer}>
                            <Text style={styles.AndText}>{strings.otp.done}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};
export default OtpAuth;
