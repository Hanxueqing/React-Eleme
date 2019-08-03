import React,{Component} from 'react'
import "./index.scss"
import GroupState from "../../../../../../../modules/group"
import Swiper from "swiper"
import {withRouter,NavLink} from "react-router-dom"
class SaleDetail extends Component{
    
    componentDidMount(){       
        // this.renderInfo()
        // console.log(1)
        let {SaleDetail} = this.props   
        if(SaleDetail){
            this.initSaleSwiper()
            return false 
        }
        // let {SaleDetail} = this.props
        this.props.getSale(()=>{
            this.initSaleSwiper()
            // console.log("SaleDetail",SaleDetail)
        })
           
    }
  
    initSaleSwiper(){
        new Swiper(".menu-detail",{
            // pagination:{
            //     el:'.swiper-pagination'
            // },
            direction: 'vertical',
            slidesPerView: 5,
            paginationClickable: true,
            spaceBetween: 10,
            mousewheelControl: true,
            // renderBullet: function (index, className) {
            //     let arr = this.renderInfo()
            //     return '<div className="left>'+'<div className="sale-left">'+
            //              '<span>'+arr[index]+'</span>'+
            //             '</div>' +'</div>' ;
            // }
        })
    }
    renderInfo(){
        let {SaleDetail} = this.props     
        // console.log("Menu22323",SaleDetail)
        // let arr=[]
        if(!SaleDetail) return""
        return SaleDetail.map(item=>{
            return (
                <div key={item.id}>
                    <a onClick={() => this.scrollToAnchor(item.id)}><span>{item.name}</span></a>
                </div>   
            )
            
        })
       
        // console.log("arr",arr)
    }
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if(anchorElement) { anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'}); }
        }
      }
    
    renderSaleSlide(){
        let {SaleDetail} = this.props
        // console.log(SaleDetail)
        if(!SaleDetail) return""
        return SaleDetail.map((item,index)=>{
            return (
            <div  key={item.id} className="menu-box-detail">
                
                <div className="menu-top">
                    <div id={item.id} className="top-title">
                        {item.name}
                    </div>
                    <span>{item.description}</span>
                </div>
                <div className="menu-box">
                    {
                        item.foods.map((element,index)=>{
                            return(
                                <div key={index}className="menu-detail" >
                                    <div className="menu-detail-box">
                                        <div className="menu-item" key={index}>
                                            <div className="img-box">
                                                <img className="sale-img" src="./u=1275900944,311098575&fm=26&gp=0.jpg"  alt=""/>
                                            </div>
                                            <section>
                                                <p className="fooddetail-info">
                                                    <span>{element.name}</span>
                                                </p>
                                                <p className="fooddetail-sale">
                                                    <span>月售{element.month_sales}份</span>
                                                    <span>好评率100%</span>
                                                </p>
                                                <div className="fooddetails-space">
                                                </div>
                                                <span className="sale_price">
                                                    <span>￥{element.lowest_price}</span>
                                                </span>
                                                <div className="food-btn">
                                                    <span>
                                                    +
                                                    </span>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>   
                            )
                            
                    })   
                }    
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
       
        return (
            <div className="sale-box">
                <div className="sale-main">
                    <div className="sale-left">
                        <ul>
                            {this.renderInfo()}
                        </ul>
                    </div>
                    <div className="sale-detail-box">
                        <div className="sale-detail">
                            {this.renderSaleSlide()}
                        </div>
                    </div>         
                </div>  
                <footer>
                    <div className="footer-top">
                    <section>
                        <span>满22减8元，满40减14元，满50减20元</span>
                    </section>
                    </div>
                    <div className="footer-box">
                        <div className="footer-text">
                            <p><span>未选购商品</span></p>
                            <p>另需配送费2.5元</p>
                        </div>
                        
                        <a href=""><span class="detail-send">￥20起送</span></a>
                    </div>  
                </footer>
                
            </div>
        )
    }
}
export default withRouter(GroupState(SaleDetail,{
    reducer:"home",
    states:["SaleDetail"]
}))