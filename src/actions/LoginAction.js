import * as ActionTypes from '../constants/ActionTypes';
import { BaseUrl } from '../constants/api';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export function loginRes(data) {
    return {
        type: ActionTypes.LOGIN,
        data
    }
};


export function loginDisptach(data,navigation) {
    return (dispatch) => {
        fetch(BaseUrl + `api/v1/AppAuth/login`, {
            method: 'POST',
            headers: {
                'accept': 'application/json,text/plain',
                'content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                console.log(res)
                if (res.state == "succeeded") {
                    AsyncStorage.setItem("fullName", res.profile.name)
                    AsyncStorage.setItem("firstName", res.profile.givenName)
                    AsyncStorage.setItem("lastName", res.profile.surName)
                    AsyncStorage.setItem("email", res.profile.email)
                    AsyncStorage.setItem("userId", res.profile.id)
                    AsyncStorage.setItem("refreshToken", res.refreshToken)
                    AsyncStorage.setItem("accessToken", res.accessToken.token)
                    AsyncStorage.setItem("accessTokenExpiry", res.accessToken.expiresIn)
                    AsyncStorage.getAllKeys((err, keys) => {
                        AsyncStorage.multiGet(keys, (error, stores) => {
                          stores.map((result, i, store) => {
                            console.log({ [store[i][0]]: store[i][1] });
                            return true;
                          });
                        });
                      });
                    dispatch({ type: 'SHOW_LOGIN_RESPONSE', payload: res });
                    Alert.alert("Login Successful")
                    navigation.navigate("Home")
                } else {
                    console.log(res)
                    Alert.alert(res.message);
                    dispatch(loginRes(res));
                }
            })
            .catch((e) => {
                 console.log(e);
                 console.warn(xhr.responseText)
            });
    }
};

export function loginSocialDisptach(data,navigation) {
    console.log('post social data')
    return (dispatch) => {
        fetch(BaseUrl + `api/v1/AppAuth/external-login`, {
            method: 'POST',
            headers: {
                'accept': 'application/json,text/plain',
                'content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                console.log(res)
                if (res.state == "succeeded") {
                    console.log("fullName", res.profile.name)
                    console.log("accessToken", res.accessToken.token)
                    console.log("response", res)
                    AsyncStorage.setItem("fullName", res.profile.name)
                    AsyncStorage.setItem("firstName", res.profile.givenName)
                    AsyncStorage.setItem("lastName", res.profile.surName)
                    AsyncStorage.setItem("email", res.profile.email)
                    AsyncStorage.setItem("userId", res.profile.id)
                    AsyncStorage.setItem("refreshToken", res.refreshToken)
                    AsyncStorage.setItem("accessToken", res.accessToken.token)
                    AsyncStorage.setItem("accessTokenExpiry", res.accessToken.expiresIn)
                    AsyncStorage.getAllKeys((err, keys) => {
                        AsyncStorage.multiGet(keys, (error, stores) => {
                          stores.map((result, i, store) => {
                            console.log({ [store[i][0]]: store[i][1] });
                            return true;
                          });
                        });
                      });
                    dispatch({ type: 'SHOW_LOGIN_RESPONSE', payload: res });
                   
                    Alert.alert("Login Successful")
                    navigation.navigate("Home")
                } else {
                    console.log(res)
                    Alert.alert(res.message);
                    dispatch(loginRes(res));
                }
            })
            .catch((e) => {
                 console.log(e);
                 console.warn(xhr.responseText)
            });
    }
};