import axios from 'axios'

export default ({url,data})=>{
    return axios.get(url,{
        params:data
    })
}