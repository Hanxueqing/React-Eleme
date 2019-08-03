# React全家桶高仿「饿了么」APP

## 前言

团队合作临摹饿了么移动端APP，选择了现在比较热门的React框架，虽然项目功能还不完善，但是在开发的过程中涵盖了React大部分的主要知识点，适合新手入门，熟悉框架，快速上手。我主要负责其中的发现页面、订单页面、登录页面，下面我简单总结下各个页面承载的功能和知识点，同时针对使用过程中遇到的问题也做了梳理，是一次非常愉快的学习过程。



项目已上传github，欢迎大家下载交流。

前端项目地址：https://github.com/Hanxueqing/React-Eleme

后台数据地址：https://github.com/Hanxueqing/Eleme-API

在线项目手册：https://hanxueqing.github.io/Douban-Movie

项目访问地址：http://39.96.84.220/react-ele/#/home



## 项目技术栈

- React.js全家桶：React-router、Redux、redux-thunk
- 插件：图片懒加载LazyLoad、视频插件video-react
- immutable.js库
- font-awesome字体图标库
- UI：antd-mobile组件库
- axios异步请求远程数据
- 后台接口：express、MongoDB。关于如何制作数据接口可以参考我之前的这篇文章：[《不会写API数据接口的前端攻城狮不是好程序猿》](https://www.jianshu.com/p/966a03327c76)。
- 打包上线：阿里云服务器。关于如何申请、配置阿里云服务器，并且将项目打包上线可以参考我之前的这篇文章：[《从0到1：阿里云服务器部署web项目全过程》](https://www.jianshu.com/p/3693dad9b574)。



## 项目运行

```
# 克隆到本地
git clone git@github.com:Hanxueqing/React-Eleme.git

# 安装依赖
npm install

# 开启本地服务器localhost
yarn start

# 发布环境
yarn build
```



## 项目开发

### 1.创建项目

先全局安装create-react-app脚手架

```
cnpm install create-react-app -g
```



全局安装yarn工具

```
yarn npm install -g yarn
```



生成一个react开发模板在eleme目录

```
create-react-app eleme
```



当我们要进行二次配置的时候，需要找到node_modules文件夹里的react-scripts进行配置，当我们执行`yarn eject`就可以将配置文件抽出，方便开发配置。

```
yarn eject(抽离配置文件，方便后续开发)
```



安装redux、redux-thunk、react-redux、axios模块

```
yarn add  redux redux-thunk  react-redux  axios -S
```



安装node-sass

```
yarn add node-sass -D
```



有时候会引起node_modules包冲突，需要删除，再通过`cnpm i`来重新安装*

解决 npm i 及 yarn install 都无法进行安装的问题和node-sass安装太慢的问题，请参考这篇文章：https://blog.csdn.net/qq_14988399/article/details/80969272



### 2.搭建项目

#### 2-1 style相关配置

​		在src/stylesheets/样式文件夹中依次创建：

​				_base.scss

​				_commons.scss

​				_reset.scss

​				_mixins.scss

​				在main.scss文件中将创建的scss文件引入

```js
@import "_base.scss";
@import "_reset.scss";
@import "_mixins.scss";
@import "_commons.scss";
```



#### 2-2 store相关配置 （建议把所有的数据都放入redux里面进行管理）	

src/store/index.js文件

```js
import {createStore,applyMiddleware} from "redux"
import reducer from "./reducer"
import thunk from "redux-thunk" //这个中间件   action=>到达reducer之间的过程  内部函数可以实现异步的操作，所以说增强了diaptch功能
const store = createStore(reducer, applyMiddleware(thunk));//在项目actionCreators里面可以进行异步请求了
export default store;		
```



src/store/reducer.js文件

```js
//这是一个合并的reducer 
import {combineReducers} from "redux"
import commons from "./commons/reducer"
const reducer = combineReducers({
    commons
})
export default reducer;
```



src/store/commons/reducer.js （分支的reducer.js文件）

```js
//分支的reducer必须是一个纯函数
//固定的输入必须要有固定的输出  不能更改之前的状态   不能有返回值不确定的数据（Math.random  new Date()）
//内部只能进行同步操作！   新状态的地址与之前状态的地址如果不一样的话，才是认为返回新的状态(深拷贝才可以)
import state from "./state"
const reducer = (prevState = state,action)=>{
    let new_state = {...prevState}
    switch (action.type) {
        default:
            break;
    }
    return new_state;
}

export default reducer;
```



#### 2-3  components相关配置

```js
import React,{Component} from "react"
import "./index.scss"
class Template extends Component{
    render(){
        return (
            <div>
                Template
            </div>
        )
    }
}
export default Template
```



#### 2-4   axios相关数据请求实现

为了解决跨域问题，我们首先需要在config文件夹中的webpackDevServer.config.js中配置反向代理

```js
proxy: {
      "/ele": {
        target: "http://39.106.171.220:8989",
        changeOrigin: true
      }
    }
```



axios-utils/Post.js 封装Post方法

```js
import axios from "axios"
import qs from "querystring"

export default ({url,data})=>{
    return axios.post(url,qs.stringify(data))
}
```



axios-utils/Get.js 封装Get方法

```js
import axios from "axios"

export default ({ url, data }) => {
    return axios.get(url, {
        params:data
    })
}

```



封装了axios-utils/index.js文件

```js
import Post from "./Post"
import Get from "./Get"
import {Component} from "react"

Component.prototype.$get = Get;
Component.prototype.$post = Post;

export { //方便后续actionCreators要用   组件用的话直接通过 this.$post或者this.$get
    Get,Post
}

```



App.js文件测试组件里面通过 this.$post

或者this.$get实现请求

```js
 componentDidMount(){
    // this.$http.get()   Component.prototype.$post = axios;
     this.$get({
       url:"/ele/order/order",
       data:{
         limit:3
       }
     }).then(res=>{
        console.log(res)
    })
  }
```



#### 2-5 rem的配置

在modules文件夹中封装一个rem.js文件，实现移动端响应式布局。

```js
document.documentElement.style.fontSize = 
    document.documentElement.clientWidth / 3.75 +"px";

window.onresize = function(){
    document.documentElement.style.fontSize =
        document.documentElement.clientWidth / 3.75 + "px";
}
```



### 3.react-router-dom实现一级路由

#### 3-1 安装react-router-dom

```
cnpm i react-router-dom -S
```



#### 3-2 用Router包裹App组件

在index.js中，将<App />用Router包裹起来并且引入哈希路由HashRouter，之后网址后面会带一个"#"号

```js
import {HashRouter as Router} from "react-router-dom"
ReactDOM.render(
    <Router>
        <App />
    </Router>, document.getElementById('root'));
```



#### 3-3 创建页面

在src/components/pages中创建各个页面，最后在index.js中统一导出。

```javascript
import Home from './Home'
import Find from './Find'
import Order from './Order'
import Mine from './Mine'
export {
    Home,Find,Order,Mine
}
```



#### 3-4 App.js文件创建一级路由

在需要切换路由的时候，引入Route

```js
import {Route} from "react-router-dom"
```



path指定路径，component指定要渲染的组件

```js
render(){
        return(
            <div>
                <Route path="/" component={Home} />
                <Route path="/find" component={Find} />
                <Route path="/order" component={Order} />
                <Route path="/mine" component={Mine} />
            </div>
        )  
    }
```



但是这时候在浏览器中输入/list，Home和List同时会匹配到，需要在“/”中设置exact属性，设置之后，只有完全匹配之后才能使用。

```js
<Route path = "/" component = {Home} exact/>
```



render可以传入一个函数，在这里逻辑判断之后再去返回一个组件。

```js
<Route path = "/find/a" render = {()=>(<div>hello 我是/find/a</div>)}/>
```



> Switch 里面只运行渲染一个路由，可以有效的防止同级路由多次渲染（总是渲染第一个匹配到的组件，按照从上到下的顺序依次渲染）。

引入Switch

```
import {Route,Switch} from "react-router-dom"
```



第一个"/"后面必须带exact，因为Switch只渲染一个路由，如果不加exact，每一个地址都会先跟"/"匹配，所以不论输入什么地址都只会出来Home主页。

```js
render(){
        return(
            <Switch>
                <Route path = "/" component = {Home} exact/>
                {/* <Route path = "/find/a" render = {()=>(<div>hello 我是/find/a</div>)}/> */}
                <Route path = "/find" component = {Find} />
                <Route path = "/order" component = {Order} />
                <Route path = "/mine" component = {Mine} />
            </Switch>
        )  
    }
```



在App.defaultProps中挂载到默认属性

```js
App.defaultProps = {
    navs:[
        { id: 1, path: "/", component: Home, exact: true },
        { id: 2, path: "/Order", component: Order, exact: false },
        { id: 3, path: "/Find", component: Find, exact: false},
        { id: 4, path: "/mine", component: Mine, exact: false }
    ]
}
```



将Switch中的内容修改

```js
import React,{Component} from 'react';
import {
  Home, Order, Find, Mine
} from "./components/pages"
import {Route,Switch} from "react-router-dom"//引入路由对象
class App extends Component{
  render(){
    return (
      <div>
        <Switch>
          <Route path="/" component={Home} exact={true}/>
          <Route path = "/find" component = {Find} />
          <Route path = "/order" component = {Order} />
          <Route path = "/mine" component = {Mine} />
        </Switch>
      </div>
    )
  }
}
export default App;

```



#### 3-5 循环渲染默认属性

可以把一级路由放入到App.defaultProps上面去，进行循环渲染

编写一个renderNavs的方法，返回Switch中的内容

```js
renderNavs(){
        return(
            <Switch>
                <Route path="/" component={Home} exact={true} />
                {/* <Route path = "/find/a" render = {()=>(<div>hello 我是/find/a</div>)}/> */}
                <Route path = "/find" component = {Find} />
          <Route path = "/order" component = {Order} />
          <Route path = "/mine" component = {Mine} />
            </Switch>
        )
    }
```



render中渲染this.renderNavs返回的结果，效果跟之前一样。

```js
render(){
        return(
            <div>
                {this.renderNavs()}
            </div>
        )  
    }
```



将navs从this.props中解构，在Switch中循环遍历

```js
import React,{Component} from 'react';
import {
  Home, Order, Find, Mine
} from "./components/pages"
import {Route,Switch} from "react-router-dom"//引入路由对象
class App extends Component{
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
        {/* <Route path="/" component={Home} exact={true}/>
          <Route path = "/find" component = {Find} />
          <Route path = "/order" component = {Order} />
          <Route path = "/mine" component = {Mine} /> */}
      </Switch>
    )
  }
  render(){
    return (
      <div>
        {this.renderNavs()}
      </div>
    )
  }
}

App.defaultProps = {
    navs:[
        { id: 1, path: "/", component: Home, exact: true },
        { id: 2, path: "/Order", component: Order, exact: false },
        { id: 3, path: "/Find", component: Find, exact: false},
        { id: 4, path: "/mine", component: Mine, exact: false }
    ]
}
export default App;
```



**发现了如果直接访问/的时候，页面不会出现任何的内容**

原因是因为当时路径为/的时候，home组件才会出现，render函数才会执行。所以App.js文件中componentWillReceiveProps钩子函数中将/路径replace到/home:

```
componentWillReceiveProps(props) {
    let { pathname } = props.location;
    let { replace } = props.history;
    if (pathname === "/find") {
      replace("/find/coin")
    }
    if (pathname === "/") {
      replace("/home")
    }
  }
```



同时将/home的exact​改为false:

```
{ id: 1, path: "/home", component: Home, exact: false }
```



### 4.创建AppFooter组件

先在index.html中引入font-awesome字体图标库，开始编写AppFooter组件的样式。

```js
<!-- 引入font-awesome字体图标 -->
    <link rel="stylesheet" href="%PUBLIC_URL%/font-awesome/css/font-awesome.min.css" />
```



在AppFooter中的index.js编写四个选项

```js
import React,{Component} from "react"
import "./index.scss"
class AppFooter extends Component{
    render(){
        return(
            <div className = "app-footer">
                <a href = "">
                    <i className = "fa fa-home"></i>
                    <span>首页</span>
                </a>
                <a href="">
                    <i className="fa fa-podcast"></i>
                    <span>发现</span>
                </a>
                <a href="">
                    <i className="fa fa-book"></i>
                    <span>订单</span>
                </a>
                <a href="">
                    <i className="fa fa-user"></i>
                    <span>我的</span>
                </a>
            </div>
        )
    }
}
export default AppFooter
```



react-router中提供了Link用来做路由跳转，先把Link引入

```js
import{Link} from "react-router-dom"
```



再将a标签替换成Link标签，需要添加to属性，就可以实现一级路由跳转

```js
import{Link} from "react-router-dom"
class Template extends Component{
    render(){
        return(
            <div className = "app-footer">
                <Link to = "/">
                    <i className = "fa fa-home"></i>
                    <span>首页</span>
                </Link>
                <Link to = "/find">
                    <i className="fa fa-podcast"></i>
                    <span>发现</span>
                </Link>
                <Link to = "/order">
                    <i className="fa fa-book"></i>
                    <span>订单</span>
                </Link>
                <Link to = "/mine">
                    <i className="fa fa-user"></i>
                    <span>我的</span>
                </Link>
            </div>
        )
    }
}
export default Template
```



NavLink也可以实现路由跳转，同时还可以帮助我们添加ClassName:active（默认）在标签上面，也可以通过activeClassName给标签指定被激活时的class名，我们可以设置按钮被选中时的样式，需要在首页"/"后面添加exact完全匹配。

```javascript
import React,{Component} from "react"
import "./index.scss"
// import{Link} from "react-router-dom"
import{NavLink} from "react-router-dom"
class Template extends Component{
    render(){
        return(
            <div className = "app-footer">
                <NavLink to = "/" exact>
                    <i className = "fa fa-home"></i>
                    <span>首页</span>
                </NavLink>
                <NavLink to = "/find">
                    <i className="fa fa-podcast"></i>
                    <span>发现</span>
                </NavLink>
                <NavLink to = "/order">
                    <i className="fa fa-book"></i>
                    <span>订单</span>
                </NavLink>
                <NavLink to = "/mine">
                    <i className="fa fa-user"></i>
                    <span>我的</span>
                </NavLink>
            </div>
        )
    }
}
export default Template
```



在index.scss中编写active的样式

```js
&.active{
            color:#ae8232;
        }
```



将选项挂载到AppFooter.defaultProps，通过循环加载渲染到页面上。

```javascript
import React,{Component} from "react"
import "./index.scss"
import {NavLink} from "react-router-dom"
class AppFooter extends Component{
    renderFooter(){
        let {navs} = this.props;
        return (
            navs.map(item=>{
                return (
                    <NavLink key={item.id} to={item.path} exact={item.exact}>
                        <i className={"fa fa-"+item.icon}></i>
                        <span>{item.title}</span>
                    </NavLink>
                )
            })
        )
    }
    render(){
        return (
            <div className="app-footer">
                {this.renderFooter()}
            </div>
        )
    }
}

AppFooter.defaultProps = {
    navs:[
        {id:1,path:"/",icon:"home",exact:true,title:"首页"},
        {id:2,path:"/find",icon:"podcast",exact:false,title:"发现"},
        {id:3,path:"/order",icon:"book",exact:false,title:"订单"},
        {id:4,path:"/mine",icon:"user",exact:false,title:"我的"}
    ]
}
export default AppFooter
```



### 5.实现AppFooter的显示与隐藏（两种方式）

#### 	5-1 在需要用到AppFooter组件的页面引入

分别在首页Home.js /发现Find.js / 订单Order.js 里面进行引入AppFooter组件。 

```js
import AppFooter from "../../commons/AppFooter"
class Find extends Component{
    render(){
        return(
            <div>Find
                <AppFooter></AppFooter>
            </div>
        )
    }
}
export default List
```



#### 	5-2 放入全局App.js文件中

在全局引入AppFooter

```js
import AppFooter from "./components/commons/AppFooter"
```



在render中渲染，现在所有的组件都拥有AppFooter

```js
render(){
        return(
            <div>
                {this.renderNavs()}
                <AppFooter></AppFooter>
            </div>
        )  
    }
```



**比较Mine组件和App组件中的this:**

在app.js组件的render里面进行打印

```js
render(){
        console.log("App.js",this)
        return(
            <div>
                {this.renderNavs()}
                <AppFooter></AppFooter>
            </div>
        )  
    }
```



发现app组件props上面只会有navs，navs是我们给他挂载的默认状态，并且render只会执行一次。

![](http://ww4.sinaimg.cn/large/006tNc79ly1g5mgijz8faj313i0jmn1w.jpg)



在mine.js组件的render里面进行打印

```js
class Mine extends Component{
    render(){
        console.log("mine.js", this)
        return(
            <div>Mine</div>
        )
    }
}
```



发现mine组件的props上面有history/location/match相关的东西。	

![](http://ww3.sinaimg.cn/large/006tNc79ly1g44l7o8qfhj30rw08qjtd.jpg)



（mine组件外面被Route包裹，上面的属性是由Route给他传递的属性）	

![](http://ww3.sinaimg.cn/large/006tNc79ly1g44l84n5skj31100gkgoa.jpg)



当路由发生变化的时候，mine组件的属性上就会发生改变了，从而触发其componentWillReceiveProps这个钩子函数。



**APP组件不是路由组件，监听不到路由的变化。所以说，我们想让APP组件监听路由的变化，应该如何操作？**

我们可以让APP组件也变成路由组件，那么它就可以了监听到路由的变化了，一旦路由发生改变了，APP组件的componentWillReceiveProps这个钩子函数也就会被执行了。

withRouter是一个高阶组件，withRouter包裹之后，APP组件就会变成了一个伪路由组件，可以监听到路由的变化，但是不能够实现跳转。（mine组件是可以跳转/监听路由变化的）

首先引入withRouter组件

```js
import {Route,Switch,withRouter} from "react-router-dom"
```



将App使用withRouter包裹

```js
export default withRouter(App);
```



本来App.js组件是一个普通组件，上面只有navs属性，但是通过高阶组件withRouter(App)一包裹之后，发现App组件上面就会有location/match/history相关的路由属性，那这样的话，当路由发生变化的时候，上面的属性就会改变，一旦改变，App组件的componentWillReceiveProps这个钩子就会被触发，一旦触发就可以在这个钩子函数内部进行相应的路由操作的业务逻辑了。

​	

> 高阶组件本质上就是一个函数，参数接受一个组件，然后再返回一个新的组件。之前接受的这个组件上面就会有一些额外的属性供使用。



我们先让它打印pathname，可以拿到每个路由的路径名称。

```js
componentWillReceiveProps(props){
        let pathname = props.location.pathname;
        console.log(pathname)
    }
```

![](http://ww4.sinaimg.cn/large/006tNc79ly1g5mglwo3qrj30gy06g74h.jpg)



我们设置一个默认状态hasFooter来控制Footer的显示与隐藏，默认赋值为true。

```js
constructor(){
        super()
        this.state = {
            hasFooter:true
        }
    }
```



当pathname为"/mine"的时候给它赋值为false

```js
componentWillReceiveProps(props){
        let pathname = props.location.pathname;
        // console.log(pathname)
        if(pathname === "/mine"){
            this.setState({
                hasFooter:false
            })
        }
    }
```



在render中通过hasFooter的值来控制AppFooter组件的显示与隐藏

```js
render(){
        let{hasFooter} = this.state;
        // console.log("App.js",this)
        return(
            <div>
                {this.renderNavs()}
                {!hasFooter || <AppFooter />}
            </div>
        )  
    }
```



这个时候可以实现点击调转到mine页面时AppFooter组件隐藏，但是返回其他页面的时候仍处于隐藏状态，我们需要补充else语句给非mine页面的hasFooter重新赋值为true

```js
componentWillReceiveProps(props){
        let pathname = props.location.pathname;
        // console.log(pathname)
        if(pathname === "/mine"){
            this.setState({
                hasFooter:false
            })
        }else{
            this.setState({
                hasFooter:true
            })
        }
    }
```



#### 5-3  Appfooter放置

一开始我们是通过componentWillReceiveProps这个钩子函数改变状态来控制组件的显示与隐藏，它只会在状态改变的时候被触发，但是初始化的时候并不会执行。所以当我从其他页面跳转到mine页面的时候AppFooter组件会隐藏，但是我直接访问mine页面的时候，AppFooter组件还是会显示。 考虑到App.js文件的render函数不论初始化还是路由发生变化的时候都会执行，就不需要通过状态去控制AppFooter的显示与隐藏。

```js
renderFooter(){
    let {pathname} = this.props.location;
    if(pathname==="/mine") return "";
    return <AppFooter/>
  }
  render(){
    return (
      <div>
        {this.renderNavs()}
        {this.renderFooter()}
      </div>
    )
  }
```



### 6.Mine二级路由

#### 6-1 Mine下面创建  user和login 两个子模块

在main中的index.js中配置二级路由，从react-router-dom中引入Route，将Login和User两个子模块引入。

```
import React,{Component} from "react"
import "./index.scss"
import {Route} from "react-router-dom"
import Login from "./Login"
import User from "./User"
class Mine extends Component{
    render(){
        return (
            <div>
                <Route path="/mine/login" component={Login}/>
                <Route path="/mine/user" component={User}/>
                Mine
            </div>
        )
    }
}
export default Mine
```



#### 6-2 需要一条数据控制显示login还是显示user组件

​	1）在store/commons/state写一条userInfo数据，默认赋值为空

```
export default {
    userInfo:null
}
```



​	2）考虑到组件需要使用redux里面的数据，所以需要封装一个group出来。  封装一个connect()     

```
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import actionCreators from "../../store/commons/actionCreators"

export default connect(state=>state.commons,dispatch=>{
    return bindActionCreators(actionCreators,dispatch)
});
```



​	3）mine组件想要获取userInfo这个被redux管理的状态，需要写成容器嵌套ui的形式。这样的话mine组件就可以通过props来获取userInfo了。

**但是发现会报错！原因是因为最外层没有嵌套Provider组件！因为Provider才可以给它提供这个数据过去，提供数据，然后被connect（）包裹之后才可以拿到这个数据，再引入store，Provider上添加store属性。**



最外层的index.js文件：

```
import {Provider} from "react-redux"
import store from "./store"

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, document.getElementById('root'));
```



Mine组件上面：	

```
import {CommonsGroup} from "../../../modules/group"
//Mine组件是路由组件，可以监听路由的变化
//Mine组件是UI组件，可以获取store中的数据
class Mine extends Component{
    render(){
        console.log("mine",this.props)  //this.porps上面就会有userInfo这个状态了！
        return (
            <div>
                <Route path="/mine/login" component={Login}/>
                <Route path="/mine/user" component={User}/>
                Mine
            </div>
        )
    }
}
export default CommonsGroup(Mine)
```



总结：

mine组件一旦被commonsGroup(Mine) 包裹之后，Mine组件就变得丰富了。

`mine组件充当了两个角色身份. 一个角色本身是路由组件，可以监听到路由的变化，一旦路由改变了，componentWillReceiveProps这个钩子函数就会被执行。`

`另外一个角色是容器嵌套ui组件的形式，mine组件就可以获取一些被redux管理的状态与更改状态的方法。一旦userInfo这个状态被改变了，容器组件就会监听到状态的改变，然后给UI组件（Mine组件）传递新的属性，属性改变了，mine组件的componentWillReceiveProps这个钩子函数也会被执行。`



#### 6-3 immutable 不可改变的对象

考虑到reducer是一个纯函数，prevState是不能去随便更改的，即便更改的时候，还必须进行深拷贝一个新的对象，这样操作的话，还要随时谨记。这样就比较麻烦，所以引入immutable库解决此类问题。

```
cnpm i immutable  redux-immutable -S
```



在store/commons/reducer.js文件中从immutable库引入fromJS，将state包裹

```
//facibook团队在  redux时候  历时3年  immutable库
import state from "./state"
import {fromJS} from "immutable"
const reducer = (prevState = fromJS(state),action)=>{ 
    switch (action.type) {
        default:
            return prevState; //immutable对象！
    }
}

export default reducer;
```



**会发现出错了！ connect(mapStateToProps) 需要更改一下**

modules/group/commons-group.js文件

```
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import actionCreators from "../../store/commons/actionCreators"
export default connect(state=>{
    return {
         userInfo:state.commons.get("userInfo") //从immutable对象里面取数据通过get方法获取
    }
},dispatch=>{
    return bindActionCreators(actionCreators,dispatch)
});
```



这时候mine组件上就会拿到userInfo数据

![](http://ww3.sinaimg.cn/large/006tNc79ly1g456e1ok43j30v809ygna.jpg)



后续规范统一数据格式，state目前还是js对象，state.commons就变成了immutable对象了，那我们也应该让state对象变成immutable对象。

我们要安装另一个工具：

```
cnpm i redux-immutable -S
```



在汇总的reducer.js文件中，将redux改成redux-immutable 

```
//这是一个合并的reducer 
import {combineReducers} from "redux-immutable"
import commons from "./commons/reducer"
const reducer = combineReducers({
    commons  
})
export default reducer;
```



state目前已经变成immutable对象,可以调用immutable中的getIn方法来获取数据

```
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import actionCreators from "../../store/commons/actionCreators"
export default connect(state=>{
    return {
        userInfo:state.getIn(["commons","userInfo"]) //state目前已经变成immutable对象
    }
},dispatch=>{
    return bindActionCreators(actionCreators,dispatch)
});
```



#### 6-4  mine组件获取userInfo,实现跳转

mine组件由于被Route包裹，所以上面会有history属性和location属性，history中的push和replace都会实现路由跳转，如果我们从order跳转到mine再进入user，返回应该返回到order，中间从mine到user的过程不用被记录，所以我们需要使用replace，而push则会记录这个过程，点击返回，返回到mine页面。

```
	componentDidMount(){
        this.checkUserInfo()
    }
    //order -- mine  (replace)  mine/user 
    checkUserInfo(){
        let {userInfo,history} = this.props;
        if(userInfo){ //说明用户已经登录了
            history.replace("/mine/user")
        }else{
            history.replace("/mine/login")
        }
    }
```

​	

#### 6-5 登录界面实现登录功能

mine/login组件也需要引入CommonGroup，包裹一下UI组件，包裹之后就可以拿到用户信息。

```
import React,{Component} from "react"
import "./index.scss"
import {CommonsGroup} from "../../../../modules/group"
class Login extends Component{
    constructor(){
        super()
        this.login = this.login.bind(this)
    }
    login(){
        //登录   改变userInfo这个状态
        this.props.login()
    }
    render(){
        return (
            <div>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}
export default CommonsGroup(Login)
```



改变redux状态，需要走actionCreators

```
import {CHECK_USER_INFO} from "./const"
export default {
    login(){
        return dispatch=>{
            setTimeout(() => {
                let action = {
                    type: CHECK_USER_INFO,
                    userInfo:{username:"二狗"}
                }
                dispatch(action)
            }, 1000);
        }
    }
}
```



commons/reducer.js处理action

```js
//prevState.set方法并没有对之前的状态做任何的改变
//immutbale对象的set方法，会结合之前的immutable对象和设置的值，返回一个全新的对象
//而不会去改变之前的prevState对象。

import {CHECK_USER_INFO} from "./const"
import state from "./state"
import {fromJS} from "immutable"
const reducer = (prevState = fromJS(state),action)=>{ //
    switch (action.type) {
        case CHECK_USER_INFO:  
            return prevState.set("userInfo",action.userInfo)
        default:
            return prevState; //immutable对象！
    }
}

export default reducer;
```



之后就可以实现点击按钮，1秒钟之后拿到用户数据

![](http://ww1.sinaimg.cn/large/006tNc79ly1g4579y4bg2j30ww0beabx.jpg)

 

假设login组件传递用户信息给action

```
login(){
        this.props.login({
            username:"123",
            password:"456",
            success:data=>{
                alert(data)
                //跳转到个人中心
                this.props.history.replace("/mine/user")
            },
            fail:err=>{
                alert(err)
            }
        })
    }
```



然后action经过判别用户信息后进行登录

```
import {CHECK_USER_INFO} from "./const"
export default {
    login({username,password,success,fail}){
        return dispatch=>{
            setTimeout(() => {
                if(username==="123" && password==="456"){
                    let action = {
                        type: CHECK_USER_INFO,
                        userInfo: { username: "二狗" }
                    }
                    dispatch(action)
                    success("登录成功！")
                    return false;
                }
                fail("登录失败！")
            }, 1000);
        }
    }
}
```



当前端页面不传递fail值的时候如果登录失败系统会报错，说fail未定义，为了增强代码的健壮性，我们可以做一个优化。就是当success或fail为真的时候再去执行后续操作。

```
setTimeout(()=>{
                if(username === "123" && password === "456"){
                    let action = {
                        type: CHECK_USER_INFO,
                        userInfo: { username: "二狗" }
                    }
                    dispatch(action)
                    success && success("登录成功！ ")
                    return false;
                }
                fail && fail("登录失败！")
            },1000)
```



登录成功后进入个人中心界面，首先也需要用CommonsGroup包裹一下，这样才可以拿到数据。

```
import React,{Component} from "react"
import "./index.scss"
import {CommonsGroup} from "../../../../modules/group"
class User extends Component{
    render(){
        return(
            <div>
                <p>用户名为：{this.props.userInfo.username}</p>
            </div>
        )
    }
}
export default CommonsGroup(User)
```



如果直接进入/mine/user页面会报错，说无法从null中取出数据，我们可以在前面加一个判断，当this.props.userInfo为真时再进行后续操作。

```
<p>用户名为：{this.props.userInfo && this.props.userInfo.username}</p>
```



实现点击按钮退出功能。

```
import React,{Component} from "react"
import "./index.scss"
import {CommonsGroup} from "../../../../modules/group"
class User extends Component{
    constructor(){
        super()
        this.exit = this.exit.bind(this)
    }
    exit(){
        this.props.exit(); //redux里面更改状态的方法
        this.props.history.replace("/mine/login") //跳转到登录界面
    }
    render(){
        return (
            <div>
                <p><button onClick={this.exit}>退出</button></p>
                <p>用户为：{this.props.userInfo&&this.props.userInfo.username}</p>
            </div>
        )
    }
}
export default CommonsGroup(User)
```



在store/commons/actionCreators.js中添加exit方法

```
exit(){
        let action = {
            type: CHECK_USER_INFO,
            userInfo:null
        }
        return action;
    }
```



> 考虑一下：
>
> 在登录成功的时候，login的success回调函数里面实现的跳转功能，然后在个人中心界面点击退出，在其中实现的退出功能。考虑到这登录与个人中心组件都在Mine组件里面，可否让mine组件实现这两个的跳转呢？



**Mine组件充当两个角色，路由&UI组件。**

userInfo改变了，相当于状态改变了，Mine组件的componentWillReceiveProps钩子就会执行。

路由发生变化的时候，/mine/login ==> /mine/user  路由变化了，Mine组件的componentWillReceiveProps钩子也会被执行。

所以在mine组件的componentWillReceiveProps钩子函数里面，根据状态来实现Login和User的跳转功能。

```
	componentWillReceiveProps(nextProps){
        if(nextProps.userInfo !== this.props.userInfo)			{//说明redux里面的userInfo状态改变了
            this.checkUserInfo(nextProps)
        }
    }

    checkUserInfo(props){ //跳转的方法
        let {userInfo,history} = props || this.props;
        if(userInfo){ //说明用户已经登录了
            history.replace("/mine/user")
        }else{
            history.replace("/mine/login")
        }
    }
```



当我们在/mine/user页面再点击我的时会跳转到/mine页面，这时候路由发生变化，我们要在if语句中再添加一个判断，当前面一个语句为假的时候执行后面的语句，让这两种情况都执行this.checkUserInfo(nextProps)方法。

```
if(nextProps.userInfo !== this.props.userInfo || nextProps.location.pathname==="/mine")
```



#### 6-6  引入antd-mobile组件库

```
	cnpm install antd-mobile --save 

	cnpm install babel-plugin-import  -D
```



webpack.config.js文件 搜索babel-loader

```
plugins: [
        ......       
       ["import", { libraryName: "antd-mobile", style: "css" }] 
],
```



#### 6-7 登录注册页面

先引入antd-mobile组件库中的NavBar组件

```
import { NavBar, Icon } from 'antd-mobile';
```



在页面中渲染NavBar

```
render(){
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.replace("/")}
                    rightContent={[
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >NavBar</NavBar>
            </div>
        )
    }
```



将手机号登录单独抽离出来一个组件LoginTextForm.js

```
import React,{Component} from "react"
class LoginTextForm extends Component{
    render(){
        return(
            <form>
                <div className = "form-group">
                    <input type = "text" placeholder = "手机号"/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="验证码" />
                </div>
                <button>登录</button>
            </form>
        )
    }
}
export default LoginTextForm;
```



在index.js中引入

```
import LoginTextForm from "./LoginTextForm"
```



为LoginTextForm.js组件编写样式，然后在首页添加一个p标签，实现点击切换表单的功能。

```
<p className = "change-type">账户密码登录</p>
```



将渲染的内容单独封装成一个函数changeLoginType()

```
changeLoginType(){
        return(
            <div className="content">
                <LoginTextForm />
                <p className="change-type">账户密码登录</p>
            </div>
        )
    }
```



给p标签添加一个点击事件changeType,我们想实现点击p标签表单切换，就要让页面重新渲染，这时候就要定义一个默认状态。

```
constructor(){
        super()
        this.login = this.login.bind(this)
        this.state = {
            loginType:"text";    
        }
    }
```



当点击p标签时，changeType方法被调用，状态改变，render函数重新执行。

```
let {loginType} = this.state;
const changeType = () =>{
            this.setState({
                loginType:"user"
            })
        }
```



这时候changeLoginType()又会被调用，执行if语句，进行判断，将Form重新赋值为LoginUserForm，然后在页面上重新渲染。

```
if(loginType !== "text"){
            Form = LoginUserForm
        }
```



给title单独赋值，当切换的时候title也改变。

```
let title = "账号密码登录"

if(loginType !== "text"){
            Form = LoginUserForm
            title = "短信快捷登录"
        }
        
<p onClick = {changeType} className="change-type">{title}</p>
```



NavBar的标题栏也随之改变

```
{this.state.loginType === "text" ? "短信快捷" : "账户密码"}登录
```



现在我们可以实现点击标签切换组件，但是没法再切换回去,所以我们单独定义一个type为user，点击p标签时，执行changeType方法，将type赋值给loginType改变状态，然后判断当loginType ！== "text"的时候，再将type重新赋值回"text"，从而实现了点击p标签两个表单来回切换的效果。

```
changeLoginType(){
        let Form = LoginTextForm;
        let {loginType} = this.state;
        let title = "账号密码登录"
        let type = "user"
        if(loginType !== "text"){
            Form = LoginUserForm
            title = "短信快捷登录"
            type = "text"
        }
        const changeType = () =>{
            this.setState({
                loginType:type
            })
        }
        return(
            <div className="content">
                <Form />
                <p onClick = {changeType} className="change-type">{title}</p>
            </div>
        )
    }
```



效果演示：

![](http://ww3.sinaimg.cn/large/006tNc79ly1g5mh8epe20g30qo128ah6.gif)



#### 6-8 登录功能

在Login的index.js中给button标签添加type = "submit"，同时form表单也要添加onSubmit

```
return(
            <form onSubmit = {this.handleSubmit}>
                <div className = "form-group">
                    <input type = "text" placeholder = "手机号"/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="验证码" />
                </div>
                <button type = "submit" className = "login">登录</button>
            </form>
        )
```



在actionCreators中添加loginByText和loginByUser两个方法

```
    loginByText({ phone, code, success, fail }) {
        return dispatch => {
            setTimeout(() => {
                if (phone === "110" && code === "456") {
                    let action = {
                        type: CHECK_USER_INFO,
                        userInfo: { username: "马云" }
                    }
                    dispatch(action)
                    success && success("手机登录成功！ ")
                    return false;
                }
                fail && fail("手机登录失败！")
            }, 1000)
        }
    },
    loginByUser({ username, password, success, fail }) {
        return dispatch => {
            setTimeout(() => {
                if (username === "123" && password === "456") {
                    let action = {
                        type: CHECK_USER_INFO,
                        userInfo: { username: "马云" }
                    }
                    dispatch(action)
                    success && success("用户登录成功！ ")
                    return false;
                }
                fail && fail("用户登录失败！")
            }, 1000)
        }
    }
```



在Login的LoginTextForm.js中引入CommonsGroup并包裹LoginTextForm，让LoginTextForm通过this.props.loginByText得到actionCreators中定义的方法。



我们采用非受控组件的方法获取数据

```
<div className = "form-group">
                    <input ref = {el => this.phone = el} type = "text" placeholder = "手机号"/>
                </div>
                <div className="form-group">
                    <input ref={el => this.code = el} type="text" placeholder="验证码" />
                </div>
```



在LoginTextForm中编写handleSubmit方法，将参数传递给actionCreators

```
handleSubmit = () => {
        this.props.loginByText({
            phone:this.phone.value,
            code:this.code.value,
            success:data=>{
                alert(data)
            },
            fail:err=>{
                alert(err)
            }
        })
    }
```



再复制一份改成LoginUserForm.js

```
import React, { Component } from "react"
import { CommonsGroup } from "../../../../modules/group"
class LoginUserForm extends Component {
    handleSubmit = () => {
        this.props.loginByUser({
            username: this.username.value,
            password: this.password.value,
            success: data => {
                alert(data)
            },
            fail: err => {
                alert(err)
            }
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input ref={el => this.username = el} type="text" placeholder="用户名" />
                </div>
                <div className="form-group">
                    <input ref={el => this.password = el} type="text" placeholder="密码" />
                </div>
                <button type="submit" className="login">登录</button>
            </form>
        )
    }
}
export default CommonsGroup(LoginUserForm);
```



引入组件库中的Toast

![](http://ww2.sinaimg.cn/large/006tNc79ly1g45mhhr7wyj30za0u0aet.jpg)



在用户登录成功的时候我们给出一个轻提示

```
success:data=>{
                Toast.success(data, 1);
            }
```



效果演示：

![](http://ww4.sinaimg.cn/large/006tNc79ly1g5mhbuy60kg30qo128al4.gif)



登录失败的时候再回调函数中将密码清空，同时获取焦点

```
fail:err=>{
                Toast.fail(err, 1, ()=>{
                    this.code.value=""
                    this.code.focus()
                })
            }
```



效果演示：

![](http://ww4.sinaimg.cn/large/006tNc79ly1g5mhbvyg1ng30qo128n48.gif)



阻止掉登录按钮的默认行为

```
e.preventDefault();
```



### 7.首页的Banner的实现

#### 7-1 创建banner组件

编写banner组件页面

```
import React,{Component} from "react"
class Banner extends Component{
    render(){
        return (
            <div className="home-banner swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <img width="100%" src="" alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Banner;
```



在Record兑换记录的index.js中引入

```
import React,{Component} from "react"
import "./index.scss"
import Banner from "../../Banner"
class Record extends Component{
    render(){
        return(
            <div>
                <Banner />
            </div>
        )
    }
}
export default Record
```



#### 7-2 搭建banner相关的一套store代码

store/find/state.js 设置banners数据，默认为空。

```
export default {
    banners:null
}
```



我们希望banners中的数据能被前端页面获取到，所以需要在group/find-group中添加banners

```
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import actionCreators from "../../store/find/actionCreators"
export default connect(state => {
    return {
        banners:state.getIn(["find","banners"])
    }
}, dispatch => {
    return bindActionCreators(actionCreators, dispatch)
});
```



在Banner组件中，引入FindGroup，包裹Banner组件，这时候Banner组件上有banners数据

```
import React,{Component} from "react"
import {FindGroup} from "../../../../modules/group"
class Banner extends Component{
    render(){
        return(
            <div>
                <img width="100%" src= "" alt = "" />
            </div>
        )
    }
}
export default FindGroup(Banner);
```





#### 7-3 banner组件请求数据，更改banners状态

banner组件里面写请求数据的方法：

```
componentDidMount(){
        this.props.getBannerInfo()
    }
```



在find/actionCreators.js中编写getBannerInfo方法

```
    getBannerInfo(callback) {//获取列表数据
        return dispatch => {
            Get({
                url: "/api/banners.json"
            }).then(res => {
                // console.log(res.data.Banners)
                //获取specials数据
                let banners = res.data.Banners;
                // console.log(banners)
                dispatch({
                    type: GET_BANNER_DETAIL,
                    banners
                })
                callback && callback()
            })
        }
    }
```



find/reducer.js 中将banners数据设置为action传递过来的banners

```
//reducer是一个纯函数
import state from "./state"
import {fromJS} from "immutable"
import {GET_BANNER_DETAIL} from "./const"
const reducer = (prevState =fromJS(state),action)=>{
    switch (action.type) {
        case GET_BANNER_DETAIL:
            return prevState.set("banners", action.banners)
        default:
            return prevState;
    }
}
export default reducer;
```



#### 7-4 循环渲染轮播图数据

这时候我们在render函数中打印banners就可以拿到数据，编写renderSlide方法将banners数据循环渲染到页面上 

```
 renderSlide(){
        let banners = this.props.banners;
        if(!banners) return ""
        return banners.map((item,index)=>{
            return (
                <div key={index} className="swiper-slide">
                    <img width="100%" src={item.img} alt="" />
                </div>
            )
        })
    }
```



#### 7-5 实例化swiper

**普通函数中this直接使用即可，事件函数中需要使用bind重新指向**

```
componentDidMount(){
        let {banners} = this.props;
        if(banners){//如果redux数据存在的话，就缓存一下
            this.initSwiper()
            return false;
        }
        this.props.getBannerInfo(()=>{
            this.initSwiper()
        })
    }
   
 initSwiper(){
        new Swiper(".home-banner", {
            loop: true,
            pagination: {
                el: ".swiper-pagination"
            }
        })
    }
   
```



当我们在引用banner组件给他传递banners属性值的时候，它不会挂载到banner组件上，banner组件只是从redux中拿数据，它会给包裹banner组件的connect赋值。

![](http://ww4.sinaimg.cn/large/006tNc79ly1g46wax5t90j315e09ota2.jpg)

```
<Banner banners = "1234"></Banner>
```



#### 7-6 发现banner组件render函数会执行3次，如何解决此类问题？

当我们在render函数中打印banners的时候它会执行三次，而理想情况应该是执行两次

（1）第一次 banners；null  初始化渲染

（2）第二次    banners==> null变成不为null   



出现原因：初始化一次，banner有值的时候又出先一次，navs有值的时候还会执行一次。

**我们只需要banners组件接受banners相关的数据即可。**



方式一：在shouldComponentUpdate这个钩子函数中判断这个banners和之前的banners是否相等，如果不相等让它返回true执行render，navs变化的时候这个函数中的if语句不会执行。这时候就只打印两次。

![](http://ww1.sinaimg.cn/large/006tNc79ly1g46wbcpxp7j30x605yta7.jpg)

```
//shouldComponentUpdate这个钩子函数处理
    //在这个钩子函数里面只需要出现关于banners数据的判断即可  null==>不是null
    shouldComponentUpdate(props,state){
        if(props.banners !== this.props.banners){
            return true;
        }
        return false;
    }
```



方式二：组件从redux中拿数据的时候默认是将所有数据都拿到，现在我们只需要组件接收相应数据即可。

我们针对**export default FindGroup(Banner,["banners"]); **这个函数去修改一下find-group

```
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import actionCreators from "../../store/find/actionCreators"

//export default FindGroup(Banner,["banners"]);
export default (UIComponent,options)=>{
    return connect(state=>{
        if(!options) return {
            banners:state.getIn(["home","banners"])
        }
        let _state={}
        options.forEach(item=>{ //item="banners"
            _state[item] = state.getIn(["find", item])
        })
        return _state; //{banners:state.getIn(["find","banners"])}
    },dispatch=>{
        return bindActionCreators(actionCreators,dispatch)
    })(UIComponent);
}

```



在banner组件中包裹的时候同时传递数组["banners"]

```
export default FindGroup(Banner,["banners"]);
```



这个时候banner组件上只能拿到banners数据

![](http://ww4.sinaimg.cn/large/006tNc79ly1g46watl2poj30vo07875d.jpg)



依据这个传参数格式，后续更改一下Group文件，这样只需要封装一个group。

```
export default GroupState(Banner, {
  reducer: "find",
  states: ["banners"]
});
```



删掉其他的group，修改index.js

```
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import actionCreators from "./actionCreators"

// export{FindGroup}
/* export default FindGroup(Banner,{
    reducer:"find",
    states:["banners"]
}) */

const GroupState = (UIComponent,options)=>{
    return connect(state=>{
        let {reducer,states} = options;//reducer:find  states:["banners"]
        let _state = {};//新建一个空对象，存放返回到数据
        states.forEach(item=>{//item="banners"
            _state[item] = state.getIn([reducer, item])//空对象的key名为item，将state中取出的banners数据作为属性值
        })
        return _state;////返回这个新对象：{banners:state.getIn(["find","banners"])}}
    },dispatch=>{
            return bindActionCreators(actionCreators[options.reducer],dispatch);//这里我们不知道具体调用哪个actionCreators，所以要单独封装，根据前端传过来的reducer调取相应的actionCreators
    })(UIComponent);
}
export default GroupState;
```



但是返回哪个方法我们并不知道，所以就要单独写一个actionCreators来进行汇总，以后再有新增加的actionCreators只需在后面继续写即可，不需要再在group的index.js中配置。

```
import commonsActionCreators from '../../store/find/actionsCreators'
import findActionCreators from '../../store/find/actionsCreators'
import mineActionCreators from '../../store/mine/actionsCreators'
import orderActionCreators from '../../store/order/actionsCreators'

export default {
    commons:commonsActionCreators,
    find:findActionCreators,
    mine:mineActionCreators,
    order:orderActionCreators
}
```



效果演示：

![](http://ww2.sinaimg.cn/large/006tNc79ly1g5mhpikomrg30qo128e81.gif)



### 8.发现页面二级路由实现

#### 8-1 创建组件

创建 /Find/HPage/Coin和/Record

在Find/index.js文件里面引入Coin/Record组件，因为我们要根据路由实现跳转到不同组件，所以要引入Route。

```
import React,{Component} from 'react'
import "./index.scss"
import { Route } from "react-router-dom"
import NavBar from "./NavBar"
import Record from "./Hpage/Record"
import Coin from "./Hpage/Coin"
class Find extends Component{
    render(){
        return (
            <div className = "find">
                <div className = "top">
                    <NavBar></NavBar>
                </div>
                <Route path="/find/coin" component={Coin} />
                <Route path="/find/record" component={Record} />
            </div>
            
            
        )
    }
}
export default Find
```



#### 8-2 点击navbar实现二级路由切换

方式一：使用NavLink包裹，在to属性中我们通过这种形式：*to* = {"/find/" + item.codeId}，让它拿到item上的一个属性，实现路由跳转。后端设置数据的时候要给item上设置对应的coin属性值，最后路径拼接成"/find/coin"，但是现在item上没有相应的属性值，所以不能采用这种方法。

```
import {NavLink} from "react-router-dom"
```

```
renderSlide(){
        let navs = this.props.navs;
        if(!navs) return ""
        return navs.map(item=>{ //"coin" "record"
            return (
                <NavLink 
                	to={"/find/"+item.codeId}  
                	key={item._id} 
                	className="swiper-slide"
                >{item.title}</NavLink>
            )
        })
    }
```



方式二：

给navbar每一项绑定点击事件：*onCLick* = {*this*.handleClick}

循环遍历navs的时候添加index属性

```
return navs.map((item,index) => {
            return (
                < div 
                    index = {index}
                    onCLick = {this.handleClick}
                    key = { item._id }
                    className = "swiper-slide"
                > { item.title }</div >
            )
        })
```

在handleClick方法中获取index属性: e.target.getAttribute("index")

这时候我们打印拿到的数据类型，发现是string字符串类型。

再通过switch语句判断不同的index值，实现相应跳转。



发现如果想要跳转，navbar组件只是一个ui组件，它身上只有redux中的数据没有路由属性，不能监控路由变化，就不能实现跳转功能。所以想要navbar具有路由跳转功能的话，需要引入withRouter高阶组件实现此跳转功能，withRouter包裹之后组件上就会拿到history属性，其中的replace可以实现路由切换。

```
import {withRouter} from "react-router-dom"

handleClick = (e)=>{
        let index = e.target.getAttribute("index");
        let {replace} = this.props.history;
        switch (index) {
            case "0":
                replace("/find/coin")
                break;
            case "1":
                replace("/find/record")
                break;
            default:
                break;
        }
    }


renderSlide(){
        let navs = this.props.navs;
        if(!navs) return ""
        return navs.map((item,index)=>{
            return (
                <div index={index} onClick={this.handleClick} key={item._id} className="swiper-slide">{item.title}</div>
            )
        })
    }
```



为了让我们从别的页面跳转到发现的时候默认显示/find/coin，当路由变化的时候在App.js文件中componentWillReceiveProps钩子函数中replace“/find”到"/find/coin”路径，这样当我们访问/find的时候默认显示的就是/find/coin页面。

```
componentWillReceiveProps(props) {
    let { pathname } = props.location;
    let { replace } = props.history;
    if (pathname === "/find") {
      replace("/find/coin")
    }
  }
```



#### 8-3 当激活的每一项的时候，添加active样式。

为了区分，我们给当前点击的选项设置一个active激活状态，给div标签添加className：active

```
                        <div className={"headerItem active"}>
                            <i className={"fa fa-" + item.icon}></i>
                            <span>{item.title}</span>
                        </div>
```



编写active样式。

```
.active{
        color:orange;
        font-weight:800;
    }

```



想要点击的时候，选中每一项。首先需要定义一个状态activeIndex

```
constructor(){
        super()
        this.state = {
            activeIndex:0
        }
    }
```



在div上添加判断，当最新的索引和state中传递的索引值相等的时候添加active样式

```
renderSlide(){
        let navs = this.props.navs;
        let {activeIndex} = this.state;
        return navs.map((item,index)=>{
            return (
                <div 
                    index={index} 
                    onClick={this.handleClick} 
                    key={item._id} 
                    className={"headerItem "+(index===activeIndex?'active':"")}
                >{item.title}</div>
            )
        })
    }
```



当点击的时候执行handleClick方法，设置更改状态方法，将activeIndex设置为当前的index，当状态更改的时候会重新执行render函数，进行比较，给当前下标为index的div设置active属性。

**发现点击时候改变状态有问题，因为数据类型不统一导致的。activeIndex设置的是number字符类型，index是string字符串类型，给index*1转换为number类型**。

```
handleClick = (e)=>{
        let index = e.target.getAttribute("index");
        let {replace} = this.props.history;
        switch (index) {
            case "0":
                replace("/find/coin")
                break;
            case "1":
                replace("/find/record")
                break;
            default:
                break;
        }
        //更改状态
        this.setState({
            activeIndex:index*1
        })
    }
```



**当我们直接在浏览器上面访问 /find/coin的时候，发现activeIndex出现了问题，它不会给相应的div添加active样式。**

因为我们直接访问的时候相当于路由改变，路由改变componentWillReceiveProps这个钩子函数就会触发，我们需要在里面根据路径进行判断。

```
componentWillReceiveProps(props){
        let pathname = props.location.pathname
        let index = 0;
        switch (pathname) {
            case "/find/coin":
                index = 0
                break;
            case "/find/record":
                index = 1
                break;
            default:
                break;
        }
        //更改状态
        this.setState({
            activeIndex: index
        })
    }
```



效果演示：

![](http://ww2.sinaimg.cn/large/006tNc79ly1g5mjfljimwg30qo128tun.gif)



### 9.Coin金币页面

#### 9-1 specials数据获取

创建Specials组件，在Coin中引入

```
import React,{Component} from "react"
import "./index.scss"
import Specials from "../../Specials"
class Coin extends Component{
    render(){
        return(
            <div>
                <div className = "blank"></div>
                <Specials />
            </div>
        )
    }
}
export default Coin
```



在state中设置一个specials状态，默认为null

```
export default {
    banners:null,
    specials:null
}
```



在api文件夹中创建goods.json，将我们的商品信息保存在json文件中。

![](http://ww4.sinaimg.cn/large/006tNc79ly1g5mj0cvxfrj31ps0u0alh.jpg)



请求数据就要用到actionCreators，我们编写一个获取列表数据的方法getListInfo，在url中填写获取数据的路径，创建一个空数组specials，将item取出，通过concat方法合并，由于concat方法不会改变原数组，所以需要重新赋值给specials。在Specials页面的componentDidMount钩子函数中通过`this.props.getListInfo()`调用这个方法。

```
getListInfo() {//获取列表数据
        return dispatch => {
            Get({
                url: "/api/goods.json"
            }).then(res => {
                // console.log(res.data.Goods)
                //获取specials数据
                let object_list = res.data.Goods;
                let specials = []
                object_list.forEach(item => {
                    specials = specials.concat(item) //concat方法不会改变原数组，所以需要重新赋值
                })
                dispatch({
                    type: GET_LIST_INFO,
                    specials
                })
            })
        }
    }
```



在reducer中将specials设置为新传递过来的specials

```
//reducer是一个纯函数
import state from "./state"
import {fromJS} from "immutable"
import {GET_LIST_INFO,GET_BANNER_DETAIL} from "./const"
const reducer = (prevState =fromJS(state),action)=>{
    switch (action.type) {
        case GET_LIST_INFO:
            return prevState.set("specials", action.specials)
        case GET_BANNER_DETAIL:
            return prevState.set("banners", action.banners)
        default:
            return prevState;
    }
}
export default reducer;
```





specials组件想要获取redux里面的specials数据，引入GroupState给它包裹一下：

```
import React,{Component} from "react"
import "./index.scss"
import GroupStates from "../../../../modules/group"
class Specials extends Component{
    render(){
        console.log("specials",this.props.specials)
        return (
            <div>
                Specials
            </div>
        )
    }
}
export default GroupState(Specials, {
    reducer: "find",
    states: ["specials"]
})
```



这时候specials组件就可以拿到redux中的specials数值

![](http://ww1.sinaimg.cn/large/006tNc79ly1g47ivpmuesj30tm05074r.jpg)



在specials组件中编写renderSpecials()方法，将specials数据循环遍历，渲染在页面上。

```
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
            </div>
        )
    }
```



#### 9-2 加载多页数据

添加p标签，内容为【点击加载更多】，当放在render函数中时，会在数据还没请求完时出现。

```
render(){
        // console.log("specials",this.props.specials)
        return(
            <div className = "specials">
                {this.renderSpecials()}
                <p className = "loadmore">点击加载更多</p>
            </div>
        )
    }
```



我们将它放在renderSpecials中，让它返回一段jsx代码，给它外面套一个p标签，和请求到的数据一起返回回来

```
renderSpecials(){
        let {specials} = this.props;
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
                <p className="loadmore">点击加载更多</p>
            </div>
        )
    }
```



给p标签添加点击事件

```
<p onClick = {this.loadMore} className="loadmore">点击加载更多</p>
```



编写loadMore方法，需要请求数据，先声明一个常量

```
const ADD_HOME_SPECIALS = "ADD_HOME_SPECIALS"
```



在actionCreators中编写增加specials的方法

```
addHomeSpecials(){
        return dispatch =>{
            Get({
                url:"/api/goods.json",
                data:{
                    page:2
                }
            }).then(res => {
                //获取specials数据
                let object_list = res.data.data.object_list;
                let specials = [];
                object_list.forEach(item => {
                    specials = specials.concat(item)
                })
                dispatch({
                    type: ADD_HOME_SPECIALS,
                    specials
                })
            })
        }
    }
```



在reducer中更改specials的数值

```
case ADD_HOME_SPECIALS:
            return prevState.set("specials", action.specials)
```



在index.js中的loadMore中触发这个方法

```
loadMore = () =>{
        this.props.addHomeSpecials()
    }
```



现在点击【加载更多】按钮可以拿到第二页的数据，但是会把第一页的数据覆盖，所以在reducer中我们不能直接重新给specials赋值，而是需要在第一页的基础上拼接数据。

先通过get方法获取到specials数据，因为specials是数组，再使用concat方法拼接action中传过来的数据。

```
case ADD_HOME_SPECIALS:
            return prevState.set("specials", prevState.get("specials").concat(action.specials))
```



或者使用merge方法

```
case ADD_HOME_SPECIALS:
            return prevState.merge({
                specials:prevState.get("specials").concat(action.specials),
                specialPage: action.specialPage
            })
```



因为我们现在给page传的是固定的参数，所以每次点击都会请求第二页的数据，我们需要重新设置一个状态specialPage，放到redux中管理。

先在state中初始化specialPage为1

```
export default{
    banners:null,
    specials:null,
    goodDetail:null,
    activeIndex:0,
    specialPage:1
}
```



再在actionCreators方法中添加参数specialPage，将page赋值为++specialPage

```
addHomeSpecials(specialPage){
        return dispatch =>{
            Get({
                url:"/api/goods.json",
                data:{
                    page: ++specialPage
                }
            }).then(res => {
                //获取specials数据
                let object_list = res.data.data.object_list;
                let specials = [];
                object_list.forEach(item => {
                    specials = specials.concat(item)
                })
                dispatch({
                    type: ADD_HOME_SPECIALS,
                    specials,
                    specialPage
                })
            })
        }
```



在reducer中将specialPage赋值为actionCreators中传过来的specialPage

```
case ADD_HOME_SPECIALS:
            return prevState.set("specials", prevState.get("specials").concat(action.specials)).set("specialPage", action.specialPage)
```



在发现中请求specialPage数据

```
export default GroupState(Specials,{
    reducer:"find",
    states: ["specials","specialPage"]
})
```



调用addHomeSpecials方法，同时传递this.props.specialPage参数

```
loadMore = () =>{
        this.props.addHomeSpecials(this.props.specialPage)
    }
```



当持续点击按钮请求数据的时候，会一直请求下去，所以我们要在actionCreators中添加判断，当没有数据的时候，p标签内容换为没有更多数据了。

在state中定义一个状态hasMore，默认为true

```
hasMore:true
```



声明一个type常量

```
const HASMORE = "HASMORE"
```



actionCreators中addHomeSpecials的.then方法中进行数据判断，当没有更多数据的时候给hasMore赋值为false

```
//数据判断
                let total = res.data.data.total;
                if(specialPage*8 >= total){
                    dispatch({type:HASMORE,hasMore:false})
                    return false;
                }
```



在reducer中将hasMore赋值为最新状态

```
case HASMORE:
            return prevState.set("hasMore", action.hasMore)
```



发现页中请求hasMore方法

```
export default GroupState(Specials,{
    reducer:"home",
    states: ["specials","specialPage","hasMore"]
})
```



将hasMore解构出来

```
let {specials,hasMore} = this.props;
```



在renderSpecials函数中通过三目运算符控制p标签显示的内容和样式

```
    {
        hasMore ? <p onClick={ this.loadMore } className="loadmore" > 点击加载更多</p > : ""
    }
```



效果演示：

![](http://ww4.sinaimg.cn/large/006tNc79ly1g5mk04nvmsg30qo1281kx.gif)



###10.实现动态路由跳转以及参数的获取

#### 10-1 动态参数进行传递

**在Find文件夹下新建findList组件**

在浏览器输入/findlist/1跳转到findlist页面中，一般详情页都不需要底部。我们在renderFooter方法中通过正则表达式判断，当访问/findilst的时候一律返回" "

```
renderFooter(){
    let {pathname} = this.props.location;
    if(/findlist/.test(pathname)) return ""
    return <AppFooter />
  }
```



在findList页面从antd-mobile框架中引入NavBar组件，添加一个头部

```
import React,{Component} from "react"
import "./index.scss"
import { NavBar, Icon } from 'antd-mobile';
class findList extends Component{
    render(){
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >{goodDetail.title}</NavBar>
            </div>
        )
    }
}
export default findList
```



在app.js文件里面引入findList组件，配置   /findlist/:id动态路由。

```
{ id: 5, path: "/findlist/:id", component: findList, exact: false }
```



**点击specials的img进行跳转**

在<NavLink>标签的to属性中配置动态id，从属性中获取动态id拼接到/findlist/路径上

```
                                <div className="imgWrap">
                                    <NavLink to = {"/findlist/" + item.id}>
                                        <img src={item.src} alt="" />
                                    </NavLink>
                                </div>
```



打印一下findList中的this.props可以看到它身上有match属性，可以通过let goodId = this.props.match.params.id;来获取它身上的动态：id。

![](http://ww4.sinaimg.cn/large/006tNc79ly1g5mkfjn56oj30x80l8q7p.jpg)



直接在findList组件里面接受传递来的动态参数id

```
    componentDidMount(){
        //获取动态路由id
        let goodId = this.props.match.params.id;
        //将参数换成goodId可以实现动态路由跳转
        this.props.getGoodDetail(goodId)
    }
```



编写详情页面

```
import React,{Component} from 'react'
import "./index.scss"
import { NavBar, Icon, NoticeBar } from 'antd-mobile';
import GroupStates from "../../../../modules/group"
import { Player } from 'video-react';
class findList extends Component{
    componentDidMount() {
        let goodId = this.props.match.params.id;
        this.props.getGoodDetail(goodId)
    }
    render(){
        console.log("findlist",this.props.match.params.id)
        let { goodDetail } = this.props; 

        if(!goodDetail) return ""
        
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.replace()}
                    rightContent={[
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >{goodDetail.title}</NavBar>
                <div className = "imgBox">
                    <img src = {goodDetail.img} alt = ""/>
                </div>
                <div className = "header">
                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                        150****0054的宜春市用户获得华为 P30; 188****2486的厦门市用户获得华为 P30; 158****4955的广州市用户获得华为 P30; 
                    </NoticeBar>
                    <div className="lottery-info">
                        <div className="left">
                            <h3>{goodDetail.title}</h3>
                            <p>
                                <span className="origin-price">
                                    ￥{goodDetail.oriPrice}元
                            </span>
                            </p>
                        </div>
                        <div className="right">
                            <p className="theme-color">
                                <strong>{ goodDetail.price }</strong>
                                <span>金币</span>
                            </p>
                        </div>
                    </div>
                </div>
                <Player ref="player" videoId="video-1">
                    <source src={goodDetail.video} />
                </Player>
                <div className= "sl-section">
                    <p className = "title">
                        <i className = "fa fa-arrow"></i>
                        <span>详情说明：</span>
                    </p>
                    <div className = "description">
                        <p>
                            {goodDetail.desc}
                        </p>
                        <p>活动截止日期:2019年6月30日</p>
                        <p><br /></p>
                        <p><strong>兑换流程</strong></p>
                        <p>1、用户确认符合活动条件后,点击[马上抽奖]。</p>
                        <p>2、中奖用户需24小时内填写配送信息,并确认信息无误,提交兑奖,逾期视为自动放弃,不再补发。</p>
                        <p><br /></p>
                        <p>注意事项</p>
                        <p>1、兑换时请仔细核对收货信息,商品一经兑换,不支持收货地址和(或)收件人信息修改;</p>
                        <p>2、实物类商品将在<strong>7月20日前</strong>安排发货,邮费由饿了么承担,请耐心等待;</p>
                        <p>3、兑换或中奖后请在<strong>24小时</strong>内填写领奖地址,逾期视为自动放弃奖品;</p>
                        <p>4、优惠券类奖品的使用规则详见每个优惠券的介绍页;</p>
                        <p>5、活动／商品 配送规则:快递包邮(海外,港澳台,西藏、新疆等偏远地区由于物流原因暂不支持)。</p>
                        <p>6、兑换项与活动和设备生产商Apple Inc.公司无关;</p>
                        <p>7、每个用户每天限制抽奖60次;</p>
                        <p>8、请提供正确并可正常通信的手机号,提供错误信息导致损失将由用户承担;</p>
                        <p>9、如有问题联系积分商城邮箱:jifen@ele.me或客服电话:10105757;</p>
                    </div>
                    <p className="apple">*兑换项与活动和设备生产商Apple Inc.公司无关</p>
                </div>
            </div>
        )
    }
}

export default GroupStates(findList, {
    reducer: "find",
    states: ["goodDetail"]
})
```



#### 10-2 在Record组件中也引入specials

**发现问题：**

从兑换记录跳转到详情页，返回的时候，发现始终在/find/coin里面。

解决办法：

将findlist中的NavBar的to属性replace改为：.goBack()

```
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >{goodDetail.title}</NavBar>
```



**发现问题：返回时active样式在金币标签上**

解决办法：activeIndex就应该让redux进行处理，不然的话从详情页返回到发现页，navbar组件销毁然后重新创建。重新创建的话constructor里面的this.state={activeIndex:0}  所以说，只有金币选项会被选中。



在state中设置`activeItem: 1`，在路由跳转的时候激活changeActiveItem方法

```
componentWillReceiveProps(props){
        let pathname = this.props.location.pathname
        let item = 1
        // console.log(this.props.activeItem)
        switch (pathname) {
            case '/find/coin':
                item = 1
                break;
            case '/find/record':
                item = 2
                break;
            default:
                break;
        }
        this.props.changeActiveItem(item)
    }
```



将item作为参数传递，在actionCreators中派发方法：

```
changeActiveItem(activeItem) { //更改选项卡
        return {
            type: CHANGE_ACTIVE_ITEM,
            activeItem
        }
    }
```



在reducer中将activeItem赋值为最新的item

```
case CHANGE_ACTIVE_ITEM:
            return prevState.set("activeItem", action.activeItem)
```



在NavBar组件中接收activeItem

```
export default withRouter(GroupState(NavBar,{
    reducer:"find",
    states:["activeItem"]
}))
```



然后在render方法中将`activeItem`结构出来与`item.id`进行对比，给当前点击的选项添加active样式。

```
renderNavs(){
        let {navs,activeItem} = this.props
        return(
            navs.map(item=>{
                return(
                    <NavLink key = {item.id} to = {item.path} exact = {item.exact}>
                        <div className={"headerItem " + item.name + " " + (item.id === activeItem ? "active" : "")} onClick={this.handleClick}>
                            <i className={"fa fa-" + item.icon}></i>
                            <span>{item.title}</span>
                        </div>
                    </NavLink> 
                )
            })
        )
    }
```



效果演示：

![](http://ww2.sinaimg.cn/large/006tNc79ly1g5mld4fuc7g30qo128x6p.gif)



### 11.返回顶部功能

在Home组件中的index.js添加返回顶部按钮，添加点击事件

```
<div onClick = {this.backtop} className = "back-top">
                    <i className = "fa fa-arrow-up"></i>
                </div>
```



编写返回顶部方法

```
backtop = () =>{
        window.scrollTo(0,0)
    }
```



添加监听事件

```
initEvent(){
        window.addEventListener("scroll",e=>{
            let sTop = document.body.scrollTop || document.documentElement.scrollTop;
        })
    }
```



在componentDidMount中触发事件

```
componentDidMount(){
        this.initEvent()
    }
```



现在设置当滚动高度大于两百的时候，返回顶部按钮显示，我们要设置一个状态控制它的显示与隐藏。在state中设置scrollFlag标志，默认是不显示的。

```
scrollFlag:false
```



声明const常量

```
const CHANGE_SCROLL_FLAG = "CHANGE_SCROLL_FLAG"
export { GET_NAV_INFO, GET_HOME_INFO, GET_HOME_DETAIL, CHANGE_ACTIVE_INDEX, ADD_HOME_SPECIALS, HASMORE, CHANGE_SCROLL_FLAG}
```



在actionCreators中定义changeScrollFlag方法

```
changeScrollFlag(e){
        let sTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(sTop > 400){
            return {
                type: CHANGE_SCROLL_FLAG,
                scrollFlag:true
            }
        }else{
            return{
                type: CHANGE_SCROLL_FLAG,
                scrollFlag: false
            }
        }
    }
```



在reducer中将数据更新

```
case CHANGE_SCROLL_FLAG:
            return prevState.set("scrollFlag", action.scrollFlag)
```



在首页引入GroupState，包裹Home组件，获取scrollFlag数据，在添加监听事件中触发changeScrollFlag方法

```
initEvent(){
        window.addEventListener("scroll",this.props.changeScrollFlag)
        }
```



在componentWillUnmount钩子函数中当组件销毁的时候移除事件监听，不然会影响到其他组件

```
componentWillUnmount(){
        window.removeEventListener("scroll",this.props.changeScrollFlag)
    }
```



在render函数中将scrollFlag数据解构出来

```
let { scrollFlag } = this.props;
```



利用scrollFlag的值来控制返回顶部按钮的显示与隐藏

````
{
                    scrollFlag ? <div onClick={this.backtop} className="back-top">
                        <i className="fa fa-arrow-up"></i>
                    </div>
                    :""
                }
````



效果演示：

![](http://ww1.sinaimg.cn/large/006tNc79ly1g5mlj2ug3jg30qo128wxy.gif)



### 12.视频插件

具体使用方法参考这篇文章：

https://blog.csdn.net/xue_sunshine_girl1/article/details/83505758



#### 12-1 下载视频插件

```
cnpm install –S video-react
```



#### 12-2 在页面中引入

在Homelist组件引入插件：

```
import { Player } from 'video-react';
```



在全局引入样式：

```
import "video-react/dist/video-react.css";
```



#### 12-3 调用

在render中添加player标签

```
                <Player ref="player" videoId="video-1">
                    <source src={goodDetail.video} />
                </Player>
```


**插件API属性**

poster：指示海报框显示用户播放或搜索的URL。如果未指定此属性，则直到第一帧可用时才显示任何内容；然后第一帧显示为海报帧。

autoPlay：如果指定视频可以自动播放，只要它可以这样做，而不停止完成加载数据。

```
<Player poster={""} autoPlay={false} ref="player" videoId="video-1">
                    <source src={this.state.inputVideoUrl} />
                </Player>
```



设置样式，让播放按钮局中显示

```
.video-react .video-react-big-play-button{
    top: 50%!important;
    left: 50%!important;
    transform: translate(-50%,-50%);
}
```



效果演示：

![](http://ww3.sinaimg.cn/large/006tNc79ly1g5mlmg1xw4g30qo128npd.gif)



### 13.图片懒加载

#### 13-1 下载图片懒加载插件

```
cnpm install --save react-lazy-load
```



#### 13-2 在页面中引入

在Special组件引入插件：

```
import LazyLoad from "react-lazy-load"
```



#### 13-3 使用LazyLoad包裹img标签

使用LazyLoad将<img>标签包裹

```
<LazyLoad>
		<img src={item.src} alt="" />
</LazyLoad>
```



在网页中查看效果：

当前页面中的图片是显示图片形式，未加载图片显示空div标签样式

![](http://ww1.sinaimg.cn/large/006tNc79ly1g5mlqdb3a7j30po0p4wjn.jpg)





### 14.打包上线

#### 14-1 修改config文件夹下的paths.js文件

在paths.js文件中找到getServedPath方法，pathname : '/'改成"./"不然是相对跟元素查找

![](http://ww2.sinaimg.cn/large/006tNc79ly1g4a460bt4ij310407ojt1.jpg)



修改文件中请求静态目录数据的路径（项目中用到的json文件），需改为和服务器文件夹名称一致。

![](http://ww2.sinaimg.cn/large/006tNc79ly1g5mlviok5pj30vk0gsac1.jpg)



#### 14-2 打包文件

```
cnpm run build
```



#### 14-3 连接FTP服务器

（1）进入/usr/local/nginx/conf目录，传输nginx.config

![](http://ww3.sinaimg.cn/large/006tNc79ly1g4a453upi3j30wg0ouwrf.jpg)



（2）修改nginx.config文件

```
location /sk {
            proxy_pass http://39.96.84.220:8088;
        } 
```



（3）上传新的nginx.config文件到服务器



（4）在终端重启服务器

连接数据库：ssh root@39.96.84.220

![](http://ww2.sinaimg.cn/large/006tNc79ly1g4a44opqihj30nc03mq54.jpg)



(5)在html中创建react-ele目录



(6)将打包后的build文件夹中的所有文件上传到服务器

![](http://ww4.sinaimg.cn/large/006tNc79ly1g4a44fwz9qj31uo0kue1n.jpg)



(7)在网页中访问http://39.96.84.220/react-ele/#/home



项目效果演示：

![](http://ww3.sinaimg.cn/large/006tNc79ly1g5mlzi9ss6g30qo1281kz.gif)




