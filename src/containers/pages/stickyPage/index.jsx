import React, { useState } from 'react';
import { Tabs } from "antd-mobile";
import $ from 'jquery'
import { Header } from "@com";
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

let isDragging = false
let pageY = 0
let isClick = false
let timeout = null;

const StickyPage = (props) => {

    const [selectPage,setSelectPage] = useState(0)

    const onTabClick = (key) => {
        const index = ftDatas.findIndex(item => item.key == key) ?? 0
        isClick = true
        if(timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(()=>{
            isClick = false
        },500)

        setSelectPage(index)

        let mode = 0
        if(mode === 1) {
            const contentNode = document.getElementById('content')
            const domNode = contentNode.childNodes[index]
            domNode.scrollIntoView({behavior: 'smooth', block: 'start'})
        }else {
            const contentNode = document.getElementById('content')
            const domNode = document.getElementById('ftbody')
            const stickyNode = document.getElementsByClassName('card_sticky')[0]
            
            let tmpIndx = 0;
            let offsetY = contentNode.offsetTop - stickyNode.clientHeight;
            while(tmpIndx < index){
                offsetY += contentNode.childNodes[tmpIndx].clientHeight;
                tmpIndx++
            }

            if(mode === 2) {
                //无动画
                domNode.scrollTo(0,offsetY)
            }else if(mode === 3){
                //浏览器有动画，iOS无动画
                const scrollOption = {
                    top:offsetY,
                    left:0,
                    behavior:'smooth'
                }
                domNode.scrollTo(scrollOption)
            }else {
                $('#ftbody').animate({scrollTop: offsetY}, 300)
            }

        }

    }

    const onScroll = (e) => {
        if(isDragging || !isClick) {
            const contentNode = document.getElementById('content')
            let selectIndex = 0
            if(e.target.scrollTop > contentNode.offsetTop){
                const stickyNode = document.getElementsByClassName('card_sticky')[0]
                let offsetY = contentNode.offsetTop - stickyNode.clientHeight + contentNode.childNodes[selectIndex].clientHeight;
                while(e.target.scrollTop > offsetY) {
                    selectIndex += 1
                    offsetY += contentNode.childNodes[selectIndex].clientHeight;
                }
            } 
            if(selectIndex !== selectPage) {
                setSelectPage(selectIndex)
            }
        }
    }

    const onTouchMove = (e) => {
        isDragging = true
        
        if (pageY > e.touches[0].pageY) {
            console.log('👆')
        }else if(pageY < e.touches[0].pageY) {
            console.log('👇')
        }
    }

    const onTouchEnd = () => {
        isDragging = false
    }

    return (
        <div className={'ft_detail'}>
            <Header title={'滑动置顶'}/>
            <div className={'ft_detail__ft_body'}
                id={'ftbody'}
                onScroll={onScroll}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className={'card_header'}></div>
                <div className={'card_modules'}>
                    <div className={'card_sticky'}>
                        <Tabs
                            activeKey={ftDatas[selectPage].key}
                            onChange={onTabClick}
                        >
                        {
                            ftDatas.map((item,index)=> {
                                return <Tabs.Tab title={item.title} key={item.key} />
                            })
                        }
                        </Tabs>
                    </div>
                    <div className={'card_modules__content'} 
                        id={'content'}
                    >
                        {
                            ftDatas &&
                            ftDatas.map((card,index) => {
                                return (
                                    <div key={index} id={card.key} 
                                        style={{background:card.color,height:card.height}}>
                                        {card.title}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default StickyPage;