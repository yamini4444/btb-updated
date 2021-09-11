import React, { useState, useEffect, createRef, useRef } from 'react';
import { View, Text, StyleSheet, FlatList,SafeAreaView,TouchableOpacity,Image,TextInput,BackHandler, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { w, h } from '../../utils/Dimensions';
import {listingDispatch} from '../../actions/ListingAction';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

const SingleListing = ({navigation}) => {
  const dispatch = useDispatch();
  const[accessToken,setAccessToken] = useState(null);
  const singleListingApi = useSelector((state) => state.listingReducer.SingleListingRes);
  console.log('singleBookingApi',singleListingApi);
 
  useEffect(async () => {
    await readData();
    
  }, [accessToken])

  useEffect(() => {
    if (singleListingApi && singleListingApi.length > 0 && singleListingApi != undefined) {
      let temp = [];
      for (let item of singleListingApi) {      
      //   console.log("item", item)
      //   console.log("room", item.rooms)
      //   let data = item.rooms
      //   console.log("data",data);
      //  for(let dataArray of data){
      //    console.log("dataArray",dataArray)
      //  }
     
      }
    }
  }, [singleListingApi]);

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

 
  const readData = async () => {
    try {
      const userToken = await AsyncStorage.getItem('accessToken')
      console.log(userToken);
      if (userToken !== null)
        setAccessToken(userToken)
      console.log(accessToken) 	
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
 
  return (
     <SafeAreaView flex={1}>
     <View
       style={styles.mainContainer}>
       <View style={styles.Header}>
         <TouchableOpacity onPress={() =>  Actions.Listing()}>
         <Image
           source={require('../../assets/icon/backnew.png')}
           style={{ width: h(4), height: h(5), tintColor: '#000' }}
           resizeMode="contain"/>
         </TouchableOpacity>        
         <Text style={styles.HeaderTxt}>Listing Details</Text>
         <View>
         </View>       
       </View>
       <View style={styles.body}>        
        <Text>{singleListingApi.id}</Text>       
       </View>
     </View>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
  mainView: {
    padding: h(1.5),
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 15,
    shadowColor: '#cccccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 5,
    borderWidth: 0.3,
    borderColor: '#0000000D',
    marginHorizontal: 5,
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

export default SingleListing;
