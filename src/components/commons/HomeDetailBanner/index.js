import React,{Component} from 'react'
import "./index.scss"
import GroupState from "../../../modules/group"
import Swiper from "swiper"
class HomeDetailBanner extends Component{
    
    componentDidMount(){
        let {HomeDetailBanner} = this.props
       
        if(HomeDetailBanner){
            // console.log("1")
            this.initSwiper()
            return false 
            
        }
         this.props.getDetailInfo(()=>{
            this.initSwiper()
        })
    }
  
    initSwiper(){
        new Swiper(".detail-banners",{
            // slidePerViews: 3,
            spaceBetween:10,
            // loop:true
        })
    }
    renderSlide(){
        let {HomeDetailBanner} = this.props
        // console.log(HomeDetailBanner)
        if(!HomeDetailBanner) return""
        return HomeDetailBanner.map(item=>{
            return (
                <div className="swiper-slide food-item" key={item.item_id}>
                    <img className="food-img" src={item.image_path} alt=""/>
                    <p className="food-card">{item.name}</p>
                    <p className="food-card-desc">{item.tips}</p>
                    <div className="food-sale">
                        <p className="food-price">￥{item.specfoods[0].price}</p>
                        <span className="btn">+</span>
                    </div>
                </div>
            )
        })
    }
    //在这个钩子函数里面只需要出现关于banners数据的判断即可
    // shouldComponentUpdate(nextProps, nextState) {
    //     if(props.DetailBanners !== this.props.DetailBanners){
    //         return true
    //     }
    //     return false
    // }
    render(){
        // console.log("HomeDetailBanner",this.props.HomeDetailBanner)
        return (
            <div>
                <div className="title">
                    <div className="detail-banners swiper-container">
                        <div className="swiper-wrapper food-box">
                            {this.renderSlide()}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default GroupState(HomeDetailBanner,{
    reducer:"home",
    states:["HomeDetailBanner"]
})