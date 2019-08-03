import React,{Component} from 'react'
import "./index.scss"
class DinnerChoose extends Component{
    handlelist(){
        alert(1)
    }
    render(){
        return (
            <div className="dinner-choose">
                <p onClick={this.handlelist}>
                    综合排序
                    <i className="fa fa-sort-desc"></i>
                </p>
                <p>距离最近</p>
                <p>品质联盟</p>
                <p>筛选</p>
            </div>
        )
    }
}
export default DinnerChoose