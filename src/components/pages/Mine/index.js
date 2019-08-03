import React,{Component} from 'react'
import {Route} from "react-router-dom"
import Login from "./Login"
import User from "./User"
import "./index.scss"
import GroupState from "../../../modules/group"
class Mine extends Component{
    componentWillReceiveProps(nextProps) {
        if (nextProps.userInfo !== this.props.userInfo || nextProps.location.pathname === "/mine") {
            this.checkUserInfo(nextProps)
        }
    }
    componentDidMount() {
        this.checkUserInfo()
    }
    checkUserInfo(props) {//跳转的方法
        let { userInfo, history } = props || this.props;
        
        if (userInfo) { //说明用户已经登录了
            history.replace("/mine/user")
        } else {
            history.replace("/mine/login")
        }
    }
    render(){
        return (
            <div>
                <Route path = "/mine/login" component = {Login} />
                <Route path = "/mine/user" component = {User} />
            </div>
        )
    }
}
export default GroupState(Mine, {
    reducer: "mine",
    states: ["userInfo"]
})