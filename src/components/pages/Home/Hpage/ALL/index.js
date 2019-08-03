import React,{Component} from 'react'
import "./index.scss"
import DinnerChoose from "../../dinnerChoose"
import DinnerList from "../../dinnerResList"
import Dinner from "../../dinner"
class All extends Component{
    render(){
        return (
            <div className="all">
                <Dinner></Dinner>
                <DinnerChoose></DinnerChoose>
                <DinnerList></DinnerList>
            </div>
        )
    }
}
export default All