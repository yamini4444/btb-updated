import React from 'react';
import { Scene, Router, Stack, Drawer } from 'react-native-router-flux';
import {
  Dimensions,
  Platform,
  Image,
  Text,
  View,
  AppRegistry,
} from 'react-native';
import DrawerBar from './component/Drawer/Drawer';
import SignUp from './container/SignUp/SignUp';
import DobScreen from './container/SignUp/DobScreen';
import PhoneNumberScreen from './container/SignUp/PhoneNumberScreen';
import OtpAuth from './container/SignUp/OtpAuth';
import Login from './container/Login/Login';
import Splash from './container/Splash/Splash';
import Language from './container/Language/Language';
import AppIntro from './container/AppIntro/AppIntro';
import Home from './container/Home/Home';
import Profile from './container/Profile/Profile';
import StaffLogin from './container/StaffLogin/StaffLogin';
import ForgetScreen from './container/ForgetScreen/ForgetScreen';
import OtpScreen from './container/OtpScreen/OtpScreen';
import SocialPopup from './container/SignUp/SocialPopup';
import Booking from './container/Booking/Booking';
import Listing from './container/Listing/Listing';
import Messages from './container/Messages/Messages';
import ConversationScreen from './container/ConversationScreen/ConversationScreen';
import Settings from './container/Settings/Settings';
import SingleBooking from './container/SingleBooking/SingleBooking';
import SingleListing from './container/SingleListing/SingleListing';
import ResetPassword from './container/ResetPassword/ResetPassword';
import ResetEmailScreen from './container/ResetEmailScreen/ResetEmailScreen';
import 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Colors from './constants/Colors';
import { w, h } from './utils/Dimensions';
import { connect } from "react-redux";

var width = Dimensions.get('window').width;
var image;
var tintcolor;
const TabIcon = ({ selected, title, img, focused }) => {
  const reduxState = useSelector((state) => state);
  switch (title) {
    case 'Home':
      image = focused
        ? require('./assets/icon/homeIcon.png')
        : require('./assets/icon/homeIcon.png');
      tintcolor = focused ? '#df396b' : '#C86CE6';
      break;

    case 'Profile':
      image = focused
        ? require('./assets/icon/homeIcon.png')
        : require('./assets/icon/homeIcon.png');
      tintcolor = focused ? '#df396b' : '#C86CE6';
      break;
    case 'Booking':
      image = focused
        ? require('./assets/icon/homeIcon.png')
        : require('./assets/icon/homeIcon.png');
      tintcolor = focused ? '#df396b' : '#C86CE6';
      break;

    case 'Messages':
      image = focused
        ? require('./assets/icon/homeIcon.png')
        : require('./assets/icon/homeIcon.png');
      tintcolor = focused ? '#df396b' : '#C86CE6';
      break;
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: focused ? Colors.appGreyColor : Colors.white,
        paddingHorizontal: h(1.5),
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={image}
        style={{ width: h(3), height: h(3), tintColor: tintcolor }}
        resizeMode="contain"
      />
      {focused ? (
        <Text
          style={{ fontWeight: 'bold', color: Colors.footerText, marginLeft: 3 }}>
          {title}
        </Text>
      ) : null}
    </View>
  );
};

const RouterWithRedux = connect()(Router);

class Root extends React.Component {

