/* eslint-disable */
import React, { useEffect } from 'react';
import { Header } from "@com";
import './index.less';

const Detail = (props={}) => {

    const [state, dispath] = useReducer((state,action)=> {
        //数据处理
        if(JSON.stringify(state) != JSON.stringify(action)) {
            return {
                ...state,
                ...action
            }
        }
        return state
    }, {
        // 设置state初始值
        count: 0,
        data: 'data'
    });

    useEffect(()=>{

        return ()=>{
            if (props.history.action === 'POP') {
                console.log('卸载界面')
            }else {
                console.log('界面跳转')
            }
        }
    },[])

    return (
        <div className='detail_page'>
            <Header>{'详情'}</Header>
            <div className='wrap_content'>
                <div onClick={()=>{
                   dispath({data: 'React'})
                 }}>{state.data}</div>
                <div onClick={()=>{
                    props.history.goBack()
                 }}>goBack</div>
            </div>
            
        </div>
    )
}

export default Detail;