import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity,StatusBar} from 'react-native';
import styles from './styles';
import splashImg from '../../assets/image/logo.png';

export const SplashScreen = ({navigation}) => {

  setTimeout(() => {
      navigation.navigate('Language')
  },2000)


return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
        <StatusBar backgroundColor="#fff"></StatusBar>
      <View style={styles.container}>  
          <Image
              source={splashImg}
              style={styles.logo}
              resizeMode="contain"
          />
           
      </View>
      </View>
)
}

export default SplashScreen;

