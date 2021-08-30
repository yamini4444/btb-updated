import React, { useState, useEffect, createRef } from 'react';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk-next';
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
  SafeAreaView,
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
import AsyncStorage from '@react-native-community/async-storage';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Profile = ({ navigation }) => {
  console.log(navigation)
  const screenStatus = navigation.isFocused();
  const [userFullName, setUserFullName] = useState(null)

  useEffect(() => {
    readData()
  }, [])

  
  const readData = async () => {
    try {
      const userFullName = await AsyncStorage.getItem('fullName')
      console.log(userFullName)
      if (userFullName !== null) {
        setUserFullName(userFullName)
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
  

  // Return Ui For Home Page
  return (
    
    <SafeAreaView flex={1}>
    <View
      style={styles.mainContainer}>
      <View style={styles.Header}>
        <TouchableOpacity  onPress={() => Actions.drawerOpen()}>
        <Image
          source={require('../../assets/icon/icon-menu.png')}
          style={{ width: h(4), height: h(5), tintColor: '#000' }}
          resizeMode="contain"
        />
        </TouchableOpacity>
       
        <Text style={styles.HeaderTxt}>Profile</Text>
        <View>
        </View>
        {/* <Image source={userPhoto} /> */}
      </View>

      <View style={styles.body}>
        {/* <Text>Welcome,{userFullName}</Text> */}
        <Text>Welcome,{userFullName}</Text>
        {/* <View style={styles.searchView}>
          <TextInput
            style={{ fontWeight: 'bold', width: '80%' }}
            autoCapitalize="none"
            multiline={true}
            //onFocus={() => onFocusInput()}
            placeholder="Search"
          //onChangeText={(text) => searchFunc(text)}
          // value={search}
          />
          <TouchableOpacity>
            <Image
              source={require('../../assets/image/searchIcon.png')}
              style={styles.searchIcon}></Image>
          </TouchableOpacity>
        </View> */}
      </View>



    </View>
  </SafeAreaView>
  );
};
export default Profile;