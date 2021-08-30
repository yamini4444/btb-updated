import { StyleSheet } from 'react-native';
import { w, h } from '../../utils/Dimensions';
import { Left } from 'native-base';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ececec',
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

  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Header:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:h(2),
    backgroundColor:'#ececec'
  },
  HeaderTxt:{
    fontSize:22,
    textAlign:'center',
    fontWeight:'bold'
  },
  body:{
    margin:h(2)
  },
  searchView: {
    height: 40,
    width: 300,
    backgroundColor: '#F9F9FD',
    borderRadius: 20,
    marginTop: h(2.8),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  searchText: {
    alignSelf: 'center',
    marginLeft: w(6),
    fontWeight: 'bold',
    opacity: 0.3,
  },
  searchIcon: {
    height: 18,
    width: 18,
    marginLeft: w(0),
    tintColor: '#C86CE6',
    // marginTop: h(2.2),
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
