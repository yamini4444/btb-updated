import React, { useState, useEffect, createRef } from 'react';
import { LoginButton, AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next';
import {
    View,
    Text,
    Dimensions,
    StatusBar,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import {strings,getMockLanguages,changeLanguage} from '../../constants/LocaleString';
import { h, w } from '../../utils/Dimensions';
import { Actions } from 'react-native-router-flux';




const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Language = ({ navigation }) => {
    const screenStatus = navigation.isFocused();
    //const dispatch = useDispatch();
    const [Show, setShow] = useState(false);
    const [shareVisible, shareSetVisible] = useState(false);
    const [uiRender, setuiRender] = useState({ id: 0, index: 0 });
    const [mockData, setMockData] = useState({});
   
    useEffect(async () => {
        let mockData = getMockLanguages().then((response) => {
            setMockData(response)
          })
    }, [uiRender,getMockLanguages]);

    const chooseLanguage = async (item, index) => {
        //removing selected from previous selection
        mockData[uiRender.index].isSelected = false;
        //setting isSelected true for current selected language     
        mockData[index].isSelected = true;
        setuiRender({ id: mockData[index].id, index: index });
        await changeLanguage(mockData[index].key)
    }

    // Return Ui For Login Page
    return (

        <View
            style={styles.mainContainer}>
            <StatusBar backgroundColor="#fff"></StatusBar>
            <View style={{ margin: 10, flex: 1 }}>
                <TouchableOpacity onPress={Actions.Login}>
                    <Text style={{ textAlign: 'right', color: '#A4A4A4', fontSize: 12, fontWeight: 'bold' }}>Skip</Text>
                </TouchableOpacity>
                <View style={{ width: '70%', justifyContent: 'center', alignSelf: 'center', marginTop: h(10) }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#1B1B1B' }}>Choose your preffered languague</Text>
                    <Text style={{ fontSize: 14, color: '#A4A4A4', textAlign: 'center', marginTop: h(2) }}>Please select your language</Text>
                </View>
                <FlatList
                    style={{ marginTop: h(10) }}
                    data={mockData}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={async () => await chooseLanguage(item, index)}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: h(1), marginHorizontal: h(2), textAlign: 'left', }}>
                                <Text style={{ width: '90%', color: '#313131', fontSize: 14, fontWeight: 'bold', textAlign: 'left', alignItems: 'center', paddingHorizontal: h(1) }}>{item.label}</Text>
                                {uiRender && uiRender.index == index ?
                                    <Image
                                        style={styles.checkIcon}
                                        source={require('../../assets/image/checked.png')}
                                    /> : null
                                }
                            </View>
                            <View style={styles.lineView1}></View>
                        </TouchableOpacity>

                    )}>
                </FlatList>
            </View>
            <TouchableOpacity onPress={Actions.AppIntro}
                style={{ width: w(25), height: h(6), bottom: 10, borderRadius: 10, backgroundColor: '#33CEBB', justifyContent: 'center', alignSelf: 'flex-end', marginHorizontal: 20 }}>
                <Text style={{ textAlign: 'center', alignSelf: 'center', color: '#fff' }}>Next</Text></TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    checkIcon: {
        height: 16,
        width: 16
    },

    lineView1: {
        borderWidth: .5,
        opacity: .1,
        alignSelf: 'center',
        width: '90%',
        marginBottom: h(2.5)

    },

});
export default Language;