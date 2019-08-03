import React,{Component} from "react"
import "./index.scss"
import Specials from "../../Specials"
import Banner from "../../Banner"
class Record extends Component{
    render(){
        return(
            <div>
                <Banner />
                
                <Specials />
            </div>
        )
    }
}
export default Record