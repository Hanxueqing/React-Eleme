import state from "./state"
import { fromJS } from "immutable"
import { CHECK_USER_INFO } from "./const"
const reducer = (prevState = fromJS(state), action) => {
    switch (action.type) {
        case CHECK_USER_INFO:
            return prevState.set("userInfo",action.userInfo)
        default:
            return prevState;
    }
}
export default reducer;