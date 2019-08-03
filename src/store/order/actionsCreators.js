import { Get } from "../../modules/axios-utils"
import { GET_FOODS_INFO} from "./const"
export default {
    getFoodsInfo(){
        return dispatch => {
            Get({
                url: "/ele/order/order"
            }).then(res => {
                let foods = res.data.data.object_list;
                dispatch({ 
                    type: GET_FOODS_INFO, 
                    foods 
                })
            })
        }
    }
}