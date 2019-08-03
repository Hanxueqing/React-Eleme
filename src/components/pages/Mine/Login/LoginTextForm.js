import React,{Component} from "react"
// import{CommonsGroup} from "../../../../modules/group"
import  GroupState  from "../../../../modules/group"
import { Toast } from 'antd-mobile';
class LoginTextForm extends Component{
    handleSubmit = (e) => {
        this.props.loginByText({
            phone:this.phone.value,
            code:this.code.value,
            success: data => {
                Toast.success(data, 1);
            },
            fail: err => {
                Toast.fail(err, 1, () => {
                    this.code.value = ""
                    this.code.focus()
                })
            }
        })
        e.preventDefault();
    }
    render(){
        return(
            <form onSubmit = {this.handleSubmit}>
                
                <div className = "form-group">
                    <input ref = {el => this.phone = el} type = "text" placeholder = "手机号:110"/>
                </div>
                <div className="form-group">
                    <input ref={el => this.code = el} type="text" placeholder="验证码:456" />
                </div>
                <button type = "submit" className = "login">登录</button>
            </form>
        )
    }
}
// export default CommonsGroup(LoginTextForm);
export default GroupState(LoginTextForm, {
    reducer: "mine",
    states: ["userInfo"]
})