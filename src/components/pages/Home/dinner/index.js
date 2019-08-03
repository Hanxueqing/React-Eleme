import React,{Component} from 'react'
import "./index.scss"
import Swiper from "swiper"
import GroupState from "../../../../modules/group"
// import {NavLink} from "react-router-dom"
import {withRouter} from "react-router-dom"
class Dinner extends Component{
    constructor(){
        super()
        this.state= {
            activeIndex :0
        }
    }
    componentDidMount(){
        //在redux中判断navs是否存在，存在就不需要发送请求了
        let {navs} = this.props;
        if(navs){
            this.initSwiper()//实例化swiper
            return false
        }
        //请求数据 更改navs
        this.props.getNavs(()=>{
            this.initSwiper()//实例化swiper
        })
    }
    //实例化swiper
    initSwiper(){
        new Swiper(".dinnernav",{
            slidesPerView:"auto"//让导航条均分
        })
    }
    componentWillReceiveProps(props){
        let pathname = props.location.pathname//拿到地址中路径
        let index = 0;
        switch (pathname) {
                case "/eleme/all":
                    index = 0
                break;
                case "/eleme/rice" :
                    index = 1
                    break;
            default:
                break;
        }
        //更改状态
        this.setState({
                activeIndex:index
            })
    }
    handleClick= (e) =>{
        let index =  e.target.getAttribute("index");//记录一下我们的下标
        let {replace} = this.props.history;
        switch (index) {
            case "0":
                replace("/eleme/all")
                break;
            case "1":
                replace("/eleme/rice")
                break;
            default:
                break;
        }
        //更改状态
        // this.setState({
        //     activeIndex:index*1
        // })
    }
    renderDinnerbar(){
        let navs  = this.props.navs;
        let {activeIndex} = this.state;
        if(!navs) return ""
        return navs.map((item,index)=>{
            return (
                <div 
                    index={index} 
                    onClick={this.handleClick} 
                    key={item.id} 
                    className={"swiper-slide " + (activeIndex===index?'active':'') }>
                    {item.name}
                </div>
            )
        })
    }
    render(){
        return (
            <div className="dinnernav swiper-container">
                <div className="swiper-wrapper">
                    {this.renderDinnerbar()}
                </div>
            </div>
        )
    }
}
export default withRouter(GroupState(Dinner,{
    reducer:"dinner",
    states:["navs"]
}))