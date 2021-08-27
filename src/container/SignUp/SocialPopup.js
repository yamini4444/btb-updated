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


    return (
        <View style={styles.centeredView}>

         <Text>Hwllo</Text>
        </View>
    );
};

export default SocialPopup;