import React,{Component} from 'react'
import "./index.scss"
import GroupState from "../../../../modules/group"
import Swiper from "swiper"
class Banner extends Component{
    componentDidMount() {
        //为了防止重复请求banners数据
        let { banners } = this.props;
        // console.log("我执行了")
        // console.log(banners)
        if (banners) {
            //重新执行实例化，不然banner划不动
            // console.log("我执行了")
            this.initSwiper()
            return false
        }
        this.props.getBannerInfo(() => {
            this.initSwiper()
        })
    }
    // componentWillReceiveProps(){
    //     this.props.getBannerInfo()
    //     this.initSwiper()
    //     // console.log("222")
    //     let { banners } = this.props;
    //     console.log(banners)
    // }
    initSwiper() {
        new Swiper(".home-banner", {
            loop: true,
            pagination: {
                el: ".swiper-pagination"
            }
        })
        // console.log("实例化")
    }
    renderSlide() {
        let banners = this.props.banners;
        if (!banners) return ""
        
        return banners.map((item, index) => {
            return (
                <div key={index} className="swiper-slide find-slide">
                    <img width="100%" src={item.src} alt="" />
                </div>
            )
        })
    }
    render(){
        return (
            <div className= "home-banner swiper-container">
                <div className="swiper-wrapper find-wrapper">
                    {this.renderSlide()}
                </div>
                <div className="swiper-pagination"></div>
            </div>
        )
    }
}
export default GroupState(Banner, {
    reducer: "find",
    states: ["banners"]
});