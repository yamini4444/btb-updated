import { StyleSheet } from 'react-native';
import { back } from 'react-native/Libraries/Animated/Easing';
import { h, height, w } from '../../utils/Dimensions';

export default StyleSheet.create({
  mainContainerBox:{
    flex: 1,
    backgroundColor: '#fff',
    opacity: 1,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  txt: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    // marginTop:10,
    position:'absolute',
    color: '#383B3F'
  },
  Otpcontainer: {
  },
  passwordBox:{
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: '#000',
    borderWidth: w(0.28),
    width: w(75),
    height: h(5),
    borderRadius: w(10),
    marginTop: h(1),
    paddingLeft: w(5),
  },
  touchPassword:{
    alignItems: 'center', 
    justifyContent: 'center'
  },
  EyeImage:{
    resizeMode: 'contain', 
    height: 20, 
    width: 20
  },
  inputFieldContainer: {
    alignSelf: 'center',
    fontSize: 14,
    borderColor:'#000',
    marginVertical:h(1),
    // borderColor: '#000',
    borderWidth: w(0.28),
    width: w(75),
    height: h(5),
    borderRadius: w(10),
    // top: h(21),
    paddingLeft: w(5)
  },
  inputFieldContainerSocial: {
    alignSelf: 'center',
    fontSize: 14,
    borderColor:'#000',
    marginTop:50,
    // borderColor: '#000',
    borderWidth: w(0.28),
    width: w(75),
    height: h(5),
    borderRadius: w(10),
    // top: h(21),
    paddingLeft: w(5)
  },
  inputFieldContainer2: {
    // alignSelf: 'center',
    // borderColor: '#000',
    // borderWidth: w(0.28),
    fontSize: 14,
    width: w(60),
    height: h(5),
    borderRadius: w(10),
    
  },
  passimage: {
    top: h(31),
    // marginRight:w(20)
    right: w(7)
  },
  rememberView:{
    flexDirection: 'row',
    marginTop: h(1),
    alignSelf: 'center',
  },
  showRemember:{
    height: 18,
    width: 18,
    justifyContent: 'center',
    alignItems: 'center',
    top: h(0.2),
  },
  notShowRemember:{
    height: 12, 
    width: 12, 
    resizeMode: 'contain',
    tintColor:'#0000ff'
  },
  rememberTxt:{
    color: '#8c8c8c',
    marginLeft: w(2),
    fontSize: 12,
    marginTop: h(0.3),
  },
  forgotButton: {
    color: '#8c8c8c', 
    fontSize: 12,
    marginLeft: w(11),
    marginTop: h(0.3)
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#0000ff',
    width: w(75),
    height: h(5),
    borderRadius: w(10),
    top: h(7),
    justifyContent: 'center',
    alignItems: 'center'
  },
  AndText: {
    fontSize: 16,
    fontWeight: '500',
    // alignSelf: 'center',
    color: '#fff',
    // marginTop: h(1.2),
  },
  socialLogin:{
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  
  socialButton: {
    flexDirection: 'row',
    top: h(14),
    alignSelf: 'center',
    marginLeft: w(7),
  },
  socialImgButton: {
    // width: w(19),
    // alignSelf: 'center',
  },
  fbView:{
    height: h(6) ,
    width: h(6),
    borderRadius: h(6)/2,
    backgroundColor: '#000099',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gmailView:{
    height: h(6),
    width: h(6),
    borderRadius: h(6)/2,
    backgroundColor: '#ff5050',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: w(5),
  },
  innerTxt:{
    width: h(2.8),
    height: h(2.8),
    resizeMode: 'contain',
  },
  signUpView:{
    alignSelf: 'center',
    marginTop: h(8),
    color: '#0000ff',
  },
  img: {
    width: h(7),
    height: h(7.1),
    resizeMode: 'contain',
  },
  imgApple: {
    width: h(7),
    height: h(7.1),
    resizeMode: 'contain',
    borderRadius: w(10),
  },
  modelView: {
    backgroundColor: 'green',
    alignSelf: 'center',
    height: h(36),
    width: w(83),
    marginTop: h(20),
    borderRadius: w(10),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5
  },
  modelTxT: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
  },
  modelbuttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#fa8072',
    width: w(60),
    height: h(6),
    borderRadius: w(10),
    marginTop: h(4),
    justifyContent: 'center',
  },
  modelAndText: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '400',
  },
  ButtonJoined: {
    alignSelf: 'center',
    top: h(20),
    marginLeft: w(3)
  },
  txtJoined: {
    color: '#fa8072',
  },
  centeredView: {
   
    justifyContent: "center",
    alignItems: "center",
    marginVertical:180,
    // marginLeft:20,
    height:380,
    width:45,
    alignSelf:"center"
},
modalView: {
    // margin: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5
},
button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
},
buttonOpen: {
    backgroundColor: "#F194FF",
},
buttonClose: {
    backgroundColor: "#2196F3",
},
textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
},
modalText: {
    marginBottom: 15,
    textAlign: "center"
}
})