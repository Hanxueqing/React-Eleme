import React,{Component} from 'react'
import "./index.scss"
import GroupState from "../../../../modules/group"
import { NavLink } from "react-router-dom"
class Specials extends Component{
    componentDidMount() {
        this.props.getListInfo()
        // console.log(this.props)
    }
    renderSpecials(){
        // console.log(this.props.specials)
        let { specials} = this.props;
        if(!specials) return ""
        return (
            <div>
                {
                    specials.map((item,index) => {
                        return (
                            <div key = {index} className="item">
                                <div className="theme-color">
                                    <h3 className="itemTitle">
                                        {item.title}
                                    </h3>
                                        <span className="itemCredits">
                                                {item.price}
                                            <span className="unitName">
                                                        金币
                                            </span>
                                        </span>
                                            <span className="corner">
                                                抽奖
                                            </span>
                                </div>
                                <div className="imgWrap">
                                    <NavLink to = {"/findlist/" + item.id}>
                                        <img src={item.src} alt="" />
                                    </NavLink>
                                </div>
                            </div>
                        )
                    })
                }
                <div className = "load item">
                    {/* {
                        hasMore ? <p onClick={this.loadMore} className="loadmore">点击加载更多</p>
                            : <p onClick={this.loadMore} className="loadmore notHasMore">没有更多数据了</p>
                    } */}
                    <p onClick={this.loadMore} className="loadmore">点击加载更多</p>
                </div>
            </div>
        )
    }
    loadMore = () => {
        this.props.addHomeSpecials(this.props.specialPage)
    }
    render(){
        return (
            <div className = "specials">
                <img className="banner-single-image" width="100%" src="https://yun.duiba.com.cn/images/201808/fh9iw1evwk.jpg?x-oss-process=image/format,webp" alt="" />
                <section className="bannerBox">
                    <div className="mainShowcase">
                        <img src="https://yun.duiba.com.cn/images/201812/sch8war88p.png" alt="" />
                    </div>
                    <div className="sideShowcase">
                        <div className="topShowcase">
                            <img src="https://yun.duiba.com.cn/images/201906/hhpc0nsoc6.jpeg" alt="" />
                        </div>
                        <div className="bottomShowcase">
                            <img src="https://yun.duiba.com.cn/images/201808/iq43cwcj43.jpg" alt="" />
                        </div>
                    </div>
                </section>
                <div className = "floor">
                    <div className="floorHeader">
                        大家都在兑
                    </div>
                    <div className="floorItem">
                        {this.renderSpecials()}
                    </div>
                </div>
            </div>
        )
    }
}
export default GroupState(Specials, {
    reducer: "find",
    states: ["specials"]
})