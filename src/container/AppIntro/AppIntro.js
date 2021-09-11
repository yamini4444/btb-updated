import React, { useState, useEffect, createRef } from 'react';
import { LoginButton, AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next';
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';


import { h, w } from '../../utils/Dimensions';
import AppIntroSlider from 'react-native-app-intro-slider';
import ActionSheet from "react-native-actions-sheet";

const actionSheetRef = createRef();
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const AppIntro = ({ navigation }) => {

  const [dataValidated, setDataValidated] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [deviceUniqueId, setDeviceUniqueId] = useState(null);
  const [deviceName, setDeviceName] = useState(null);
  const screenStatus = navigation.isFocused();
  //const dispatch = useDispatch();

  const [uiRender, setuiRender] = useState(false);

  const white = require(`../../assets/icon/eye.png`);
  const black = require(`../../assets/icon/password-hide.png`);
  const slides = [
    {
      key: 1,
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      image: require('../../assets/image/intro_banner_1.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../../assets/image/Content.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: require('../../assets/image/intro_banner_1.png'),
      backgroundColor: '#22bcb5',
    }
  ];





  useEffect(() => {
    actionSheetRef.current?.show();
  })
  let actionSheet;

  const onDone = () => {
    // dispatch(isIntroScreensWatched());
    navigation.navigate('Login')
    actionSheetRef.current?.hide();
    // Actions.Login();
  };

  const onSkip = () => {
    // Actions.Login();
    // setShowRealApp(true);
    navigation.navigate('Login')
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={() => onDone()}>
        <Text style={styles.skipButtonTextStyle}>Get Started</Text>
      </TouchableOpacity>
    )
  }

  const renderNextButton = () => {
    return (
      <Text style={styles.skipButtonTextStyle}>NEXT</Text>
    )
  }

  const renderSkipButton = () => {
    return (
      <Text style={styles.skipButtonTextStyle}>SKIP</Text>
    )
  }

  const RenderItem = ({ item }) => {
    return (
      <View
        style={styles.renderItemViewStyle}>
        <View
          style={[styles.renderItemViewStyle, { backgroundColor: '#fff' }]}>
          <ImageBackground style={{height:'100%',flex:1}}>
            <Image source={item.image}
              resizeMode={'contain'} />
          </ImageBackground>
        </View>
        <TouchableOpacity
        style={{ width: 100, height: 1, borderWidth: 2, borderColor: '#000', alignSelf: 'center', position: 'absolute', bottom: 0, right: 0, left: h(20), }}
        onPress={() => {
          actionSheetRef.current?.setModalVisible();
        }}>
      </TouchableOpacity>
      </View>
    );
  };


  return (
    <View
      style={{
        justifyContent: "center",
        flex: 1,
        backgroundColor: '#fff'
      }}
    >
      {/* {slides.map((item, index) => (
       <View
            style={[styles.renderItemViewStyle,{backgroundColor:'#fff'}]}>
                  <View style={{marginTop:50}}>            
                      <Image source={require('../../assets/image/intro_banner_1.png')} 
                             resizeMode={'contain'}/>
                  </View>       
          </View>
      ))} */}
     

      <AppIntroSlider
          dotStyle={{ marginTop: 70, backgroundColor: '#A0A0A0' }}
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
          activeDotStyle={styles.activeDots}
          renderSkipButton={renderSkipButton}
          renderNextButton={renderNextButton}
          renderDoneButton={renderDoneButton}
        />

      <ActionSheet ref={actionSheetRef}
        //closable={false}
        containerStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25, backgroundColor: '#313131', alignSelf: 'center' }}>
        <View style={{ padding: h(4), justifyContent: 'center', marginBottom: h(6) }}>
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Ya hala</Text>
          <Text style={{ width: '80%', fontSize: 11, color: '#A0A0A0', textAlign: 'center', alignSelf: 'center', lineHeight: 20, marginTop: h(4) }}>Welcome to BeitiBeitak, Your plateform for vacation rentals in the Middle East and North Aftrica.  </Text>
        </View>     
      </ActionSheet>
    </View>

  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  activeDots: {
    marginTop: 70,
    backgroundColor: '#fff',
  },

  skipButtonTextStyle: {
    marginTop: 50,
    fontSize: 14,
    color: '#A0A0A0'
  },
  renderItemViewStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
});
export default AppIntro;