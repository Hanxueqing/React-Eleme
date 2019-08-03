import React, { Component } from "react"
// import { CommonsGroup } from "../../../../modules/group"
import GroupState from "../../../../modules/group"
import { Toast} from 'antd-mobile';
class LoginUserForm extends Component {
    handleSubmit = (e) => {
        this.props.loginByUser({
            username: this.username.value,
            password: this.password.value,
            success: data => {
                Toast.success(data, 1);
            },
            fail: err => {
                Toast.fail(err,1,()=>{
                    this.code.value = ""
                    this.code.focus()
                })
            }
        })
        e.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                
                <div className="form-group">
                    <input ref={el => this.username = el} type="text" placeholder="用户名:123" />
                </div>
                <div className="form-group">
                    <input ref={el => this.password = el} type="text" placeholder="密码:456" />
                </div>
                <button type="submit" className="login">登录</button>
            </form>
        )
    }
}
// export default CommonsGroup(LoginUserForm);
export default GroupState(LoginUserForm, {
    reducer: "mine",
    states: ["userInfo"]
})