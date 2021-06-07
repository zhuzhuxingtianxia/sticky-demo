import React, { Fragment, useState, useEffect } from 'react';
import { Tabs } from "antd-mobile";
import $ from 'jquery'
import './index.less';

let cacheActiveIndex = 0
let isDragging = false
let isClick = false
let timeout = null;
let pageY = 0

const StickyView = (props) => {
    
    const { datas=[],page=4 } = props
    const [selectPage,setSelectPage] = useState(cacheActiveIndex)

    useEffect(() => {
        const ftBody = document.getElementById('ftbody')
        let parentNode = ftBody.parentNode.parentNode;
        while (parentNode && parentNode.nodeName !== 'BODY') {
            if (parentNode.parentNode && parentNode.parentNode.nodeName === 'BODY') {
                
            }else {
                parentNode.style['overflow'] = 'hidden'
                parentNode.style['justify-content'] = 'inherit'
                parentNode.style['align-items'] = 'inherit'
            }
            
            parentNode = parentNode.parentNode;
        }

        if (cacheActiveIndex > 0) {
            isClick = true
            if(timeout) {
                clearTimeout(timeout)
            }
            timeout = setTimeout(()=>{
                isClick = false
            },500)
            //从详情页返回滚动到原来的位置
            scrollToPostion(cacheActiveIndex,2)
        }

    },[])

    const onTabClick = (tab,index) => {
        isClick = true
        if(timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(()=>{
            isClick = false
        },500)

        cacheActiveIndex = index;
        setSelectPage(index)

        scrollToPostion(index)

    }

    const scrollToPostion = (index,mode=0) => {
        
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
                domNode.scrollTo(0,offsetY)
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
                cacheActiveIndex = selectIndex
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
        pageY = e.touches[0].pageY;
    }

    const onTouchEnd = () => {
        isDragging = false
    }

    return (
        <div className={'ft_stickyView'}>
            <div className={'ft_stickyView__ft_body'}
                id={'ftbody'}
                onScroll={onScroll}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                { props.header }
                <div className={'card_modules'}>
                    <div className={'card_sticky'}>
                        <Tabs tabs={datas}
                            page={selectPage}
                            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={page}/>}
                            onTabClick={onTabClick}
                        ></Tabs>
                    </div>
                    <div className={'card_modules__content'} 
                        id={'content'}
                    >
                        {
                            datas &&
                            datas.map((card,index) => {
                                return (
                                    <Fragment key={index}>
                                        { props.renderItem ? props.renderItem(card,index): <div></div> }
                                    </Fragment>
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