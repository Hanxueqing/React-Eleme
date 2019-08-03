import React,{Component} from 'react'
import "./index.scss"
// import HomeDetailBanner from "../HomeDetailBanner"
import GroupState from "../../../modules/group"
import Swiper from "swiper"
import {NavLink} from "react-router-dom"
// import {connect} from "react-redux"
class HomeDetailNav extends Component{
    // constructor(){
    //     super()
    //     this.state = {
    //         activeIndex:0
    //     }
    // }
    componentDidMount(){
        this.initSwiper()
        let {HomeNavs} = this.props;
        if(HomeNavs){
            this.initSwiper() 
            return false
        }
        // if(!HomeNavs){
        //     this.props.getNavs(()=>{
        //         this.initSwiper()
        //     })
        // }
        this.props.getNavs(()=>{
            this.initSwiper()
        })
    }
    initSwiper(){
        new Swiper(".navbar",{
            slidePreView:"auto"
        })
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if(props.HomeNavs !== this.props.HomeNavs){
    //         // return true
    //     }
    //     return false
    // }
    renderSlide(){
        let {HomeNavs} = this.props;
        // console.log(HomeNavs)
        if(!HomeNavs) return ""
        // let {activeIndex} = this.state;
        return HomeNavs.map((item,index)=>{
            return (
                <NavLink 
                index={index}
                to={"/homedetail"+item.path} 
                    key={item.id} className="nav-item swiper-slide">{item.desc}</NavLink>
                
            )
        })
    }

    render(){
        return (
            <div>
                <div className="navbar swiper-container">
                    <div className="nav-box swiper-wrapper">
                        {this.renderSlide()}
                    </div>
                </div>
                {/* <HomeDetailBanner></HomeDetailBanner> */}
            </div>
        )
    }
}
export default GroupState(HomeDetailNav,{
    reducer:'home',
    states:['HomeNavs']
})