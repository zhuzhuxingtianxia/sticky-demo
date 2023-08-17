/**
 * @description 数字时钟
*/

import React, { useEffect, useState, useRef } from 'react';
import { Header } from "@com";
import './index.less';

const DigitalClock = (props)=> {

    return (
        <div className='digital-clock'>
             <Header>{'数字时钟'}</Header>
             <div className='container'>
                <div className='clock-dev'>
                    <span className='span1' style={{'--num': 0}}></span>
                    <span className='span2'></span>
                    <span className='span3'></span>
                </div>
             </div>
        </div>
    )
}

export default DigitalClock;