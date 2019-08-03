import React,{Component} from 'react'
import "./index.scss"
import Foods from "./Foods"
class Order extends Component{
    render(){
        return (
            <div>
                <div className = "picBox">
                    <img src="https://fuss10.elemecdn.com/8/c8/bbe5984003cb26fc7b445a4a15195png.png" alt="" />
                </div>
                <Foods />
            </div>
        )
    }
}
export default Order