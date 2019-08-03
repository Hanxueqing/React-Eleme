import React,{Component} from 'react'
import "./index.scss"
import Swiper from 'swiper'
import GroupState from '../../../../modules/group'
import { NavLink } from 'react-router-dom'

class Banners extends Component{
    componentDidMount(){

        let {btnBanners} = this.props
        if(btnBanners){
            this.initSwiper()
            return false
        }

        this.props.getBanners((callback)=>{
            this.initSwiper()
        })
    }
    initSwiper(){
        new Swiper(".btn_banners",{
            loop:true,
            pagination:{
                el:".swiper-pagination",
            }
        })
    }

    renderBtnBannerspage1(){
        let btnBanners = this.props.btnBanners;
        if(!btnBanners) return ""
        return btnBanners.map(item => {
            if(item.id > 10) return ""
            return (
                
                <NavLink to= "/eleme/all" 
                    className = "swiper-item"
                    key = {item.id}
                >
                    <a href="">
                        <p><img src={item.img} alt=""/></p>
                        <span>{item.title}</span>
                    </a>
                </NavLink>
            )
        })
    }
    renderBtnBannerspage2(){
        let btnBanners = this.props.btnBanners;
        if(!btnBanners) return ""
        return btnBanners.map(item => {
            if(item.id <= 10) return ""
            return (
                <div 
                    className = "swiper-item"
                    key = {item.id}
                >
                    <a href="">
                        <p><img src={item.img} alt=""/></p>
                        <span>{item.title}</span>
                    </a>
                </div>
            )
        })
    }
    render(){
        return (
            <div className="btn_banners swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        {this.renderBtnBannerspage1()}
                    </div>
                    <div className="swiper-slide">
                        {this.renderBtnBannerspage2()}
                    </div>
                </div>
                <div className="swiper-pagination"></div>
            </div>
        )
    }
}
export default GroupState(Banners,{
    reducer:"home",
    states:["btnBanners"]
})