import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

export function listingDispatch(navigation, TOKEN){
    console.log(Token)
    return (dispatch) => {
        fetch(BaseUrl + `api/v1/Listing` , {
            method : 'GET',
            headers : {
                'www-authenticate' : ' Bearer ' + TOKEN,
                'accept' : 'application/json,text/plain,',
                'content-type':'application/json',
            },
        })

        .then((res) => res.json())
        .then(async (res) => {
            console.log('Response from server',res)
            if(res){
                await dispatch({
                    type: 'SHOW_LISTING_RESPONSE',
                    payload: {
                        isLoading:false,
                        response: res,
                        error: ''
                    }
                });
            }else{
                if(res.message != '')
                Alert.alert('messages', res.message)
                else
                Alert.alert('Something went wrong!');
            }
        })
        .catch((e) => {
                console.log(e)
        });
    }
}