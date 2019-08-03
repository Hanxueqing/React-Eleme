import React,{Component} from 'react'
import {NavLink,withRouter} from "react-router-dom"
import GroupState from '../../../../modules/group'
import "./index.scss"
import qs from 'querystring'
class Header extends Component{
    componentDidMount(){

        let {cities} = this.props
        if(cities){
            return false
        }

        this.props.getCities()
        this.initEvent()
    }
    componentWillUnmount(){
        window.removeEventListener("scroll",this.props.setScrollFlag)
    }
    initEvent(){
        window.addEventListener("scroll", this.props.setScrollFlag)
    }
    render(){
        let cityname = qs.parse(this.props.location.search.replace("?",""))
        this.initEvent()
        return (
            <div className = {"homeheader " + (this.props.scrollFlag?"header-position" : "")}>
                <NavLink 
                    className = "citygps"
                    to="/cities"  
                	key="cities"
                >
                    <i className = "fa fa-map-marker"></i>
                    <span>
                        {cityname.nm ? cityname.nm : "获取城市坐标"}
                    </span>
                    <i className = "fa fa-sort-desc"></i>
                </NavLink>
                <div className = "header_search">
                    <input type="text" placeholder = "搜索商家、商品"/>
                </div>
            </div>
        )
    }
}
export default GroupState(withRouter(Header),{
    reducer:"commons",
    states:["cities","scrollFlag"]
})