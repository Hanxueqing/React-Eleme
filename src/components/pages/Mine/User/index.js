import React,{Component} from 'react'
import "./index.scss"
import GroupState from "../../../../modules/group"
class User extends Component{
    constructor() {
        super()
        this.exit = this.exit.bind(this)
    }
    exit() {
        this.props.exit();
    }
    render(){
        // console.log(this.props)
        return (
            <div>
                <section>
                    <div className="message">
                        <div className = "imageBox">
                            <img src="https://fuss10.elemecdn.com/d/ab/7e82a74cc17724ff2700282d3a58cjpeg.jpeg?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/" alt="" />
                        </div>
                        <div className="name">
                            <p className='name_title'>
                                {this.props.userInfo && this.props.userInfo.username}
                            </p>
                            <p className='name_phone'>
                                <i className="fa fa-phone"></i>
                                186****1234
                            </p>
                        </div>
                    </div>
                </section>
                <div className = "middle">
                    <div className = "middle_left middle_content">
                        <p className = "spanBox">
                            <span className = "redBag">0</span>
                            <span>个</span>
                        </p>
                        <p>红包</p>
                    </div>
                    <div className="middle_right middle_content">
                        <p className="spanBox">
                            <span className="number">412</span>
                            <span>个</span>
                        </p>
                        <p>金币</p>
                    </div>
                </div>
                <section className = "linkList">
                    <div className = "linkBox">
                        <i className="fa fa-map-marker" style={{ color: "#00a0ff" }}></i>
                        <div className="link-title">
                            我的地址
                        </div>
                    </div>
                </section>
                <section className = "linkList">
                    <div className="linkBox">
                        <i className="fa fa-shopping-bag" style={{ color: "rgb(106, 194, 11)" }}></i>
                        <div className="link-title" >
                            金币商城
                        <span className="arrow">
                                <i className="fa fa-arrow" tyle={{ color: "#fc7b53" }}></i>
                            </span>
                        </div>
                    </div>
                    <div className="linkBox">
                        <i className="fa fa-gift" style={{ color: "#00a0ff" }}></i>
                        <div className="link-title" >
                            分享拿20元现金
                        <span className="arrow">
                                <i className="fa fa-arrow"></i>
                            </span>
                        </div>
                    </div>
                </section>
                <section className = "linkList">
                    <div className="linkBox">
                        <i className="fa fa-microphone" style={{ color: "#00a0ff" }}></i>
                        <div className="link-title">
                            我的客服
                        <span className="arrow">
                                <i className="fa fa-arrow"></i>
                            </span>
                        </div>
                    </div>
                    <div className="linkBox">
                        <i className="fa fa-download" style={{ color: "#00a0ff" }}></i>
                        <div className="link-title">
                            下载饿了么APP
                        <span className="arrow">
                                <i className="fa fa-arrow"></i>
                            </span>
                        </div>
                    </div>
                    <div className="linkBox">
                        <i className="fa fa-file-text" style={{ color:"#00a0ff"}}></i>
                        <div className="link-title">
                            规则中心
                        <span className="arrow">
                                <i className="fa fa-arrow"></i>
                            </span>
                        </div>
                    </div>
                </section>
                <div className = "exit">
                    <p><button onClick={this.exit}>退出</button></p>
                </div>
            </div>
        )
    }
}
export default GroupState(User, {
    reducer: "mine",
    states: ["userInfo"]
})