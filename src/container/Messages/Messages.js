import React from 'react';
import { View,
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
  StyleSheet,
  SafeAreaView,} from 'react-native';
  import { h, w } from '../../utils/Dimensions';
  
const Messages = () => {
  
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
       
        <Text style={styles.HeaderTxt}>Message</Text>
        <View>
        </View>
        {/* <Image source={userPhoto} /> */}
      </View>

      <View style={styles.body}>
        {/* <Text>Welcome,{userFullName}</Text> */}

       
      </View>



    </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  contentContainer: {
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Header:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:h(2),
    backgroundColor:'#ececec'
  },
  HeaderTxt:{
    fontSize:22,
    textAlign:'center',
    fontWeight:'bold'
  },
  body:{
    margin:h(2)
  },
  searchView: {
    height: 40,
    width: 300,
    backgroundColor: '#F9F9FD',
    borderRadius: 20,
    marginTop: h(2.8),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  searchText: {
    alignSelf: 'center',
    marginLeft: w(6),
    fontWeight: 'bold',
    opacity: 0.3,
  },
  searchIcon: {
    height: 18,
    width: 18,
    marginLeft: w(0),
    tintColor: '#C86CE6',
    // marginTop: h(2.2),
  },
  logoStyle: {
    height: h(5),
    alignSelf: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    height: h(13),
    width: h(15),
    marginTop: h(5),
    resizeMode: 'stretch',
    borderRadius: h(25),
    marginLeft: h(2)
  },
  appName: {
    fontSize: 13,
    color: "blue",
    fontWeight: "bold",
    marginLeft: h(2),

  }
});

export default Messages;
