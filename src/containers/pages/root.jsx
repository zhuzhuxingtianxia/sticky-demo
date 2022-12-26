import React,{ Fragment } from 'react';
import Router from "../../config/Router";

class Root extends React.Component {

    render(){
        return (
            <Fragment>
                <Router {...this.props}/>
            </Fragment>
        )
    }
}

export default Root;