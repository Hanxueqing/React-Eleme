import React,{Component} from 'react';
import {Home, Order, Find, Mine} from "./components/pages"

import { Route, Switch, withRouter} from "react-router-dom"
import Cities from "./components/pages/Home/CityList"

import AppFooter from './components/commons/AppFooter'
import findList from "./components/pages/Find/findList"
import GroupState from "./modules/group"
import { Get } from "./modules/axios-utils"
import HomeDetail from './components/pages/Home/HomeDetail';
import All from "./components/pages/Home/Hpage/ALL"
import Rice from "./components/pages/Home/Hpage/Rice"
class App extends Component{
  componentWillReceiveProps(props) {
    let { pathname } = props.location;
    let { replace } = props.history;
    if (pathname === "/find") {
      replace("/find/coin")
    }
    if (pathname === "/") {
      replace("/home")
      console.log(1111)
    }
  }
  componentDidMount() {
    Get({
      url: "/ele/menu?tdsourcetag=s_pcqq_aiomsg",
      data: {
        a: 100
      }
    })
    let { pathname } = this.props.location;
    let { replace } = this.props.history;
    if (pathname === "/") {
      replace("/home")
      console.log(1111)
    }
  }
  renderNavs(){
    let {navs} = this.props;
    return (
      <Switch>
        {
          navs.map(item=>{
            return (
              <Route key={item.id} path={item.path} component={item.component} exact={item.exact} />
            )
          })
        }
        {/* <Redirect to="/eleme/all"/> */}
        {/* <Redirect to="/eleme/all"/> */}
        {/* <Route path="/" component={Home} exact={true} />
        <Route path="/buycar" component={Buycar} />
        <Route path="/list" component={List} />
        <Route path="/mine" component={Mine} /> */}
      </Switch>
    )
  }
  renderFooter(){

    let { pathname } = this.props.location;
    if (/findlist/.test(pathname)) return "";

    if(pathname === "/homedetail") return "";
    if(/homedetail/.test(pathname)) return ""

    if(pathname === "/cities")return ""
    
    return <AppFooter />

    
  }
  render(){
    return (
      <div>
        {this.renderNavs()}
        {this.renderFooter()}
      </div>
    )
  }
}

App.defaultProps = {
  
  navs:[
    
    { id: 1, path: "/home", component: Home, exact: false },
    { id: 2, path: "/order", component: Order, exact: false },
    { id: 3, path: "/Find", component: Find, exact: false},
    { id: 4, path: "/mine", component: Mine, exact: false },
    { id: 5, path: "/findlist/:id", component: findList, exact: false },
    { id: 6, path: "/homedetail", component: HomeDetail, exact: false },
    { id: 7, path: "/cities", component: Cities, exact: false },
    { id: 8, path: "/eleme/all", component: All, exact: false },
    { id: 9, path: "/eleme/rice", component: Rice, exact: false }
  ]
}
export default withRouter(GroupState(App, {
  reducer: "find",
  states: ["activeItem"]
}))
