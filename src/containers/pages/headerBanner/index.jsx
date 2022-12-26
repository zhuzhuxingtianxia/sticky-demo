import React, { useEffect, useState, Fragment } from 'react';
import { Swiper } from "antd-mobile";
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
        },0)
    },[])

    const onScrollEnd = (frame={}) => {
        const range = frame.x + frame.superWidth - (frame.superWidth / Math.min(datas.length, MAX_COUNT))
        if (range < -frame.width) {
            props.onScrollEnd && props.onScrollEnd()
        }
    }

    return (
        <div className='header_banner'>
            {
                datas.length > 0 &&
                <Fragment>
                    <Swiper
                        // autoplay={true}
                        // loop={true}
                        indicatorProps={{
                            style: {
                                '--dot-color': 'rgba(1, 1, 1, 0.4)',
                                '--active-dot-color': '#fff',
                                '--dot-size': '3px',
                                '--active-dot-size': '16px',
                                '--dot-border-radius': '50%',
                                '--active-dot-border-radius': '8px',
                                '--dot-spacing': '8px',
                            }
                        }}
                    >
                    {
                        datas.slice(0, Math.min(datas.length, MAX_COUNT)).map((item,index)=> {
                            return (
                                <Swiper.Item key={index} onClick={()=>{
                                    props.onItemClick && props.onItemClick(item)
                                }}>
                                    <div style={{height: imgHeight}}>
                                        <img style={{height:'100%', width:'100%'}} 
                                            src={item} alt="" 
                                            onLoad={()=>{
                                                setImgHeight(200)
                                            }}
                                        />
                                    </div>
                                </Swiper.Item>
                                
                            )
                        })
                    }
                    </Swiper>
                    <MoreText 
                        superClassName={'slider-list'}
                        show={ datas.length > MAX_COUNT }
                        onScrollEnd={onScrollEnd}
                    />
                </Fragment>
            }
        </div>
    )
}

export default HeaderBanner;