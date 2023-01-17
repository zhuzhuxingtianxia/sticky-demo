import React from 'react'
import { SpinLoading } from "antd-mobile";

export default class LoadingPage extends React.Component {
    static defaultProps = {
        loading: true
    }

    render() {
        return (
            <div className='loading-page' style={{width: '100%',height:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <SpinLoading style={{ '--size': '32px' }} />
            </div>
        )
    }

}