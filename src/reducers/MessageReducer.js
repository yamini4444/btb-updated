const initialState = {
    MessageRes: "",
    ConversationRes:"",
   
  }
  
  const messageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_MESSAGES_LIST':{
        console.log('message list rseponse',action.payload);
        return { ...state, MessageRes: action.payload.response, loading: false };
      }
      case 'SHOW_CONVERSATION':{
        return { ...state, ConversationRes: action.payload.response, loading: false};
      }
      
      default:{
        return state;
      }
    }
  };
  
  export default messageReducer;