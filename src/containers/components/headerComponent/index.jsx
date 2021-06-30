import React from 'react'
import { NavBar, Icon } from "antd-mobile";
import NavStacky from './navStacky'
import './index.less'

class Header extends React.Component {
    static defaultProps = {
        mini: true,
        onlyClose:false
    }
    constructor(props){
        super(props)
        const isRootRoute = NavStacky.isRootRoute();
        this.state = {
            isRootRoute:isRootRoute
        }
    }
    componentDidMount() {
       
    }

    appClose = () => {
        console.log('appClose')
        if(this.props.appClose) {
            this.props.appClose()
        }else {
            window.appClose && window.appClose()
        }
    }
    popOver = () => {
        console.log('popOver')
    }

    iconOffset = () => {
        const w = document.documentElement.clientWidth;
        let style = { marginLeft: 15 }
        if(w < 375) {
            style = { marginLeft: 5 }
        }

        return style;
    }

    rightContent = () => {
        let rightContent = []
        if (this.props.mini) {
            const com = (
                <div key={'mini_right'} 
                    className={`mini_rightIcons${this.props.onlyClose ? ' onlyClose' : ''}`}
                >
                    {
                        this.props.onlyClose === false && 
                        <>
                            <Icon type='ellipsis' size='sm' color={'#000'} onClick={this.popOver}/>
                            <div style={{background:'gainsboro',width:1,height:20,margin:'0 5px'}}></div>
                        </>
                    }
                    <Icon type='cross-circle' size='sm' color={'#000'} onClick={this.appClose}/>
                </div>
            )
            rightContent = [com]
        }else {
            rightContent = this.props.rightContent || []
        }
        return rightContent
    }
    leftContent = () => {
        return (
            <div style={{whiteSpace:'nowrap'}}>
                {
                    (this.state.isRootRoute === false || !this.props.mini) &&
                    <Icon style={{marginLeft:0}}
                        type={'left'}
                        size={'lg'}
                        color={'rgba(0,0,0,0.65)'}
                        onClick={this.props.onLeftClick || window.appHistory.goBack}
                    />
                }
                {
                    !this.props.mini &&
                    <Icon type={'cross'}
                        size={'lg'}
                        color={'rgba(0,0,0,0.65)'}
                        style={ this.iconOffset() }
                        onClick={this.appClose}
                    />
                }
            </div>
        )
    }

    render() {
        return (
            <div className='headerComponent'>
                {
                    this.props.mini ?
                    <NavBar
                        mode={'light'}
                        icon={ this.leftContent() }
                        rightContent={ this.rightContent() }
                        className={'headerComponent__mini'}
                        style={{fontWeight:'bold'}}
                    >
                        { this.props.title || this.props.children }
                    </NavBar> :
                    <NavBar
                        mode={'light'}
                        icon={ this.leftContent() }
                        rightContent={ this.rightContent() }
                        className={'headerComponent__navBar'}
                        style={{fontWeight:'bold'}}
                    >
                        { this.props.title || this.props.children }
                    </NavBar>
                }
            </div>
        )
    }

}

export default Header;