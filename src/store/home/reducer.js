import {GET_NAV_INFO,GET_HOME_DETAIL,GET_SALE_DETAIL} from "./const"
import { BTN_BANNER, RESTAURANTS, BACK_TOP } from "./const"
import state from "./state"
import {fromJS} from "immutable"
const reducer = (prevState=fromJS(state),action)=>{
    switch(action.type){
        case GET_NAV_INFO:
            return prevState.set("HomeNavs",action.HomeNavs)
        case GET_HOME_DETAIL:
            return prevState.set("HomeDetailBanner",action.HomeDetailBanner)
        case GET_SALE_DETAIL:
            return prevState.set("SaleDetail",action.SaleDetail) 
        case BTN_BANNER:
            return prevState.set("btnBanners", action.btnBanners)
        case RESTAURANTS:
            return prevState.set("restaurants", action.restaurants)
        case BACK_TOP:
            return prevState.set("backTop", action.backTop)
        default:
            return prevState
    }
}
export default reducer
