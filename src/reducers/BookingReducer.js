const initialState = {
    BookingRes: "",
    ApprovedRes:"",
    SingleBookingRes:"",
  }
  
  const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_BOOKING_RESPONSE':{
        console.log('booking rseponse',action.payload);
        return { ...state, BookingRes: action.payload.response, loading: false };
      }
      case 'SHOW_APPROVED_RESPONSE':{
        console.log('aprroved rseponse',action.payload);
        return { ...state, ApprovedRes: action.payload.response, loading: false };
      }
      case 'SHOW_SINGLE_BOOKING':{
        console.log('single booking rseponse',action.payload);
        return { ...state, SingleBookingRes: action.payload.response, loading: false };
      }
      default:{
        return state;
      }
    }
  };
  
  export default bookingReducer;