import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// export function loginRes(data) {
//     return {
//         type: ActionTypes.LOGIN,
//         data
//     }
// };


export function loginDisptach(data,navigation) {
    console.log('hello')
    Alert.alert('hie');
    return (dispatch) => {
        // fetch(BaseUrl + `/login`, {
        //     method: 'POST',
        //     headers: {
        //         'accept': 'application/json',
        //         'content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then((res) => res.json())
        //     .then(res => {
        //         console.log(res)
        //         if (res.state == "succeeded") {
        //             AsyncStorage.setItem("fullName", res.profile.name)
        //             AsyncStorage.setItem("firstName", res.profile.givenName)
        //             AsyncStorage.setItem("lastName", res.profile.surName)
        //             AsyncStorage.setItem("email", res.profile.email)
        //             AsyncStorage.setItem("userId", res.profile.id)
        //             AsyncStorage.setItem("refreshToken", res.refreshToken)
        //             AsyncStorage.setItem("accessToken", res.accessToken.token)
        //             AsyncStorage.setItem("accessTokenExpiry", res.accessToken.expiresIn)
        //             dispatch(loginRes(res));
        //             navigation.navigate("MainHome")
        //         } else {
        //             console.log(res)
        //             Alert.alert(res.message);
        //             dispatch(loginRes(res));
        //         }
        //     })
        //     .catch((e) => {
        //          console.log(e);
        //     });
    }
};

