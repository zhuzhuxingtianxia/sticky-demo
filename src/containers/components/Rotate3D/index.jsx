/*
    3D水平旋转动画
    direction: 'front'|'back'|'left'|'right'|'up'|'down'
*/
import React,{ useState, useMemo  } from "react";
import "./index.less";

const Directions = ['front', 'back', 'left', 'right', 'up', 'down']

const Rotate3D = (props)=> {

    const {
        sources = [
            require("@config/source/1.png"),
            require("@config/source/1.png"),
            require("@config/source/2.png"),
            require("@config/source/2.png"),
            require("@config/source/3.png"),
            require("@config/source/3.png"),
        ],
        /*
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
        */
    } = props

    const list = useMemo(()=>{
        const items = sources.map((item,index)=> {
            if(Directions.length > index) {
                if(typeof item == 'object') {
                    return item
                }
                return {
                    source: item,
                    direction:Directions[index]
                }
            }
            return null
            
        })
        return items
    },[sources])

    return (
        <div className="rotate-3d" style={props.style}>
            {
                list.map((item,index) => {
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