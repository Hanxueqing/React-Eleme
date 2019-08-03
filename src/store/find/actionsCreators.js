import { Get } from "../../modules/axios-utils"
import { CHANGE_ACTIVE_ITEM, ADD_HOME_SPECIALS, HASMORE, GET_LIST_INFO, GET_HOME_DETAIL, GET_BANNER_DETAIL } from "./const"
export default{
    changeActiveItem(activeItem) { //更改选项卡
        return {
            type: CHANGE_ACTIVE_ITEM,
            activeItem
        }
    },
    getListInfo() {//获取列表数据
        return dispatch => {
            Get({
                url: "/react-ele/api/goods.json"
            }).then(res => {
                // console.log(res.data.Goods)
                //获取specials数据
                let object_list = res.data.Goods;
                let specials = []
                object_list.forEach(item => {
                    specials = specials.concat(item) //concat方法不会改变原数组，所以需要重新赋值
                })
                dispatch({
                    type: GET_LIST_INFO,
                    specials
                })
            })
        }
    },
    getGoodDetail(goodId) {
        return dispatch => {
            Get({
                url: "/react-ele/api/goods.json"
            }).then(res => {
                let goodDetail = res.data.Goods[goodId];
                // console.log(goodDetail)
                dispatch({ type: GET_HOME_DETAIL, goodDetail })
            })
        }
    },
    addHomeSpecials(specialPage) {
        return dispatch => {
            Get({
                url: "/react-ele/api/goods.json",
                data: {
                    page: ++specialPage
                }
            }).then(res => {
                //数据判断
                let total = res.data.total;
                if (specialPage * 8 >= total) {
                    dispatch({ 
                        type: HASMORE, 
                        hasMore: false 
                    })
                    return false;
                }

                //获取specials数据
                let object_list = res.data.Goods;
                let specials = [];
                object_list.forEach(item => {
                    specials = specials.concat(item)
                })
                // console.log(object_list)
                dispatch({
                    type: ADD_HOME_SPECIALS,
                    specials,
                    specialPage
                })
            })
        }
    },
    getBannerInfo(callback) {//获取列表数据
        return dispatch => {
            Get({
                url: "/react-ele/api/banners.json"
            }).then(res => {
                // console.log(res.data.Banners)
                //获取specials数据
                let banners = res.data.Banners;
                // console.log(banners)
                dispatch({
                    type: GET_BANNER_DETAIL,
                    banners
                })
                callback && callback()
            })
        }
    }
}