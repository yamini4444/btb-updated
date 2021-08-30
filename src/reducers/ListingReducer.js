const initialState = {
    ListingRes:""
}

const listingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_LISTING_RESPONSE':{
            console.log('Listing Response',action.payload);
            return { ...state, ListingRes: action.payload.response, loading: false};
        }
        default:{
            return state;
        }
    }
};

export default listingReducer;