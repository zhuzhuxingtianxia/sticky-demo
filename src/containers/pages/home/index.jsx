import React from 'react';
import { useHistory } from "react-router-dom";
import { Header } from "@com";
import StickyView from '../../components/stickyView/index'
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
    const history = useHistory()

    const onClickDetail = ()=> {
        history.push('/detail')
    }

    return (
        <div className='homepage'>
            <Header>{'商品分类商品分类商品分类s首页'}</Header>
            <div className='wrap_content'>
                <StickyView 
                    datas={ftDatas}
                    header={
                        <div className='headerBanner'>
                            <div style={{padding:50}} onClick={()=>{
                                history.push('/stickyPage')
                            }}>stickyPage</div>
                        </div>
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