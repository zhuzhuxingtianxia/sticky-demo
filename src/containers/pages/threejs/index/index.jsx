/**
 * @description three.js学习模块
*/
import React, {} from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from "@com";
import './index.less';

const Index = () => {
    const navigate = useNavigate()
    return (
        <div className="threejs-page">
            <Header title="three.js学习" />
            <div className='threejs-content'>

            </div>
        </div>
    )
}

export {
    Index
};