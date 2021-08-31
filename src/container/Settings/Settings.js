import React, { useState, useEffect, createRef, useRef } from 'react';
import {
    View,
    Image,
    SafeAreaView,
    Dimensions,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {changeLaguage} from '../../constants/LocaleString';
import { h, w } from '../../utils/Dimensions';
import ModalDropdown from 'react-native-modal-dropdown';
import ModalSelector from 'react-native-modal-selector'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Option = [{ "key": "en_us", "label": 'English-US' }, { "key": "en_uk", "label": 'English-Uk' }, { "key": "it", "label": 'Italian' }];

const Settings = ({ navigation }) => {

    const [option, setOption] = useState('');
    useEffect(() => {
       
      }, [changeLaguage]);
    return (
        <SafeAreaView flex={1}>
            <View
                style={styles.mainContainer}>
                <View style={styles.Header}>
                    <TouchableOpacity onPress={() => Actions.tabbar()}>
                        <Image
                            source={require('../../assets/icon/backnew.png')}
                            style={{ width: h(4), height: h(5), tintColor: '#000' }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={styles.HeaderTxt}>Settings</Text>
                    <View>
                    </View>
                </View>

                <View style={styles.body}>
                    <TouchableOpacity style={styles.mainView}>
                        {/* <ModalDropdown
                    style={{
                      height: h(4),
                      width: '100%',                     
                      //paddingHorizontal: h(2),
                      alignSelf: 'center',
                      justifyContent: 'center',
                      borderRadius: h(1.5),
                      fontSize: h(3),
                    }}
                    dropdownTextStyle={{
                      color: '#000',
                      fontSize: 16,
                    }}
                    textStyle={{
                      fontSize: h(3),
                      fontWeight: 'bold',
                      opacity: 0.5,
                    }}
                    dropdownStyle={{
                       marginTop: h(1),
                       width: '87%',
                      height: h(17),
                    }}
                    dropdownTextStyle={{
                      color: '#000',
                      fontSize: 16,
                    }}
                    textStyle={{
                      fontSize: h(3),
                      fontWeight: 'bold',
                      opacity: 0.5,
                    }}
                   
                    options={Option}
                    onSelect={(index, value) => setOption(value)}
                   > 
                   

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // backgroundColor:'red'
                      }}>
                      <Text
                        style={{
                          marginLeft: 7,
                          color: option == null ? '#bfbfbf' : '#000',
                          fontSize: 14,
                        }}>
                        {option == '' || option == null
                          ? 'Select Language'
                          : option}
                      </Text>
                      <Image
                        source={require('../../assets/icon/down-button.png')}
                        style={{
                          height: h(2),
                          width: w(4),
                          alignSelf: 'flex-end',
                          tintColor: '#6863FF',
                        }}></Image>
                    </View>
                  </ModalDropdown> */}

                        <ModalSelector
                            data={Option}
                            initValue="Select Language"
                            onChange={async(option) => { await changeLaguage(option.key)}} />
                             {/* onChange={async(option) => { alert(`${option.label} (${option.key}) nom nom nom`) }} /> */}

                    </TouchableOpacity>
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
    mainView: {
        padding: h(1.5),
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        backgroundColor: '#fff',
        elevation: 1,
        borderRadius: 10,
        shadowColor: '#cccccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 2,
        shadowRadius: 5,
        borderWidth: 0.8,
        borderColor: '#0000000D',
        // marginHorizontal: 5,
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

export default Settings;
