import React,{Component} from 'react'
import "./index.scss"
import GroupState from "../../../../modules/group"

class Foods extends Component{
    componentDidMount() {
        this.props.getFoodsInfo()
    }
    renderFoods(){
        let {foods} = this.props;
        if(!foods) return ""
        return (
            <div>
                {
                    foods.map((item,index) => {
                        return (
                            <div key = {index} className="foodItem">
                                <div className = "orderCard">
                                    <img  src = {item.img}/>
                                </div>
                                <div className= "ordercard-content">
                                    <div className= "ordercard-head">
                                        <div className = "title">
                                            <span className = "foodName">{item.name}</span>
                                            <p className="status">{item.confirm}</p>
                                        </div>
                                        <p className="datetime">{item.time}</p>
                                    </div>
                                    <div className="ordercard-detail">
                                        <span className="productname">{item.title}</span>
                                        <p className="price">¥{item.price}</p>
                                    </div>
                                </div>
                                
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }
    render(){
        return (
            <div className = "foods">
                <div className="foodsItem">
                    {this.renderFoods()}
                </div>
            </div>
        )
    }
}
export default GroupState(Foods, {
    reducer: "order",
    states: ["foods"]
})