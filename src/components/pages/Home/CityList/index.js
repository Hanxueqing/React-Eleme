import React,{Component} from 'react'
import GroupState from '../../../../modules/group'
import {NavLink} from "react-router-dom"
import "./index.scss"
class Cities extends Component{
    componentDidMount(){

        let {cities} = this.props
        if(cities){
            return false
        }

        this.props.getCities()
    }
    renderCities = () => {
        let cities = this.props.cities
        if(!cities) return ""
        return cities.map(item => {
           
            return <NavLink 
                        key = {item.id} 
                        className = "cityName"
                        to = {{
                            pathname:"/home",
                            search:"nm=" + item.nm
                        }}
                    >{item.nm}</NavLink>
        })
    }
    render(){
        return (
            <div className = "cities">
               { this.renderCities()}
            </div>
        )
    }
}
export default GroupState(Cities,{
    reducer:"commons",
    states:["cities"]
})