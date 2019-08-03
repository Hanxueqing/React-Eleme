import state from "./state"
import { fromJS } from "immutable"
import { GET_FOODS_INFO } from "./const"
const reducer = (prevState = fromJS(state), action) => {
    switch (action.type) {
        case GET_FOODS_INFO:
            return prevState.set("foods", action.foods)
        default:
            return prevState;
    }
}
export default reducer;