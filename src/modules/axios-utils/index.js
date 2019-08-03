import Post from './Post'
import Get from './Get'
import {Component} from "react"

Component.prototype.$get = Get;
Component.prototype.$post = Post;

export {
    Get,Post
}