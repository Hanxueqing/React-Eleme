import React,{Component} from 'react'
import "./index.scss"
import GroupState from "../../../../modules/group"

class DinnerList extends Component{
    componentDidMount(){
        //我们发现了一个问题，组件切换的时候，数据还会重新加载
        let {dinnerRes} = this.props;
        if(!dinnerRes){//当数据存在的时候我们就阻止数据加载
            this.props.getDinnerRes()
            return false
        }
       this.initEvent()
    }
    componentWillUnmount(){
        //在组件销毁的时候让监听滚动事件消失
        window.removeEventListener("scroll",this.props.changeBackTop)
    }
    componentWillReceiveProps(){
       this.initEvent()
    }
    initEvent(){
        window.addEventListener("scroll",this.props.changeBackTop)
    }
    renderRestaurant(){
        let {dinnerRes,hasMore} = this.props;
        if(!dinnerRes) return ""//如果数据不存在，我们就 return false
        return (
            <div>
                {
                    dinnerRes.map(item=>{
                        return (
                            <div key={item.restaurant.activities[0].id} className="dinner_outBox">
                                <div className="dinner_outBox_">
                                    <div className="dinner_insideBox-top">
                                        <div className="dinner_imgLeft"><img src="https://fuss10.elemecdn.com/e/f5/0a17a7cd8d400ff7e6a5006b344e0jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt=""/></div>
                                        <div className="dinner_content">
                                            <div className="dinner_restaurant">{item.restaurant.name}</div>
                                            <div className="dinner_sell">
                                                <span>{item.restaurant.rating}</span>
                                                <span>月售{item.restaurant.rating_count}</span>
                                            </div>
                                            <div className="dinner_distance">
                                                <div>
                                                    <span>¥{item.restaurant.piecewise_agent_fee.rules[0].price}起送</span>   
                                                    <span className="dinner_price">{item.restaurant.piecewise_agent_fee.description}</span>   
                                                </div>
                                                <div>
                                                    <span>{item.restaurant.distance}m</span>
                                                    <span className="dinner_price">{item.restaurant.order_lead_time}分钟</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dinner_insideBox-foot">
                                        <div className="dinner_discount">
                                            <span className="dinner_icon icon-J">{item.restaurant.activities[0].icon_name}</span><span>{item.restaurant.activities[0].description}</span>
                                        </div>
                                        <div className="dinner_discount">
                                            <span className="dinner_icon icon-Z">{item.restaurant.activities[1].icon_name}</span><span>{item.restaurant.activities[1].description}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                //根据 hasMore状态 来判断是否显示 有没有更多数据
                hasMore? <div onClick={this.handleLoadmore} className="dinner_loadmore">点击加载更多...</div>:
                        <div className="dinner_loadmore">没有更多数据了...</div>
                }
            </div>
        )
    }
    handleLoadmore=()=>{
        this.props.addDinnerRes(this.props.ResPageAdd)
    }
    handleBackTop = ()=>{
        window.scrollTo(0,0)
    }

    render(){
        let {scrollBackTop} = this.props;
        return (
            <div className="dinner_bigBox">
                {this.renderRestaurant()}
                {scrollBackTop?<div className="dinner_backTop">
                    <i  onClick={this.handleBackTop} className="fa fa-arrow-up"></i>
                </div>:""}
            </div>
        )
    }
}
export default GroupState(DinnerList,{
    reducer:"dinner",
    states:["dinnerRes","ResPageAdd","hasMore","scrollBackTop"]
})