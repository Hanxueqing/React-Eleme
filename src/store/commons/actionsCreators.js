import {Get} from "../../modules/axios-utils"
import {GET_CITIES,SCROLL_FLAG} from "./const"
export default {
    
    getCities(callback){
        return dispatch => {
            Get({
                url:"/ele/index/cities",
                data:{
                    limit:1130
                }
            }).then(res => {
                let cities = res.data.data.object_list;
                dispatch({type:GET_CITIES,cities})
                callback && callback()
            })
        }
    },
    setScrollFlag(){
        let sTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(sTop > 1){
            return {type:SCROLL_FLAG,scrollFlag:true}
        }else{
            return {type:SCROLL_FLAG,scrollFlag:false}
        }
    }
}