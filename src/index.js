import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 引入通用样式
import './stylesheets/main.scss'
// import "./modules/post"
import "./modules/axios-utils"
// 使用rem.js
import "./modules/rem"

//引入swiper.min.css样式文件
import "swiper/dist/css/swiper.min.css"

import {HashRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from "./store"

import "video-react/dist/video-react.css";

//引入swiper.min.css
import "swiper/dist/css/swiper.min.css"
ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <App />
        </Router>
    </Provider>, document.getElementById('root'));