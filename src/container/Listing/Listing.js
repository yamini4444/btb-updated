import React, { useState, useEffect, createRef, useRef } from 'react';
import { View, Text, StyleSheet, FlatList,SafeAreaView,TouchableOpacity,Image,TextInput,BackHandler, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { w, h } from '../../utils/Dimensions';
import {listingDispatch} from '../../actions/ListingAction';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

const Listing = ({navigation}) => {
  const dispatch = useDispatch();
  const[accessToken,setAccessToken] = useState(null);
  const[roomsListing,setRoomsListing] = useState(null);
  const listingDataAPI = useSelector((state) => state.bookingReducer.BookingRes);
  console.log('listingDataAPI',listingDataAPI);
 
  useEffect(async () => {
    await readData();
    listingData();
  }, [accessToken])

  useEffect(() => {
    if (listingDataAPI && listingDataAPI.length > 0 && listingDataAPI != undefined) {
      let temp = [];
      for (let item of listingDataAPI) {      
      //   console.log("item", item)
      //   console.log("room", item.rooms)
      //   let data = item.rooms
      //   console.log("data",data);
      //  for(let dataArray of data){
      //    console.log("dataArray",dataArray)
      //  }
      temp.push(item);
      setRoomsListing(temp)
      }
    }
  }, [listingDataAPI]);

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

  // useEffect(async() => {
  //   if (listingDataAPI && listingDataAPI.length > 0 && listingDataAPI != undefined) {
  //     let temp={};
  //    await listingDataAPI.forEach((item,index) => {
  //       item.rooms.forEach((lowerItem,lowerIndex)=>{
  //         temp[index] = lowerItem
  //       })
  //     });
  //     console.log('rooms',temp)
  //       setRoomsListing(temp)
  //     }
  // }, []);
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
  const listingData = () => {
    dispatch(listingDispatch(navigation,accessToken));
  }
  return (
   
     <SafeAreaView flex={1}>
     <View
       style={styles.mainContainer}>
       <View style={styles.Header}>
         <TouchableOpacity onPress={() =>  Actions.tabbar()}>
         <Image
           source={require('../../assets/icon/backnew.png')}
           style={{ width: h(4), height: h(5), tintColor: '#000' }}
           resizeMode="contain"
         />
         </TouchableOpacity>
        
         <Text style={styles.HeaderTxt}>Listing</Text>
         <View>
         </View>
         {/* <Image source={userPhoto} /> */}
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
         <FlatList
          style={{marginTop:h(4)}}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={roomsListing}
          keyExtractor={(item) => item.id}
          // ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item, index }) => (
            <View style={styles.mainView}>
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
            </View>
          )}
        />
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

export default Listing;
