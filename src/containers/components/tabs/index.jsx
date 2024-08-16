import React from "react";
import classnames from "classnames";
import './index.less';

export default class Tabs extends React.Component {

    static displayName = "Tabs";
    static defaultProps = {
        className: '',
        sticky: false,
        tabs:[],
        activeKey: 0,
        onChange: ()=>{},
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        };
        
    }

    componentWillReceiveProps(nextProps, nextContext) {
        
        if(nextProps.activeKey != this.props.activeKey) {
            this.changeSelect(nextProps.activeKey, true)
        }
    }

    componentDidMount() {
        this.changeSelect(this.props.activeKey)                       
    }

    changeSelect(activeKey=0, isRecive=false) {
        const { tabs=[] } = this.props
        const index = tabs.findIndex(tab => tab.key == activeKey)
        if(index != -1) {
            this.setState({
                selected: index
            },()=> {
                
                const scrollContent = document.querySelector('.'+ Tabs.displayName + '-bar');
                if (scrollContent && scrollContent.scrollWidth > scrollContent.clientWidth) {
                    
                    const childNode = scrollContent.childNodes[index];
                    const nodeRect = childNode.getBoundingClientRect();
                    let diffWidth = nodeRect.left + (nodeRect.width * 0.5) - scrollContent.clientWidth * 0.5;
                    
                    // console.log('diffWidth:',diffWidth)
                    // console.log('scrollLeft:',scrollContent.scrollLeft)
                   // isRecive 防止初次滑动到顶部
                    setTimeout(()=>{
                        // scrollContent.scrollLeft = 500;
                        animateScrollLeft(scrollContent, diffWidth, 300);
                    }, isRecive ? 0 :300)
                }
                
            })
            
        }
        
    }

    render() {
        const {tabs, activeKey, sticky, bgColor} = this.props
        return (
            <div className={classnames(Tabs.displayName, this.props.className)}>
                <div className={classnames(Tabs.displayName + '-bar', {sticky})}
                    style={ bgColor ? {background: bgColor}: {}}
                >
                {
                    tabs.map((tab,idx) => {
                        return (
                            <div 
                                key={idx}
                                className={classnames('tabs-tab',{'tabs-tab-active': activeKey == tab.key})}
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    this.changeSelect(tab.key, true)
                                    this.props.onChange(tab.key);
                                   
                                }}
                            >
                                <div>
                                    <div>{tab.title}</div>
                                    <p/>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                <div className={Tabs.displayName + '-content'}>
                    {
                        React.Children.map(this.props.children, (child,i) => {
                            return (
                                <div className={classnames('tabpanel',{'tabpanel-active': i == this.state.selected})}
                                    style={i == this.state.selected ? {}: {display: 'none'}}
                                >
                                    {child}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

function animateScrollLeft(element, targetScrollLeft, duration) {
    var start = element.scrollLeft;
    var startTime = performance.now();
  
    function updateScroll() {
      var currentTime = performance.now();
      var elapsed = currentTime - startTime;
      var progress = elapsed / duration;
  
      if (progress < 1) {
        element.scrollLeft = start + (targetScrollLeft - start) * progress;
        requestAnimationFrame(updateScroll);
      } else {
        element.scrollLeft = targetScrollLeft;
      }
    }
  
    requestAnimationFrame(updateScroll);
  }

function animate(element, properties, duration, easing, complete) {
    var start = Date.now(); // 获取动画开始时间
    var initialValues = {}; // 存储起始属性值
    var changes = {}; // 存储属性值的变化量
  
    // 计算起始属性值和变化量
    for (var prop in properties) {
      initialValues[prop] = parseFloat(getComputedStyle(element)[prop]);
      changes[prop] = properties[prop] - initialValues[prop];
    }
  
    // 定义更新动画函数
    function updateAnimation() {
      var currentTime = Date.now() - start; // 计算当前动画时间
      var progress = Math.min(currentTime / duration, 1); // 计算动画进度（0 到 1）
  
      // 根据缓动函数调整进度
      if (typeof easing === 'function') {
        progress = easing(progress);
      }
  
      // 更新属性值
      for (var prop in properties) {
        var newValue = initialValues[prop] + changes[prop] * progress;
        element.style[prop] = newValue + 'px';
      }
  
      // 动画结束判断
      if (currentTime < duration) {
        // 继续执行动画
        requestAnimationFrame(updateAnimation);
      } else {
        // 动画完成
        if (typeof complete === 'function') {
          complete();
        }
      }
    }
  
    // 开始动画
    requestAnimationFrame(updateAnimation);
  }