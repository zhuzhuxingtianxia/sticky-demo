import React, { useState } from 'react';
import { Tabs } from "antd-mobile";
import $ from 'jquery'
import { Header } from "@com";
import './index.less';

const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

const ftDatas = [
    {
        key:'key1',
        title:'商品分类1',
        color: getRandomColor()
    },
    {
        key:'key2',
        title:'商品分类2',
        color: getRandomColor()
    },
    {
        key:'key3',
        title:'商品分类3',
        color: getRandomColor()
    },
    {
        key:'key4',
        title:'商品分类4',
        color: getRandomColor()
    },
    {
        key:'key5',
        title:'商品分类5',
        color: getRandomColor()
    },
    {
        key:'key6',
        title:'商品分类6',
        color: getRandomColor()
    },
    {
        key:'key7',
        title:'商品分类7',
        color: getRandomColor()
    },
    {
        key:'key8',
        title:'商品分类1',
        color: getRandomColor()
    },
    {
        key:'key8',
        title:'商品分类1',
        color: getRandomColor()
    },
    {
        key:'key9',
        title:'商品分类9',
        color: getRandomColor()
    },
]

let isDragging = false
let isClick = false
let timeout = null;
let pageY = 0

const StickyView = (props) => {

    const [selectPage,setSelectPage] = useState(0)

    const onTabClick = (index) => {
        isClick = true
        if(timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(()=>{
            isClick = false
        },500)

        setSelectPage(index)

        let mode = 0
        if(mode == 1) {
            const contentNode = document.getElementById('content')
            const domNode = contentNode.childNodes[index]
            domNode.scrollIntoView({behavior: 'smooth', block: 'start'})
        }else {
            const contentNode = document.getElementById('content')
            const domNode = document.getElementById('ftbody')
            const stickyNode = document.getElementsByClassName('card_sticky')[0]

            let tmpIndx = index;
            let offsetY = contentNode.offsetTop - stickyNode.clientHeight;
            while(tmpIndx > 0){
                offsetY += contentNode.childNodes[tmpIndx].clientHeight;
                tmpIndx--
            }

            if(mode == 2) {
                //无动画
                domNode.scrollTo(0,offsetY)
            }else if(mode == 3){
                //浏览器有动画，iOS无动画
                
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
            if(selectIndex != selectPage) {
                setSelectPage(selectIndex)
            }
        }
    }

    const onTouchMove = () => {
        isDragging = true
    }

    const onTouchEnd = () => {
        isDragging = false
    }

    return (
        <div className={'ft_detail'}>
            <Header title={'首页'}/>
            <div className={'ft_detail__ft_body'}
                id={'ftbody'}
                onScroll={onScroll}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className={'card_header'}></div>
                <div className={'card_modules'}>
                    <div className={'card_sticky'}>
                        <Tabs tabs={ftDatas}
                            page={selectPage}
                            renderTabBar={props => <Tabs.DefaultTabBar {...props}/>}
                            onTabClick={onTabClick}
                        ></Tabs>
                    </div>
                    <div className={'card_modules__content'} 
                        id={'content'}
                    >
                        {
                            ftDatas &&
                            ftDatas.map((card,index) => {
                                return (
                                    <div key={index} id={card.key} style={{background:card.color}}>
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

export default StickyView;