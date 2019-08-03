import React,{Component} from 'react'
import "./index.scss"
import Swiper from 'swiper'
class SetMeal extends Component{
    componentDidMount(){
        new Swiper(".home_info_banners",{
            autoplay:true,
            loop:true,
            pagination:{
                el:".swiper-pagination",
            }
        })
    }
    render(){
        return (
            <div className = "home_info_img">
                <div className = "home_info_setmeal">
                    <div className = "home_info_setmeal_title">
                        <h3>品质套餐</h3>
                        <p>搭配齐全吃得好</p>
                        <span>立即抢购></span>
                    </div>
                    <div className = "home_info_setmeal_img">
                        <img src="https://fuss10.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png" alt=""/>
                    </div>
                </div>
                <div className = "home_info_vip">
                    <div className = "home_info_vip_title">
                        <img src="https://fuss10.elemecdn.com/8/0e/4dd212d831becab6e3ebd484c0941jpeg.jpeg" alt=""/>
                        <span>超级会员</span>
                        <span>·每月领9元红包</span>
                    </div>
                    <div className = "home_info_vip_door">
                        <p>立即开通 ></p>
                    </div>
                </div>
                <div className="home_info_banners swiper-container">
                    <div className="swiper-wrapper">
                        <div className = "swiper-slide">
                            <p>
                                <img width="100%" src="https://fuss10.elemecdn.com/7/05/bb01f6e34c18a0e12d39b7c98e6f6jpeg.jpeg" alt=""/>
                            </p>
                        </div>
                        <div className="swiper-slide">
                            <p>
                                <img width="100%" src="https://fuss10.elemecdn.com/5/e6/955bdd098effd615d144441084118jpeg.jpeg" alt=""/>
                            </p>
                        </div>
                        <div className="swiper-slide">
                            <p>
                                <img width="100%" src="https://fuss10.elemecdn.com/0/ff/edc9f276114b06237b7b50c21e505jpeg.jpeg" alt=""/>
                            </p>
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className="getAptitude"><p>资质证照</p></div>
                </div>
            </div>
        )
    }
}
export default SetMeal