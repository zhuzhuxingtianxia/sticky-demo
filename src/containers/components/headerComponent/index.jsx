import React from 'react'
import { NavBar } from "antd-mobile";
import { CloseOutline, LeftOutline,MoreOutline } from 'antd-mobile-icons'
import NavStacky from './navStacky'
import './index.less'

class Header extends React.Component {
    static defaultProps = {
        mini: false,
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

    UNSAFE_componentWillReceiveProps(nextProps) {

    }

    appClose = () => {
        console.log('appClose')
        if(this.props.appClose) {
            this.props.appClose()
        }else {
            window.appClose && window.appClose()
        }
    }
    onBack = ()=> {
        if(this.props.onLeftClick){
            this.props.onLeftClick()
        }else {
            window.history?.back()
        }
         
    }
    popOver = () => {
        console.log('popOver')
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
                            <MoreOutline  fontSize={24} color={'#000'} onClick={this.popOver}/>
                            <div style={{background:'gainsboro',width:1,height:20,margin:'0 5px'}}></div>
                        </>
                    }
                    <CloseOutline fontSize={20} color={'#000'} onClick={this.appClose}/>
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
            <div className='left-content'>
                {
                    (this.state.isRootRoute === false || !this.props.mini) &&
                    <LeftOutline style={{marginLeft:0}}
                        fontSize={22}
                        color={'rgba(0,0,0,0.65)'}
                        onClick={this.onBack}
                    />
                }
                {
                    !this.props.mini &&
                    <CloseOutline
                        fontSize={24}
                        color={'rgba(0,0,0,0.65)'}
                        style={{marginLeft: 15}}
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
                        back={null}
                        left={ this.leftContent() }
                        right={ this.rightContent() }
                        className={'headerComponent__mini'}
                        style={{fontWeight:'bold'}}
                    >
                        { this.props.title || this.props.children }
                    </NavBar> :
                    <NavBar
                        back={null}
                        left={ this.leftContent() }
                        right={ this.rightContent() }
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