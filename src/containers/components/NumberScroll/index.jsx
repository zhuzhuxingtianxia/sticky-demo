/**
 * @description: 数字滚动组件 本项目中类似组件 <NumberSwipers />
 * @param {height: 数字item的高度, width: 数字item的宽度} textStyle
 * @param {startValue: 开始值, endValue: 结束值}
 * @return {*}
*/
/*
    // 使用
    <NumberScroll startValue={'7654321'} endValue={number} textStyle={{textColor:'#D10073'}}/>
*/
import React, { Component } from 'react';
import './index.less';
const defaultTextStyle = {
    height: 90,
    width: 40,
    fontSize: undefined,
    textColor: undefined,
}
export default class NumberScroll extends Component {
    static defaultProps = {
        textStyle: defaultTextStyle,
        startValue: '0000000',
        endValue: '1234567'
    }

    constructor(props) {
        super(props)
        const style = {...defaultTextStyle, ...this.props.textStyle};
        this.state = ({
            textStyle: style,
            listAll: this.getNumbers(this.props.startValue)
        })
    }
    componentDidMount() {
        requestIdleCallback(() => {
            this.setState({
                listAll: this.getNumbers(this.props.endValue)
            })
        })
       
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.startValue !== this.props.startValue) {
            this.setState({
                listAll: this.getNumbers(nextProps.startValue)
            })
        }
        if(nextProps.endValue !== this.props.endValue){
            this.setState({
                listAll: this.getNumbers(nextProps.endValue)
            })
        }
    }
    // 数字拆分
    getNumbers(value) {
        const stringVal = value;
        const arr = []
        for (let i = 0; i < stringVal.length; i += 1) {
            arr.push(stringVal.charAt(i))
        }
        return arr;
    }

    // 模拟测试方法
    handleClick() {
        const random = Math.floor(Math.random() * 10000000) + 1; 
        let randomString = random.toString()
        if(randomString.length < 7){
            randomString = randomString.padStart(7, '0')
        }
        this.setState({
            listAll: this.getNumbers(randomString)
        })
    }

    render() {
        const { listAll, textStyle } = this.state
        return (
            <div className='number_scroll_container'>
                <div onClick={this.handleClick.bind(this)} style={{display:'none'}}>改变数字</div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {
                        listAll.map((item, i) => {
                            return (
                                <div className="turn_box_container" 
                                    key={i}
                                    style={{ width: (textStyle.width/20)+'rem', height: (textStyle.height/20) + 'rem' }}
                                >
                                    <div className="turn_box" style={{ top: (-1 * item * textStyle.height/20) + 'rem' }}>
                                        {
                                            [...new Array(10)].map((item, index) => {
                                                const numberStyle = {lineHeight: (textStyle.height/20) + 'rem'}
                                                if(textStyle.fontSize){
                                                    numberStyle.fontSize = textStyle.fontSize
                                                }
                                                if(textStyle.textColor){
                                                    numberStyle.color = textStyle.textColor
                                                }
                                                return (
                                                    <div className="turn_box_number" 
                                                        key={i+'_'+index}
                                                        style={numberStyle}>
                                                        {index}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )

    }
    
}