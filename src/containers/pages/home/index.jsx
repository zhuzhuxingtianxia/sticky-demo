import React from 'react';
import { useHistory } from "react-router-dom";
import { Header } from "@com";
import './index.less';

const Home = (props={}) => {
    const history = useHistory()
    return (
        <div className='homepage'>
            <Header>{'首页'}</Header>
            <div className='wrap_content'>
                <div onClick={()=>{
                    history.push('/detail')
                 }}>goDetail</div>
                 <div style={{padding:50}} onClick={()=>{
                    history.push('/stickyPage')
                 }}>stickyPage</div>
            </div>
            
        </div>
    )
}

export default Home;