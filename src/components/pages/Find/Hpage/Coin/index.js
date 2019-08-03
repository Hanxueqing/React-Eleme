import React,{Component} from "react"
import "./index.scss"
import Specials from "../../Specials"
class Coin extends Component{
    render(){
        return(
            <div>
                <div className = "blank"></div>
                <Specials />
            </div>
        )
    }
}
export default Coin