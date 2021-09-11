const initialState = {
    ListingRes:"",
    SingleListingRes:"",
    publishListRes:"",
}

const listingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_LISTING_RESPONSE':{
            return { ...state, ListingRes: action.payload.response, loading: false};
        }
        case 'SHOW_SINGLE_LISTING':{
            console.log('single listing rseponse',action.payload);
            return { ...state, SingleListingRes: action.payload.response, loading: false };
          }
        case 'PUBLISH_LISTING_RES':{
            console.log('publish listing rseponse',action.payload);
            return { ...state, publishListRes: action.payload.response, loading: false };
          }  
        default:{
            return state;
        }
    }
};

export default listingReducer;