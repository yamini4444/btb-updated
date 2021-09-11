import React, { useState, useEffect } from 'react';
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
    StyleSheet,
    SafeAreaView,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { w, h } from '../../utils/Dimensions';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';


const Conversation = () => {
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useState(null);
    const messageListApi = useSelector((state) => state.messageReducer.ConversationRes);
    const [userId, setUserId] = useState(null);

    useEffect(async () => {
        await readData();

    }, [accessToken])

    useEffect(() => {
        if (messageListApi && messageListApi.length > 0 && messageListApi != undefined) {
            let temp = [];
            for (let item of messageListApi) {
                //   console.log("item", item)
                //   console.log("room", item.rooms)
                //   let data = item.rooms
                //   console.log("data",data);
                //  for(let dataArray of data){
                console.log("messageListApi", messageListApi);
                //  }

            }
        }
    }, [messageListApi]);

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
            const userId = await AsyncStorage.getItem('userId')
            console.log(userToken);
            if (userToken !== null)
                setAccessToken(userToken)
            if (userId !== null)
                setUserId(userId)
            console.log(userId)
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }




    return (
        <SafeAreaView flex={1}>
            <View
                style={styles.mainContainer}>
                <View style={styles.Header}>
                    <TouchableOpacity onPress={() => Actions.tabbar()}>
                        <Image
                            source={require('../../assets/icon/backnew.png')}
                            style={{ width: h(4), height: h(5), tintColor: '#000' }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={styles.HeaderTxt}>Message</Text>
                    <View>
                    </View>
                </View>

                <View style={styles.body}>
                    <FlatList style={styles.list}
                        data={messageListApi}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            // let inMessage = item.type === 'in';
                            // let itemStyle = inMessage ? styles.itemIn : styles.itemOut;        
                            <View style={[item.receivedByUser.id == userId ? styles.item : styles.itemLeft]}>
                                <View style={[styles.balloon]}>
                                    <Text>{item.message}</Text>
                                    {/* <Text>{item.receivedByUser.givenName}</Text>
                                    <Text>{item.sentByUser.givenName}</Text> */}
                                </View>
                            </View>
                        )
                        } />

                </View>
                <View style={styles.footer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Write a message..."
                            underlineColorAndroid='transparent'
                        // onChangeText={(name_address) => this.setState({ name_address })}
                        />
                    </View>

                    <TouchableOpacity style={styles.btnSend}>
                        <Image source={{ uri: "https://img.icons8.com/small/75/ffffff/filled-sent.png" }} style={styles.iconSend} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

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

    },
    container: {
        flex: 1
    },
    list: {
        paddingHorizontal: 17,

    },
    footer: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 10,
        padding: 5,
    },
    btnSend: {
        backgroundColor: "#00BFFF",
        width: 40,
        height: 40,
        borderRadius: 360,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSend: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    inputs: {
        height: 40,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    balloon: {
        maxWidth: 250,
        padding: 5,
        borderRadius: 10,
    },
    itemIn: {
        alignSelf: 'flex-start'
    },
    itemOut: {
        alignSelf: 'flex-end'
    },
    time: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize: 12,
        color: "#808080",
    },
    item: {
        marginVertical: 5,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#eeeeee",
        borderRadius: 10,
        padding: 5,
        alignSelf: 'flex-end'
    },
    itemLeft: {
        marginVertical: 5,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#3366ff",
        borderRadius: 10,
        padding: 5,
        alignSelf: 'flex-start'
    }



});

export default Conversation;
