import React,{Component} from 'react'
import "./index.scss"


import {Route} from "react-router-dom"
import HomeDetail from "./HomeDetail"
import Header from './Header'
import Banners from './banners'
import SetMeal from './SetMeal'
import StoreList from './storeList'
import StoreInfo from './storeInfo'
import All from "./Hpage/ALL"
import Rice from "./Hpage/Rice"
class Home extends Component{
    render(){
        return (
            <div id="home">
                <Header></Header>
                <Banners></Banners>
                <SetMeal></SetMeal>
                <StoreList></StoreList>
                <StoreInfo></StoreInfo>
                <Route path="/homedetail" component={HomeDetail}/>
                <Route path="/eleme/all" component={All} />
                <Route path="/eleme/rice" component={Rice} />
            </div>
        )
    }
}
export default Home