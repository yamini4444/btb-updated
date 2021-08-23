import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux'; 

// export function signUp(data) {
//     return {
//         type: ActionTypes.LOGIN,
//         data
//     }
// };

export function signUp(data,navigation) {
    console.log("datadatda", data);
    return (dispatch) => {
        fetch(`https://app.bookbtb.com/api/v1/Auth/register`, {
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
            .then(res => {
                console.log(res)
                // console.log(res)
                if (res.ok === true || res.status === 200) {
                    console.log(res, 'rest')
                    dispatch({ type: 'SHOW_SIGNUP_RESPONSE', payload: res });
                    navigation.navigate("MainHome")

                } else {
                    console.log('reatsonef ', res)
                   navigation.navigate("Login")
                    if(res.message!='')
                        Alert.alert('message',res.message);
                    else
                        Alert.alert('Something went wrong!');    
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }
};

