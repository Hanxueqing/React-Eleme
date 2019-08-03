import {Get} from "../../modules/axios-utils"
import {
    GET_DINNER_NAV,
    GET_DINNER_RES,
    ADD_DINNER_RES,
    HASMORE,
    SCROLL_BACK_TOP,
} from "./const"

export default {
    getNavs(callback){
        return dispatch=>{
            Get({
                url:"/ele/dinner/bar"
            }).then(res=>{
                let navs = res.data.data.object_list;
                dispatch({type:GET_DINNER_NAV,navs})
                callback && callback()
            })
        }
    },
    getDinnerRes(callback){
        return dispatch=>{
            Get({
                url:"/ele/dinner/reslist",
            }).then(res=>{
                let dinnerRes = res.data.data.object_list;
                let dinnerRes_list = [];
                dinnerRes.forEach(item=>{
                    dinnerRes_list = dinnerRes_list.concat(item.restaurant)
                })
                // console.log(dinnerRes_list)
                dispatch({ type: GET_DINNER_RES , dinnerRes ,dinnerRes_list})
                callback && callback()
            })
        }
    },
    addDinnerRes(ResPageAdd){
        return dispatch=>{
            Get({
                url:"/ele/dinner/resList",
                data:{
                    page: ++ResPageAdd,
                    limit:3
                }
            }).then(res=>{
                let total = res.data.data.total;
                // console.log(total)
                if(ResPageAdd*3 >= total){
                    dispatch ({ type: HASMORE,hasMore:false})
                    return false
                }
                let dinnerRes = res.data.data.object_list;
                let dinnerRes_list = [];
                dinnerRes.forEach(item=>{
                    dinnerRes_list = dinnerRes_list.concat(item.restaurant)
                })
                dispatch({ type: ADD_DINNER_RES , dinnerRes,dinnerRes_list,ResPageAdd })
            })
        }
    },
    changeBackTop(e){
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(scrollTop > 200){
                return { type :SCROLL_BACK_TOP , scrollBackTop:true }
            }else{
                return { type :SCROLL_BACK_TOP , scrollBackTop:false }
            }
    }
}