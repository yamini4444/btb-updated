import React, { useState, useEffect, createRef, useRef } from 'react';
import {
    View,
    Image,
    TextInput,
    Text,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    BackHandler,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { h, w } from '../../utils/Dimensions';
import styles from './styles';
import { strings } from '../../constants/LocaleString'
import DatePicker from 'react-native-datepicker';

let checkedServerStatus = true;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const DobScreen = ({ navigation }) => {
    // console.log(navigation)
    const [dataValidated, setDataValidated] = useState(false);
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const [fName, setFName] = useState('jack');
    const [lName, setLName] = useState('reacher');
    const [dob, setDob] = useState('1990-09-09');

    useEffect(async () => {
        console.log('datavlidated',dataValidated)
        if (dataValidated && !dataSubmitted) {
            await _captchaRef.refreshToken();
            postData();
        }
    }, [dataValidated, dataSubmitted]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const handleBackButtonClick = async () => {
        await setDataSubmitted(true);
        navigation.goBack();
        return true;
    }

    const ValidationFunction = () => {
        setDataValidated(false);
        if (fName == '' || fName == null) {
            Alert.alert("Please Enter First Name");
        } else if (lName == '' || lName == null) {
            Alert.alert("Please Enter Last Name");
        } else if (dob == '' || dob == null) {
            Alert.alert("Please Enter Date Of Birth");
        }
        else {
            setDataValidated(true);
        }
    }

    const postData = async () => {
        let data = {
            firstName: fName,
            lastName: lName,
            dateOfBirth: dob,
        }
        data = data.push(navigation.state.params)
        setDataSubmitted(true);
        navigation.navigate('PhoneNumberScreen',data)
    }

    // Return Ui For DOB
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
                    <View flex={1} >
                        <TouchableOpacity onPress={Actions.SignUp} >
                            <Image
                                style={styles.backIcon}
                                source={require('../../assets/image/backImage.png')} />
                        </TouchableOpacity>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txtDob}>
                            {strings.dobScreen.titleHead1}
                        </Text>
                        <Text style={styles.txt1Dob}>
                            {strings.dobScreen.titleHead2}
                        </Text>
                        <Text style={styles.inputHead}>{strings.dobScreen.firstName}</Text>
                        <TextInput
                            style={styles.inputFieldContainer}
                            placeholderTextColor="#383B3F"
                            underlineColorAndroid="transparent"
                            placeholder={strings.dobScreen.firstNamePlaceholder}
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            onChangeText={(fName) => setFName(fName)}
                            value={fName} />
                        <Text style={styles.inputHead}>{strings.dobScreen.lastName}</Text>
                        <TextInput
                            style={styles.inputFieldContainer}
                            placeholderTextColor="#383B3F"
                            underlineColorAndroid="transparent"
                            placeholder={strings.dobScreen.lastNamePlaceholder}
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            onChangeText={(lName) => setLName(lName)}
                            value={lName} />
                        <Text style={styles.inputHead}>{strings.dobScreen.birthday}</Text>
                        <View
                            style={styles.inputFieldContainer}>
                            <DatePicker
                                style={{ width: 300, fontSize: 10 }}
                                date={dob}
                                mode="date"
                                androidMode="spinner"
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
                                        color: '#000',
                                        borderWidth: 0,
                                        position: 'absolute',
                                        fontSize: 10,
                                        left: 0,
                                        top: 0,
                                    },
                                    placeholderText: {
                                        fontSize: 10,
                                        color: '#4D4D4D'
                                    },
                                    dateText: {
                                        fontSize: 10,
                                        fontWeight: 'bold'
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(dob) => {
                                    // setDob(dob + "T00:00:00s")
                                    setDob(dob)
                                }}

                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => ValidationFunction()}
                            style={styles.buttonContainer}>
                            <Text style={styles.AndText}>{strings.dobScreen.confirmBtn}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};
export default DobScreen;