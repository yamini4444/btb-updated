import React, { useState, useEffect, createRef, useRef } from 'react';
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3';
import Recaptcha from 'react-native-recaptcha-that-works';

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
    Pressable
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { h, w } from '../../utils/Dimensions';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';

let _captchaRef = createRef();

const SocialPopup = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [recaptcha, setRecaptcha] = useState('');
    const [dataValidated, setDataValidated] = useState(false);
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const screenStatus = navigation.isFocused();
    const dispatch = useDispatch();
    const [Show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [filldata, setFillData] = useState(false);
    const userInfo = {};


    useEffect(async () => {
        // setFillData(false);
        if (dataValidated && !dataSubmitted) {
            await _captchaRef.refreshToken();
            console.log('token from use', recaptcha)
            postData();
        }
    }, [recaptcha, dataValidated, dataSubmitted]);

    const ValidationFunction = () => {

        let regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@@#\$%\^&\*])(?=.{8,})/;
        let text = email;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email == '' || email == null) {
            Alert.alert("Please Enter Email");
        } else if (reg.test(text) == false) {
            Alert.alert("Please Enter Valid Email");
        } else if (dob == '' || dob == null) {
            Alert.alert("Please Enter Date Of Birth");
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
            dateOfBirth: dob,
            recaptchaToken: recaptcha.recaptcha,
            clientId: 'Btb.App',
        }
        setDataSubmitted(true);
        dispatch(signUp(data, navigation));
    }
    return (
        <View style={styles.centeredView}>

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
                        <View style={{ flex: 0.6 }}>
                            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txt}>
                                Fill Details to Complete Signup
                            </Text>
                        </View>
                        <View flex={1.43}>


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
                                <Text style={styles.AndText}>COMPLETE SIGN UP</Text>
                            </TouchableOpacity>

                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default SocialPopup;