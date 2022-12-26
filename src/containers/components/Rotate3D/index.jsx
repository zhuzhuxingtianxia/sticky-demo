/*
    3D水平旋转动画
    direction: 'front'|'back'|'left'|'right'|'up'|'down'
*/
import React from "react";
import "./index.less";

const Rotate3D = (props)=> {

    const {
        sources = [
            {
                source:require("@config/source/pic_b.png"),
                direction: 'front'
            },
            {
                source:require("@config/source/pic_b.png"),
                direction: 'back'
            },
            {
                source:require("@config/source/pic_b.png"),
                direction: 'left'
            },
            {
                source:require("@config/source/pic_b.png"),
                direction: 'right'
            },
            {
                source:require("@config/source/pic_b.png"),
                direction: 'up'
            },
            {
                source:require("@config/source/pic_b.png"),
                direction: 'down'
            }
        ]
    } = props

    return (
        <div className="rotate-3d" style={props.style}>
            {
                sources && 
                sources.map((item,index) => {
                    return (
                        <div className={`face-6 ${item.direction}`} 
                            style={item.style?item.style:{}} 
                            key={index}
                        >
                            {
                                typeof item.source == 'string' ?
                                <img src={item.source} alt="" />:
                                typeof item.source == 'function' ?
                                item.source():
                                item.source
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Rotate3D;