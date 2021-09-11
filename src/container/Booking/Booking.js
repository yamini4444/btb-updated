import React, { useState, useEffect, createRef, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { w, h } from '../../utils/Dimensions';
import { bookingDispatch, bookingActionDisptach, singleBookingDispatch } from '../../actions/BookingAction';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

const Booking = ({navigation}) => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState(null);
  const listingDataAPI = useSelector((state) => state.bookingReducer.BookingRes);
  const [roomsListing, setRoomsListing] = useState(null);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(100);
  const [bookingType, setBookingType] = useState('host_all');
  const [bookingSummry, setBookingSummry] = useState(null);
  const [bookingId, setBookingId] = useState('');
  const [pending, setPending] = useState('');
  const [approved, setApproved] = useState('');
  const [completed, setCompleted] = useState('');
  const [canceled, setCancelled] = useState('');
  const [all, setAll] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [menuModalVisible2, setMenuModalVisible2] = useState(false);
  const [paymentGraceHours, setPaymentGraceHours] = useState(12);
  console.log('listingDataAPI', listingDataAPI);

  useEffect(async () => {
    await readData();
    listingData();
  }, [accessToken, bookingType, bookingId])

  useEffect(() => {
    if (listingDataAPI && listingDataAPI != undefined) {
      setBookingData(listingDataAPI.data);
      // setNextUrl(listingDataAPI.nextUrl);
      setBookingSummry(listingDataAPI.summary);
      setPending(listingDataAPI.summary.host_pending);
      setApproved(listingDataAPI.summary.host_approved);
      setCompleted(listingDataAPI.summary.host_completed);
      setCancelled(listingDataAPI.summary.host_cancelled);
      setAll(listingDataAPI.summary.host_all);
    }
  }, [listingDataAPI]);

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
  const listingData = async () => {
    console.log('booking ype', bookingType)
    await dispatch(bookingDispatch(navigation, accessToken, bookingType, take, skip, nextUrl));
  }

  const _handleBookingType = async (type) => {
    await setBookingType(type);
  }

  const OpenMenuModal = (bookingId) => {
    setBookingId(bookingId)
    setMenuModalVisible(true);
  };

  const onModalClose = () => {
    setMenuModalVisible(false)
  };

  const OpenMenuModal2 = (bookingId) => {
    setBookingId(bookingId)
    setMenuModalVisible2(true);
  };

  const onModalClose2 = () => {
    setMenuModalVisible2(false)
  };

  const bookingAction = async (action) => {
    console.log("dispatch Approve")
    let data = { paymentGraceHours: paymentGraceHours }
    await dispatch(bookingActionDisptach(navigation, accessToken, bookingId, action, data));
    await listingData();
  }

  //function for calling single booking api
  const SingleBookingApiCall = async (bookingId) =>{
        setBookingId(bookingId)
        await dispatch(singleBookingDispatch(navigation, accessToken, bookingId));
  }


  return (

    <SafeAreaView flex={1}>
      <View
        style={styles.mainContainer}>
        <View style={styles.Header}>
          <TouchableOpacity onPress={() => Actions.drawerOpen()}>
            <Image
              source={require('../../assets/icon/icon-menu.png')}
              style={{ width: h(4), height: h(5), tintColor: '#000' }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={styles.HeaderTxt}>Booking</Text>
          <TouchableOpacity></TouchableOpacity>
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

          <ScrollView horizontal={true} style={styles.tabView}>
            <TouchableOpacity onPress={() => _handleBookingType('host_pending')} style={styles.btnApprove}>
              <Text style={styles.btnTxt}>Pending ({pending})</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => _handleBookingType('host_approved')} style={styles.btnApprove}>
              <Text style={styles.btnTxt}>Approved ({approved})</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _handleBookingType('host_completed')} style={styles.btnApprove}>
              <Text style={styles.btnTxt}>Completed ({completed})</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _handleBookingType('host_cancelled')} style={styles.btnApprove}>
              <Text style={styles.btnTxt}>Cancelled ({canceled})</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _handleBookingType('host_all')} style={styles.btnApprove}>
              <Text style={styles.btnTxt}>All ({all})</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={{ flex: 12 }}>
            <FlatList
              style={{ marginTop: h(1) }}
              bounces={false}
              showsVerticalScrollIndicator={false}
              data={bookingData}
              keyExtractor={(item) => item.id}
              // onEndReached={()=>_listingData()}
              // onEndReachedThreshold={0.5}
              // initialNumToRender={10}
              // // ItemSeparatorComponent={() => <Separator />}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => SingleBookingApiCall(item.bookingId)} style={styles.mainView}>
                  <View>
                    <Text>{item.bookableId}</Text>
                    <Text>{item.bookableName}</Text>
                  </View>
                  {item.status == "pending_payment" || item.status == "pending" ?
                    <View>
                      <TouchableOpacity onPress={() => OpenMenuModal(item.bookingId)} style={styles.btnApprove}>
                        <Text style={styles.btnTxt}>Approve</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => OpenMenuModal2(item.bookingId)} style={styles.btnApprove}>
                        <Text style={styles.btnTxt}>Reject</Text>
                      </TouchableOpacity>
                    </View> : null
                  }

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={menuModalVisible}
                    onBackdropPress={() => setMenuModalVisible(false)}
                    dismiss={onModalClose}
                  >
                    <TouchableOpacity style={{ flex: 1 }}
                      onPress={() => setMenuModalVisible(false)}>
                      <View style={styles.menuModal}>

                        <TouchableOpacity onPress={() => onModalClose()}>
                          <Image source={require('../../assets/icon/letter-x.png')}
                            style={{
                              height: 15,
                              width: 15,
                              justifyContent: 'flex-end',
                              alignSelf: 'flex-end',
                              left: -20,
                              top: 20
                            }}>
                          </Image>
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Lorem Ipsum is dummy text</Text>
                        <Text style={{ flexWrap: 'wrap', textAlign: 'center', padding: 20, fontWeight: '400' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>

                        <TouchableOpacity style={styles.applyBtn} onPress={() => bookingAction('approve')} >
                          <Text style={styles.applyBtnText}>Approve</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </Modal>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={menuModalVisible2}
                    onBackdropPress={() => setMenuModalVisible2(false)}
                    dismiss={onModalClose2}
                  >
                    <TouchableOpacity style={{ flex: 1 }}
                      onPress={() => setMenuModalVisible2(false)}>
                      <View style={styles.menuModal}>

                        <TouchableOpacity onPress={() => onModalClose2()}>
                          <Image source={require('../../assets/icon/letter-x.png')}
                            style={{
                              height: 15,
                              width: 15,
                              justifyContent: 'flex-end',
                              alignSelf: 'flex-end',
                              left: -20,
                              top: 20
                            }}>
                          </Image>
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Lorem Ipsum is dummy text</Text>
                        <Text style={{ flexWrap: 'wrap', textAlign: 'center', padding: 20, fontWeight: '400' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>

                        <TouchableOpacity style={styles.applyBtn} onPress={() => bookingAction('decline')} >
                          <Text style={styles.applyBtnText}>Reject</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </TouchableOpacity>
              )}
            />

          </View>
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
  btnApprove: {
    margin: h(.5),
    justifyContent: 'center',
    height: h(4),
    borderRadius: 25,
    borderWidth: 1
  },
  btnTxt: {
    textAlign: 'center',
    paddingHorizontal: 5
  },
  contentContainer: {
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  tabView: {
    flex: 1,
    height: h(6),
    marginTop: h(1),
    flexDirection: 'row',
    padding: h(1),

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
    justifyContent: 'space-between',
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
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: h(2),
    backgroundColor: '#ececec'
  },
  HeaderTxt: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  body: {
    flex: 1,
    margin: h(2)
  },
  searchView: {
    flex: 1,
    height: 40,
    width: 300,
    backgroundColor: '#F9F9FD',
    borderRadius: 20,
    marginTop: h(1),
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

  },
  menuModal: {
    backgroundColor: '#fff',
    marginTop: h(28),
    //marginRight: 15,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    //left: 0,
    height: h(50),
    width: '90%',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#0000000D',
    //elevation: 10,
  },
  applyBtn: {
    height: h(7),
    width: w(25),
    backgroundColor: '#6863ff',
    borderRadius: 5,
    alignSelf: 'center',
    //marginTop:h(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  applyBtnText: {
    color: '#fff',
    fontSize: 18,
    //fontWeight:'bold' ,
  },
});

export default Booking;
