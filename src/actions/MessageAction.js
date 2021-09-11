import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';


export function messagesDispatch(navigation,TOKEN){
    return (dispatch) => {
       
        fetch(BaseUrl + `/api/v1/Messages/conversations`, {
            method: 'GET',
            headers: {
                'www-authenticate': 'Bearer ' + TOKEN,
                'accept': 'application/json,text/plain, */*',
                'content-type': 'application/json',
            },
            // body: JSON.stringify(data)
        })

            .then((res) => res.json())
            .then(async (res) => {
                console.log('response from server', res)
                if (res) {
                    await dispatch({
                        type: 'SHOW_MESSAGES_LIST',
                        payload: {
                            isLoading: false,
                            response: res,
                            error: ''
                        }
                    });
                   
                    // Alert.alert("Registration Successful")
                    // //navigating to homepage after success
                     
                } else {
                    // navigation.navigate("Login")
                    if (res.message != '')
                        Alert.alert('messagesss', res.message);
                    else
                        Alert.alert('Something went wrong!');
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }
};

export function ShowConversationDispatch(navigation,TOKEN,messageId){
    return (dispatch) => {
       let Conversation = BaseUrl + `/api/v1/Messages/conversations/${messageId}/messages`
        fetch(Conversation, {
            method: 'GET',
            headers: {
                'www-authenticate': 'Bearer ' + TOKEN,
                'accept': 'application/json,text/plain, */*',
                'content-type': 'application/json',
            },
            // body: JSON.stringify(data)
        })

            .then((res) => res.json())
            .then(async (res) => {
                console.log('response from server Conversation', res)
                if (res) {
                    await dispatch({
                        type: 'SHOW_CONVERSATION',
                        payload: {
                            isLoading: false,
                            response: res,
                            error: ''
                        }
                    });
                    Actions.ConversationScreen;
                    navigation.navigate("ConversationScreen");
                    // Alert.alert("Registration Successful")
                    // //navigating to homepage after success
                     
                } else {
                    // navigation.navigate("Login")
                    if (res.message != '')
                        Alert.alert('messagesss', res.message);
                    else
                        Alert.alert('Something went wrong!');
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }
};

