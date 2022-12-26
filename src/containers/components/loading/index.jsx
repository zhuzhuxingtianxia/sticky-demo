import React from 'react'
import { SpinLoading } from "antd-mobile";

export default class LoadingPage extends React.Component {
    static defaultProps = {
        loading: true
    }

    render() {
        return (
            <div className='loading-page'>
                <SpinLoading style={{ '--size': '32px' }} />
            </div>
        )
    }

}