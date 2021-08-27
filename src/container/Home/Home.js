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
  SafeAreaView,
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

const Home = ({ navigation }) => {
  console.log(navigation)
  const screenStatus = navigation.isFocused();
  const [userFullName, setUserFullName] = useState(null)
  const [userPhoto, setUserPhoto] = useState(null)

  useEffect(() => {
    readData()
  }, [])


  const readData = async () => {
    try {
      const userFullName = await AsyncStorage.getItem('fullName')
      const userPhotoURL = await AsyncStorage.getItem('photo')
      console.log(userPhotoURL);
      if (userFullName !== null)
        setUserFullName(userFullName)
      if (userPhotoURL !== null)
        setUserPhoto({'uri':userPhotoURL.replace('s96-c','s960-c')})
      console.log(userPhoto) 	
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
          <Image
            source={require('../../assets/icon/icon-menu.png')}
            style={{ width: h(4), height: h(5), tintColor: '#000' }}
            resizeMode="contain"
          />
          <Text style={styles.HeaderTxt}>Home</Text>
          <View style={{ backgroundColor: '#fff', borderRadius: 40 / 2, height: 40, width: 40, justifyContent: 'center' }}>
            <Image
              source={ userPhoto ? userPhoto: require('../../assets/icon/person.png')}
              style={{ width: h(3), height: h(5), tintColor: '#000', alignSelf: 'center' }}
              resizeMode="contain"
            />
          </View>
          <Image source={userPhoto} />
        </View>

        <View style={styles.body}>
          {/* <Text>Welcome,{userFullName}</Text> */}

          <View style={styles.searchView}>
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
          </View>

          <View>

          </View>

        </View>



      </View>
    </SafeAreaView>
  );
};
export default Home;