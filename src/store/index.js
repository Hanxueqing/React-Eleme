import { createStore, applyMiddleware } from "redux"
import reducer from "./reducer"
import thunk from "redux-thunk" //这个中间件 action=》到达reducer之间的过程 内部函数可以实现异步的操作，所以说增强了dispatch的功能
const store = createStore(reducer, applyMiddleware(thunk));//在项目actionCreators里面可以进行异步请求了
export default store;