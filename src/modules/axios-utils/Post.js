import axios from 'axios'
import qs from 'querystring'

export default ({url,data})=>{
    return axios.post(url,qs.stringify(data))
}

/* axios.post("/xm/v1/miproduct/recommend").then(res=>{
    console.log(res)
}).catch(err=>{
    console.log("err=>",err)
}) */