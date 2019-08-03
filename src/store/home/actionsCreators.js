import {Get} from "../../modules/axios-utils"
import {BTN_BANNER,RESTAURANTS,BACK_TOP} from "./const"
import { GET_NAV_INFO, GET_HOME_DETAIL, GET_SALE_DETAIL } from "./const"
export default {
    
    getBanners(callback){
        return dispatch => {
            Get({
                url:"/ele/index/banners"
            }).then(res => {
                let btnBanners = res.data.data.object_list;
                dispatch({type:BTN_BANNER,btnBanners})
                callback && callback()
            })
        }
    },

    getStore(callback){
        return dispatch => {
            Get({
                url:"/ele/index/home"
            }).then(res => {
                let restaurants = res.data.data.object_list
                dispatch({type:RESTAURANTS,restaurants})
                callback && callback()
            })
        }
    },
    BackTop(){
        let sTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(sTop > 300){
            return {type:BACK_TOP,backTop:true}
        }else{
            return {type:BACK_TOP,backTop:false}
        }
    },
    getNavs(callback) {
        return dispatch => {
            let HomeNavs = [{ id: 1, desc: "点餐", path: "/order" }, { id: 2, desc: "评价", component: Comment, path: "/comment" }, { id: 3, desc: "商家", path: "/business" }]
            dispatch({ type: GET_NAV_INFO, HomeNavs })
            callback && callback()
            // console.log(HomeNavs)
        }
    },
    getDetailInfo(callback) {
        return dispatch => {
            Get({
                url: "/ele/index/recom"
            }).then(res => {
                // console.log(res)
                let HomeDetailBanner = res.data.data.object_list;
                dispatch({ type: GET_HOME_DETAIL, HomeDetailBanner })
                callback && callback()
                // console.log(HomeDetailBanner)
            })
        }
    },
    getSale(callback) {
        return dispatch => {
            Get({
                url: "/react-ele/api/menu.json"
            }).then(res => {
                console.log(res.data)

                let SaleDetail = res.data.menu
                dispatch({ type: GET_SALE_DETAIL, SaleDetail })
                callback && callback()
            })
        }
    }
}
