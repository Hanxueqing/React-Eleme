// import commonsActionCreators from '../../store/find/actionsCreators'
import findActionCreators from '../../store/find/actionsCreators'
import mineActionCreators from '../../store/mine/actionsCreators'
import orderActionCreators from '../../store/order/actionsCreators'
import commonsActionCreators from '../../store/commons/actionsCreators'
import homeActionCreators from '../../store/home/actionsCreators'
import dinnerActionCreators from "../../store/dinner/actionsCreators"
export default {
    commons:commonsActionCreators,
    find:findActionCreators,
    mine:mineActionCreators,
    order:orderActionCreators,
    home: homeActionCreators,
    dinner:dinnerActionCreators
}