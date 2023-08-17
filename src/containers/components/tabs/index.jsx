import React from "react";
import classnames from "classnames";
import './index.less';

export default class Tabs extends React.Component{

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
        const index = props.tabs.findIndex(tab => tab.key == props.activeKey)
        this.state = {
            selected: index > -1 ? index: 0
        };
    }

    componentDidMount() {
        const el = document.querySelector('.'+ Tabs.displayName + '-content');
        if(el) {
            el.style.marginLeft = `-${this.state.selected * 100}%`;
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
                                className={classnames('tabs-tab',{'tabs-tab-active': activeKey == idx})}
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    const el = document.querySelector('.'+ Tabs.displayName + '-content');
                                    el.style.marginLeft = `-${idx * 100}%`;
                                    
                                    this.props.onChange(tab.key);
                                    this.setState({selected: idx});
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
                                <div className={classnames('tabpanel',{'tabpanel-active': i == this.state.selected})}>
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