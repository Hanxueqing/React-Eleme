import state from "./state"
import {GET_CITIES,SCROLL_FLAG} from "./const"
import {fromJS} from 'immutable'
const reducer = (prevState = fromJS(state),action)=> {
    switch (action.type) {
        case GET_CITIES:
            return prevState.set("cities",action.cities)
        case SCROLL_FLAG:
            return prevState.set("scrollFlag",action.scrollFlag)
        default:
            return prevState;
    }
}
export default reducer;