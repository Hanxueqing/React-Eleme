import state from "./state"
import { fromJS } from "immutable"
import { CHANGE_ACTIVE_ITEM, ADD_HOME_SPECIALS, HASMORE, GET_LIST_INFO, GET_HOME_DETAIL, GET_BANNER_DETAIL } from "./const"
const reducer = (prevState = fromJS(state),action)=> {
    switch (action.type) {
        case CHANGE_ACTIVE_ITEM:
            return prevState.set("activeItem", action.activeItem)
        case GET_LIST_INFO:
            return prevState.set("specials", action.specials)
        case ADD_HOME_SPECIALS:
            return prevState.merge({
                specials: prevState.get("specials").concat(action.specials),
                specialPage: action.specialPage
            })
        case HASMORE:
            return prevState.set("hasMore", action.hasMore)
        case GET_HOME_DETAIL:
            return prevState.set("goodDetail", action.goodDetail)
        case GET_BANNER_DETAIL:
            return prevState.set("banners", action.banners)
        default:
            return prevState;
    }
}
export default reducer;