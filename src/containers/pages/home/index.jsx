import React, { /*useEffect, 
    useReducer, useState, 
    useContext, useCallback,
useLayoutEffect, useMemo */} from 'react';
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { Header } from "@com";
import StickyView from '../../components/stickyView/index'
import HeaderBanner from '../headerBanner/index'
import './index.less';

const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}
const getRandomHeight = () => {
    return  (Math.floor(Math.random() * 200)) + 100;
}

const ftDatas = [
    {
        key:'key1',
        title:'商品分类1',
        color: getRandomColor(),
        height:getRandomHeight()
    },
    {
        key:'key2',
        title:'商品分类2',
        color: getRandomColor(),
        height:getRandomHeight()
    },
    {
        key:'key3',
        title:'商品分类3',
        color: getRandomColor(),
        height:getRandomHeight()
    },
    {
        key:'key4',
        title:'商品分类4',
        color: getRandomColor(),
        height:getRandomHeight()
    },
    {
        key:'key5',
        title:'商品分类5',
        color: getRandomColor(),
        height:getRandomHeight()
    },
    {
        key:'key6',
        title:'商品分类6',
        color: getRandomColor(),
        height:getRandomHeight()
    },
    {
        key:'key7',
        title:'商品分类7',
        color: getRandomColor(),
        height:getRandomHeight()
    },
    {
        key:'key8',
        title:'商品分类8',
        color: getRandomColor(),
        height:getRandomHeight()
    },
    {
        key:'key9',
        title:'商品分类9',
        color: getRandomColor(),
        height:getRandomHeight()
    },
    {
        key:'key10',
        title:'商品分类10',
        color: getRandomColor(),
        height:getRandomHeight()
    },
]

const Home = (props={}) => {
    const navigate = useNavigate()
    
    const onClickDetail = ()=> {
        const type = 3
        switch (type) {
            case 0:
                //路由替换
                navigate('/detail',{replace: true})
                break;
            case 1:
                //跳转无参数
                navigate('/detail')
                break;
            case 2:
                //跳转传参方式一
                navigate(`/detail?title=详情传参方式一`)
                break;
            case 3:
                //跳转传参方式二
                navigate({
                    pathname:'/detail',
                    callback: (data) => {
                        //无法传递问题
                        console.log(data)
                    },
                    search: `?${createSearchParams({title: '详情传参方式二'})}`
                })
                break;
            case 4:
                //跳转传参方式三
                navigate('/detail', {
                    callback: ()=>{}, //无法传递问题
                    state: {title: '详情传参方式三', callback: ()=>{} }
                })
                break;
            case 5:
                //跳转传参方式四(restful格式传参数)
                navigate('/detail/restful格式传参数')
                break;
            default:
                break;
        }
        
    }

    return (
        <div className='homepage'>
            <Header rightContent={
                <span onClick={()=>{
                    navigate('/lottery')
                }}>活动</span>
            }>
                {'商品分类首页'}
            </Header>
            <div className='wrap_content'>
                <StickyView 
                    datas={ftDatas}
                    header={
                        <HeaderBanner 
                            onItemClick={()=>{
                                navigate('/stickyPage')
                            }}
                            onScrollEnd={()=>{
                                navigate('/stickyPage')
                            }}
                        />
                    }
                    renderItem={(item,idx) => {
                        return (
                            <div className={'renderItem'}
                                onClick={onClickDetail}
                                style={{background:item.color,height:item.height}}>
                                {item.title}
                            </div>
                        )
                    }}
                />
            </div>
            
        </div>
    )
}

export default Home;