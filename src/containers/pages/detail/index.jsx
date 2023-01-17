/* eslint-disable */
import React, { useEffect, useReducer } from 'react';
import { useNavigate,useSearchParams,useLocation, useParams } from "react-router-dom";
import { Header } from "@com";
import Rotate3D from '@com/Rotate3D/index'
import './index.less';

const Detail = (props={}) => {
    const navigate = useNavigate()
    //接受参数方式一/方式二
    const [searchParams] = useSearchParams();
    console.log(searchParams.get('title'))
    //接受参数方式三
    const location = useLocation();
    //react-router-dom V6无法传func
    const { callback } = location || {};
    console.log(location.state)
    //接受参数方式四（restful格式传参数）
    const search= useParams()
    console.log(search)
    
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
            console.log('卸载界面')
        }
    },[])

    return (
        <div className='detail_page'>
            <Header>{'详情'}</Header>
            <div className='wrap_content'>
                <Rotate3D />
                <div onClick={()=>{
                   dispath({data: 'React'})
                 }}>{state.data}</div>
                <div onClick={()=>{
                    callback && callback('hahha')
                    debugger
                    //返回
                    navigate(-1)
                    //路由替换
                    //navigate('/home?title=回调传值', {replace: true})
                 }}>goBack</div>
            </div>
            
        </div>
    )
}

export default Detail;