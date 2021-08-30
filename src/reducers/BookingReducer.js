const initialState = {
    BookingRes: ""
  }
  
  const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_BOOKING_RESPONSE':{
        console.log('booking rseponse',action.payload);
        return { ...state, BookingRes: action.payload.response, loading: false };
      }
      default:{
        return state;
      }
    }
  };
  
  export default bookingReducer;