import state from "./state"
import {fromJS} from "immutable"
import {GET_DINNER_NAV,GET_DINNER_RES,ADD_DINNER_RES,HASMORE,SCROLL_BACK_TOP} from "./const"
const reducer = (prevState = fromJS(state),action)=>{
    switch (action.type) {
        case GET_DINNER_NAV:
            return prevState.set("navs",action.navs)
        case GET_DINNER_RES:
            return prevState.set("dinnerRes",action.dinnerRes)
        case ADD_DINNER_RES:
            return prevState.set("dinnerRes",prevState.get("dinnerRes").concat(action.dinnerRes)).set("ResPageAdd",action.ResPageAdd)
        case HASMORE:
            return prevState.set("hasMore",action.hasMore)
        case SCROLL_BACK_TOP:
            return prevState.set("scrollBackTop",action.scrollBackTop)
            default:
            return prevState;
    }
   
}
export default reducer;