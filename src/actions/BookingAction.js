import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

// export function signUp(data) {
//     return {
//         type: ActionTypes.LOGIN,
//         data
//     }
// };


export function bookingDispatch(navigation, TOKEN) {
    console.log(TOKEN)
    return (dispatch) => {
        //fetch(BaseUrl + `api/v1/Auth/register`, {
        fetch(BaseUrl + `api/v1/Listing`, {
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
                        type: 'SHOW_BOOKING_RESPONSE',
                        payload: {
                            isLoading: false,
                            response: res,
                            error: ''
                        }
                    });
                    // Alert.alert("Registration Successful")
                    // //navigating to homepage after success
                    // navigation.navigate("Home")
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
