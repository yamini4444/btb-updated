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
import { messagesDispatch, ShowConversationDispatch } from '../../actions/MessageAction';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

// The public hub to connect to. This is running code from https://github.com/jonathanzufi/SignalRWebServer 
const hub_endpoint = 'https://app.bookbtb.com/hubs/messages';

const Messages = ({ navigation }) => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState(null);
  const messageListApi = useSelector((state) => state.messageReducer.MessageRes);
  const [messageId, setMessageId] = useState('');

  //signalr constants
  const [user, onChangeUserText] = React.useState('');
  const [message, onChangeMessageText] = React.useState('');
  const [conn, setConn] = React.useState(null);
  const [messageLog, setMessageLog] = React.useState([]);
  const [connectionState, setConnectedStateText] = React.useState('');
  const [isConnected, setConnected] = React.useState(false);

  //signal r use effect
  const RECIEVE_METHOOD_NAME = "ReceiveMessage";
  const SEND_METHOOD_NAME = "SendPrivateMessage";
  const MARK_AS_READ = "MarkAsRead";
  const MESSAGE_STATUS_CHANGE = "MessageStatusChange";
  // Initialize the hub endpoint and set up routes for incoming events
  useEffect(() => {

    // Setting the log level to Debug will generate tons more diagnostic
    // messages in the console log which can help give a deeper understanding
    // of how SignalR works and what it's doing under the covers
    const connection = new HubConnectionBuilder()
      .withUrl(hub_endpoint)
      .configureLogging(LogLevel.Debug)
      .build();

    setConnectedStateText(`Trying to connect to ${hub_endpoint}`);

    // Try to start the connection
    connection
      .start()
      .then(() => {
        setConnectedStateText(`Connected to ${hub_endpoint}`);
        setConnected(true);
      })
      .catch(err => console.log(`Error starting the connection: ${err.toString()}`));

    // Handle connection closing
    connection.onclose(async () => {
      setConnectedStateText(`Disconnected from ${hub_endpoint}`);
      setConnected(false);
    });

    // Incoming messages will grow the message log array
    connection.on(RECIEVE_METHOOD_NAME, function (data) {
      console.log(data)
      setMessageLog(data);
      listingData();
    });

    // This isn't very elegant but I'm still learning about scope and state in React Native
    // This seemed like the logical way to make the connection object available to the 'Reconnect' button
    // but I think the connection object/handler should be encapsulated into it's own component
    setConn(connection);

  }, [messageListApi]);
//end signalr

  useEffect(async () => {
    await readData();
    listingData();
  }, [accessToken])


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
    await dispatch(messagesDispatch(navigation, accessToken));
    console.log('message list mer i awlai',messageListApi)
    console.log('date ffrom api',comp(messageListApi[0].lastMessage.sort(comp)))
    console.log('JSON.stringify',JSON.stringify(messageListApi))
    // for(let item of messageListApi){
    //   console.log('date ffrom api',comp(result[0].condlocalisation.sort(comp)))
    //   //const dateNew = item.lastMessage.date
    // }
  }

  const comp = async(a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}

  const splitDate = (item) => {
    const newDate = item.split('T');
    return newDate[0];
  }
  const showConversationApi = async (messageId) => {
    setMessageId(messageId)
    await dispatch(ShowConversationDispatch(navigation, accessToken, messageId));
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
              resizeMode="contain" />
          </TouchableOpacity>

          <Text style={styles.HeaderTxt}>Message</Text>
          <View>
          </View>
        </View>

        <View style={styles.body}>
          <FlatList
            style={{ marginTop: h(4) }}
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={messageListApi}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.mainView} onPress={() => showConversationApi(item.id)}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={item.guest.profilePhotoUrl ? { uri: item.guest.profilePhotoUrl } : require('../../assets/icon/person.png')}
                    style={{ width: 32, height: 32, tintColor: '#000', alignSelf: 'center', marginHorizontal: 10 }}
                    resizeMode="contain" />
                  <View>
                    <Text>{item.guest.givenName}</Text>
                    <Text>{item.lastMessage.message}</Text>
                  </View>
                </View>
                <Text>{splitDate(item.lastMessage.date)}</Text>
              </TouchableOpacity>
            )} />
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
    margin: h(2)
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
