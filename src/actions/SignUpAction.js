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

export function signUp(data, navigation) {
    console.log("datadatda", data);
    return (dispatch) => {
        fetch(BaseUrl + `api/v1/Auth/register`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })

            .then((res) => res.json())
            .then(res => {
                console.log('restponse', res)
                console.log('state', res.state)
                console.log('data res', res.profile);
                if (res.state == "succeeded") {
                    //storing userinfo to localstorge
                    AsyncStorage.setItem("fullName", res.profile.name)
                    AsyncStorage.setItem("firstName", res.profile.givenName)
                    AsyncStorage.setItem("lastName", res.profile.surName)
                    AsyncStorage.setItem("email", res.profile.email)
                    AsyncStorage.setItem("userId", res.profile.id)
                    AsyncStorage.setItem("refreshToken", res.refreshToken)
                    AsyncStorage.setItem("accessToken", res.accessToken.token)
                    AsyncStorage.setItem("accessTokenExpiry", res.accessToken.expiresIn)
                    
                    //signup disptach
                    dispatch({ type: 'SHOW_SIGNUP_RESPONSE', payload: res });
                    Alert.alert("Registration Successful")
                    //navigating to homepage after success
                    navigation.navigate("Home")
                } else {
                    console.log('reatsonef ', res)
                    navigation.navigate("Login")
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

export function signUpSocial(data, navigation) {
    return (dispatch) => {
        fetch(BaseUrl + `api/v1/AppAuth/external-register`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            // .then((res) => {
            //     console.log(res);
            //     if (res.ok) {
            //         res.json()
            //     } else {
            //         throw res.message
            //     }
            // })
            // .then((res) => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    dispatch({ type: 'SHOW_SIGNUP_RESPONSE', payload: res });
                    navigation.navigate("Home")
                } else {
                    console.log('reatsonef ', res)
                    navigation.navigate("Home")
                    if (res.messageeee != '')
                        Alert.alert('message', res.message);
                    else
                        Alert.alert('Something went wrong!');
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }
};