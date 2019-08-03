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
        // console.log("findlist",this.props.match.params.id)
        let { goodDetail } = this.props; 

        if(!goodDetail) return ""
        
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
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