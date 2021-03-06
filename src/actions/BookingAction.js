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


export function bookingDispatch(navigation, TOKEN, type = 'host_all', take = 30, skip = 0, nextUrl = null) {
    console.log(TOKEN)
    return (dispatch) => {
        let bookingUrl = BaseUrl + `api/v1/Booking?type=${type}&take=${take}&skip=${skip}`;
        if (nextUrl != null) {
            bookingUrl = nextUrl
        }
        fetch(bookingUrl, {
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

export function bookingActionDisptach(navigation, TOKEN, bookingId, action, data) {
    return (dispatch) => {
        if (action !== 'approve')
            data = {}
        let approveUrl = BaseUrl + `api/v1/Booking/${bookingId}/${action}`
        fetch(approveUrl, {
            method: 'POST',
            headers: {
                'www-authenticate': ' Bearer ' + TOKEN,
                'accept': 'application/json,text/plain,',
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })

            .then((res) => res.json())
            .then(async (res) => {
                console.log('Response from server', res)
                if (res) {
                    await dispatch({
                        type: 'SHOW_APPROVED_RESPONSE',
                        payload: {
                            isLoading: false,
                            response: res,
                            error: ''
                        }
                    });
                } else {
                    if (res.message != '')
                        Alert.alert('messages', res.message)
                    else
                        Alert.alert('Something went wrong!');
                }
            })
            .catch((e) => {
                console.log(e)
            });
    }
};

export function singleBookingDispatch(navigation,TOKEN,bookingId){
    console.log(TOKEN)
    return (dispatch) => {
        let SingBookingUrl = BaseUrl + `api/v1/Booking/${bookingId}`;
       
        fetch(SingBookingUrl, {
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
                        type: 'SHOW_SINGLE_BOOKING',
                        payload: {
                            isLoading: false,
                            response: res,
                            error: ''
                        }
                    });
                    Actions.SingleBooking;
                    // Alert.alert("Registration Successful")
                    // //navigating to homepage after success
                     navigation.navigate("SingleBooking");
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