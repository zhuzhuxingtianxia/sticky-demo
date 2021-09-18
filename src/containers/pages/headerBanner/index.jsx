import React, { useEffect, useState } from 'react';
import { Carousel } from "antd-mobile";
import MoreText from './moreText';
import './index.less';
import image1 from '@config/source/image1.png'
import image2 from '@config/source/image2.png'
import image3 from '@config/source/image3.png'

const MAX_COUNT = 3

const HeaderBanner = (props={})=> {

    const [datas, setDatas] = useState([])
    const [imgHeight, setImgHeight] = useState(201)

    useEffect(()=>{
        setTimeout(()=>{
            const list = [image1,image2,image3,image1,image2,image3]
            setDatas(list)
        },100)
    },[])

    const onScrollEnd = (frame={}) => {
        const range = frame.x + frame.superWidth - (frame.superWidth / Math.min(datas.length, MAX_COUNT))
        if (range < -frame.width) {
            props.onScrollEnd && props.onScrollEnd()
        }
    }

    return (
        <div className='header_banner'>
            <Carousel
                autoplay={false}
                dots={datas.slice(0, Math.min(datas.length, MAX_COUNT).length > 1)}
                dotStyle={{width:8, height:3, borderRadius:2, background:'#ffffff', opacity:0.4 }}
                dotActiveStyle={{width:16, height:3, borderRadius:2, background:'#ffffff'}}
            >
            {
                datas.slice(0, Math.min(datas.length, MAX_COUNT)).map((item,index)=> {
                    return (
                        <div key={index}>
                            <img style={{height:imgHeight, width:'100%'}} 
                                src={item} alt="" 
                                onLoad={()=>{
                                    setImgHeight(200)
                                }}
                            />
                        </div>
                    )
                })
            }
            </Carousel>
            <MoreText 
                superClassName={'slider-list'}
                show={ datas.length > MAX_COUNT }
                onScrollEnd={onScrollEnd}
            />
        </div>
    )
}

export default HeaderBanner;