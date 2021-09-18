/*
    轮播图查看多组件
*/
import React, { Fragment, useEffect } from 'react'
import reactDom from 'react-dom'

const getMatrix2D = (matrixStr) => {
    let matrix = [1, 0, 0, 1, 0, 0]
    if (matrixStr) {
        matrixStr = matrixStr.substring(7, matrixStr.length - 1)
        matrix = matrixStr.split(', ')
    }
    return matrix;
}

const MoreText = (props) => {
    const { superClassName='slider-list', show = false, text='左滑查看更多' } = props

    const more_text = {
        position:'absolute',
        top: 0,
        bottom: 0,
        right: -60,
        boxSizing: 'border-box',
        width: 50,
        padding: 15,
        background: 'linear-gradient(270deg, #F2F6FF 0%, #D3E6FF 100%)',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const ulSliders = document.getElementsByClassName(superClassName)
    const myChild = (
        <div className='more_text'
            style={props.style || more_text}
        >
            <span style={{color:'#2C5EA1', fontSize:14, textAlign: 'center'}}>{text}</span>
        </div>
    )

    useEffect(()=> {
        if (ulSliders.length > 0) {
            const ulSlider = ulSliders[0]
            const myStyle = getComputedStyle(ulSlider)

            const touchFn = (e)=> {
                const matrix = getMatrix2D(myStyle.transform)
                const frame = {
                    x: Number(matrix[4] || 0),
                    y: Number(matrix[5] || 0),
                    superWidth: ulSlider.clientWidth,
                    superHeight: ulSlider.clientHeight,
                    width: more_text.width
                }
                if (e.type === 'touchstart') {
                    
                }else if (e.type === 'touchmove') {
                    show && props.onScroll && props.onScroll(frame)
                }else {
                    show && props.onScrollEnd && props.onScrollEnd(frame)
                }
                
            }
            ulSlider.ontouchmove = touchFn

            ulSlider.ontouchend = touchFn

        }
    })

    return (
        <Fragment>
        {
            ulSliders.length > 0 && show ?
            reactDom.createPortal(props.children || myChild, ulSliders[0])
            :null
        }    
        </Fragment>
    )

}

export default MoreText;