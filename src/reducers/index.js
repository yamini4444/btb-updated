import { combineReducers } from 'redux';
import LoginReducer from "./LoginReducer";
import CheckOfflineReducer from './CheckOfflineReducer';
import SignUpReducer from './SignUpReducer';
import BookingReducer from './BookingReducer';
import ListingReducer from './ListingReducer';

export default combineReducers({
    loginReducer: LoginReducer,
    checkOfflineFeature:CheckOfflineReducer,
    signUpReduscer:SignUpReducer,
    bookingReducer:BookingReducer,
    listingReducer:ListingReducer,
})