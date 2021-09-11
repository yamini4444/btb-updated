

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

const ResetEmailScreen = ({ navigation }) => {
    const screenStatus = navigation.isFocused();
    const [email, setEmail] = useState('');

    // Return Ui For Login Page
    return (
        <TouchableWithoutFeedback
            onPress={() => { Keyboard.dismiss(); }}>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#fff' }}
                behavior={Platform.OS === 'ios' ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? -270 : -210}>
                <View
                    style={styles.mainContainerBox}>
                    <StatusBar backgroundColor="#fff"></StatusBar>
                    <View flex={1}>
                        <TouchableOpacity onPress={Actions.ForgetScreen} >
                        <Image
                                style={styles.backIcon}
                                source={require('../../assets/image/backImage.png')}
                            />
                        </TouchableOpacity>
                        <Image
                                style={styles.emailImage}
                                source={require('../../assets/image/confirmation_email.png')}
                            />
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.txt}>
                            Reset Password Email sent
                        </Text>
                        <Text style={styles.txt1}>
                        Check your email to reset password and
                            follow the instructions
                        </Text>
                        <TouchableOpacity
                             onPress={Actions.ResetPassword}
                            style={styles.buttonContainer}>
                            <Text style={styles.AndText}>Okay</Text>
                        </TouchableOpacity>
                    </View>                   
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};
export default ResetEmailScreen;