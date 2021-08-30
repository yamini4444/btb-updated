const initialState = {
    LoginRes: ""
  }
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_LOGIN_RESPONSE':
        return { ...state, LoginRes: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export default loginReducer;