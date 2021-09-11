import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

export function listingDispatch(navigation, TOKEN){
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



export function singleListingDispatch(navigation,TOKEN,ListingId){
    return (dispatch) => {
        let SingListingUrl = BaseUrl + `api/v1/Listing/${ListingId}`;
       
        fetch(SingListingUrl, {
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
                        type: 'SHOW_SINGLE_LISTING',
                        payload: {
                            isLoading: false,
                            response: res,
                            error: ''
                        }
                    });
                    Actions.SingleListing;
                    // Alert.alert("Registration Successful")
                    // //navigating to homepage after success
                     navigation.navigate("SingleListing");
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


export function listingPublishDispatch(navigation,TOKEN,listingPublishId){
    return (dispatch) => {
        let PublishListingUrl = BaseUrl + `/api/v1/Listing/${listingPublishId}/publish`;
       
        fetch(PublishListingUrl, {
            method: 'POST',
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
                        type: 'PUBLISH_LISTING_RES',
                        payload: {
                            isLoading: false,
                            response: res,
                            error: ''
                        }
                    });
                   // Actions.SingleListing;
                    // Alert.alert("Registration Successful")
                    // //navigating to homepage after success
                     //navigation.navigate("SingleListing");
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