import React,{Component} from 'react'
import "./index.scss"
import {withRouter} from "react-router-dom"
import GroupState from '../../../../modules/group'
class StoreList extends Component{
    componentDidMount(){
        this.initEvent()
    }

    componentWillUnmount(){
        window.removeEventListener("scroll",this.props.BackTop)
    }
    initEvent(){
        window.addEventListener("scroll", this.props.BackTop)
    }
    backtop = ()=>{
        window.scrollTo(0,0)
    }
    render(){
        this.initEvent()
        return (
            <div className="store_box">
                <div className="recommend_store"><p>— 推荐商家 —</p></div>
                <div className="store_sort">
                    <div>
                        <p>综合排序</p>
                        <i className = "fa fa-caret-down"></i>
                    </div>
                    <div><p>距离最近</p></div>
                    <div><p>品质联盟</p></div>
                    <div>
                        <p>筛选</p>
                        <i className = "fa fa-glass"></i>
                    </div>
                </div>
                {this.props.backTop ?
                <div onClick = {this.backtop} className = "back_top">
                    <i className = "fa fa-angle-double-up"></i>
                </div> :
                ""}
            </div>
        )
    }
}
export default GroupState(withRouter(StoreList),{
    reducer:"home",
    states:["backTop"]
})