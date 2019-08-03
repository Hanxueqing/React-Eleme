import React,{Component} from 'react'
import "./index.scss"
import { Route } from "react-router-dom"
import NavBar from "./NavBar"
import Record from "./Hpage/Record"
import Coin from "./Hpage/Coin"
class Find extends Component{
    render(){
        return (
            <div className = "find">
                <div className = "top">
                    <NavBar></NavBar>
                </div>
                <Route path="/find/coin" component={Coin} />
                <Route path="/find/record" component={Record} />
            </div>
            
            
        )
    }
}
export default Find