  render() {
    return (
      <RouterWithRedux>
        <Scene key="root" hideTabBar hideNavBar>
          <Stack key="app">
            <Scene hideNavBar panHandlers={null}>
              <Scene

                component={Splash}
                hideNavBar={true}
                key="Splash"
                title="Splash"
              />
              <Scene
                component={Language}
                hideNavBar={true}
                key="Language"
                wrap={false}
                title="Language"
              />
              <Scene
                component={AppIntro}
                hideNavBar={true}
                key="AppIntro"
                wrap={false}
                title="AppIntro"
              />
              <Scene
                component={ResetEmailScreen}
                hideNavBar={true}
                key="ResetEmailScreen"
                wrap={false}
                title="ResetEmailScreen"
              />
              <Scene
                component={ResetPassword}
                hideNavBar={true}
                key="ResetPassword"
                wrap={false}
                title="ResetPassword"
              />
              <Scene
                component={Login}
                hideNavBar={true}
                wrap={false}
                key="Login"
                title="Login"
              />
              <Scene
                initial={true}
                component={SignUp}
                hideNavBar={true}
                wrap={false}
                key="SignUp"
                title="SignUp"
              />
               <Scene
                component={DobScreen}
                hideNavBar={true}
                wrap={false}
                key="DobScreen"
                title="DobScreen"
              />
               <Scene
                component={PhoneNumberScreen}
                hideNavBar={true}
                wrap={false}
                key="PhoneNumberScreen"
                title="PhoneNumberScreen"
              />
               <Scene
                component={OtpAuth}
                hideNavBar={true}
                wrap={false}
                key="OtpAuth"
                title="OtpAuth"
              /> 
              <Scene
                component={SocialPopup}
                hideNavBar={true}
                wrap={false}
                key="SocialPopup"
                title="SocialPopup"
              />
              <Scene
                component={ForgetScreen}
                hideNavBar={true}
                wrap={false}
                key="ForgetScreen"
                title="ForgetScreen"
              />
              <Scene
                component={OtpScreen}
                hideNavBar={true}
                wrap={false}
                key="OtpScreen"
                title="OtpScreen"
              />
              <Scene
                component={Listing}
                hideNavBar={true}
                wrap={false}
                key="Listing"
                title="Listing"
              />
              <Scene
                component={Settings}
                hideNavBar={true}
                wrap={false}
                key="Settings"
                title="Settings"
              />
              <Scene
                component={SingleBooking}
                hideNavBar={true}
                wrap={false}
                key="SingleBooking"
                title="SingleBooking"
              />
              <Scene
                component={SingleListing}
                hideNavBar={true}
                wrap={false}
                key="SingleListing"
                title="SingleListing"
              />
              <Scene
                component={ConversationScreen}
                hideNavBar={true}
                key="ConversationScreen"
                title="ConversationScreen"
                wrap={false}>
              </Scene>

              <Drawer
                hideNavBar
                key="drawer"
                onExit={() => {
                  console.log('Drawer closed');
                }}
                onEnter={() => {
                  console.log('Drawer opened');
                }}
                contentComponent={DrawerBar}
                backgroundColor={'#fff'}
                drawerWidth={width}>
                <Scene
                  key="tabbar"
                  tabs
                  showLabel={false}
                  tabBarStyle={{
                    backgroundColor: '#fff',
                    paddingVertical: h(0.5),
                  }}>
                  <Scene title="Home" icon={TabIcon} img={image}>
                    <Scene
                      initial={true}
                      component={Home}
                      hideNavBar={true}
                      wrap={false}
                      key="Home"
                      title="Home"
                    />
                  </Scene>
                  <Scene title="Profile" icon={TabIcon} img={image}>
                    <Scene
                      component={Profile}
                      hideNavBar={true}
                      key="Profile"
                      title="Profile"
                      wrap={false}></Scene>
                  </Scene>
                  <Scene title="Booking" icon={TabIcon} img={image}>
                    <Scene
                      initial={true}
                      component={Booking}
                      hideNavBar={true}
                      wrap={false}
                      key="Booking"
                      title="Booking"
                    />
                  </Scene>
                  <Scene title="Messages" icon={TabIcon} img={image}>
                    <Scene
                      component={Messages}
                      hideNavBar={true}
                      key="Messages"
                      title="Messages"
                      wrap={false}>

                    </Scene>
                  </Scene>
                </Scene>
              </Drawer>
            </Scene>
          </Stack>
        </Scene>
      </RouterWithRedux>
    );
  }
}

export default Root;
console.disableYellowBox = true;
