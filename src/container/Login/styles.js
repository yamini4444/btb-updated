import { StyleSheet } from 'react-native';
import { h, w } from '../../utils/Dimensions';

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
    fontSize: 24,
    fontWeight: 'bold',
    top: h(5),
    color: '#000'
  },
  txt1: {
    alignSelf: 'center',
    fontSize: 14,
    top: h(6),
    color: '#000'
  },
  Otpcontainer: {
  },
  passwordBox:{
    flexDirection: 'row',
    alignSelf: 'center',
    fontSize: 10,
    fontWeight:'bold',
     borderColor: '#F2F2F2',
    borderWidth: w(0.28),
    width: w(75),
    height: h(7),
    borderRadius:10,
    justifyContent:'space-between',

    padding: w(5),
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
  inputHead:{
    textAlign: 'left',
    fontSize: 10,
    color: '#828282',
    paddingHorizontal:h(6.5),
    marginBottom:h(1)  
    
  },
  inputFieldContainer: {
    alignSelf: 'center',
    fontSize: 10,
    fontWeight:'bold',
     borderColor: '#F2F2F2',
    borderWidth: w(0.28),
    width: w(75),
    height: h(7),
    borderRadius:10,
    marginBottom:h(3),
    padding: w(5),

  },
  inputFieldContainer2: {
     alignSelf: 'center',
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
    marginTop: h(4),
    alignSelf: 'center',
  },
  showRemember:{
    height: 12,
    width: 12,
    color:'#25B5A4',
    
    tintColor:'#25B5A4',
    justifyContent: 'center',
    alignItems: 'center',
    top: h(0.2),
  },
  notShowRemember:{
    height: 14, 
    width: 14, 
    resizeMode: 'contain',
    tintColor:'#fff',
    backgroundColor:'#25B5A4',
    
  },
  rememberTxt:{
    color: '#000',
    marginLeft: w(4),
    fontSize: 12,
    fontWeight:'bold',
  
  },
  forgotButton: {
    color: '#25B5A4', 
    fontSize: 12,
    marginLeft: w(16),
    fontWeight:'bold',
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#25B5A4',
    width: w(75),
    height: h(7),
    borderRadius:10,
    top: h(7),
    justifyContent: 'center',
    alignItems: 'center'
  },
  AndText: {
    fontSize: 12,
    fontWeight: 'bold',
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
    borderRadius: 15,
    borderColor:'#f2f2f2',
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: w(5),
    zIndex: 999, // works on ios
    elevation: 999, // works on android
  },
  gmailView:{
    height: h(6),
    width: h(6),
    borderRadius: 15,
    borderColor:'#f2f2f2',
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center', 
    zIndex: 999, // works on ios
    elevation: 999, // works on android
    
  },
  innerTxt:{
    width: h(2.8),
    height: h(2.8),
    resizeMode: 'contain',
    // tintColor:'red'
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
    backgroundColor: '#000',
    alignSelf: 'center',
    height: h(36),
    width: w(83),
    marginTop: h(20),
    borderRadius: w(10),
    justifyContent: 'center',
    alignItems: 'center',
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
})