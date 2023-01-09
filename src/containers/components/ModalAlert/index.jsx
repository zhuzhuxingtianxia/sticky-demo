/**
 * Modal弹框，用法类似antd-mobile的Modal.show, 按钮可自定义
 */
import React from "react"
import {Modal} from "antd-mobile"
import "./index.less";

const show = (props) => {
    const {
        title,
        content,
        actions = [],
        onAction,
        showLine = true,
        ...reset
    } = props || {}

    const __content = () => {
        return (
            <div className="alert-body">
                {
                    title &&
                    <div className="alert-title">{title}</div>
                }
                {
                    content &&
                    <div className="alert-content">{content}</div>
                }
                {
                    actions && actions.length > 0 &&
                    <div className="alert-buttons" style={{borderTopColor: showLine ? '#D8D8D8' : 'transparent'}}>
                        {
                            actions.map((action, index) => {
                                if (action.$$typeof) {
                                    return <div className="button-action" key={index}>{action}</div>
                                } else if (typeof action == 'object') {
                                    return (
                                        <div className="button-action" key={index}
                                             style={action.style || {}}
                                             onClick={() => {
                                                 if (action.onClick) {
                                                     action.onClick(action)
                                                 } else {
                                                     onAction && onAction(action, index)
                                                 }

                                             }}
                                        >
                                            {action.text}
                                        </div>
                                    )
                                } else if (typeof action == 'function') {
                                    return <div className="button-action" key={index}>{action()}</div>
                                } else {
                                    return action
                                }
                            })
                        }
                    </div>
                }
            </div>
        )
    }
    
    Modal.show({
        maskStyle:{background: `rgba(0, 0, 0, 0.7)`},
        ...reset,
        content: __content(),
    })
}

const ModalAlert = (props={}) => {
    return (
        <Modal maskStyle={{background: `rgba(0, 0, 0, 0.7)`}} {...props} destroyOnClose={true} forceRender={false}/>
    )
}

ModalAlert.show = show;
ModalAlert.hide = Modal.clear;

export default ModalAlert;

/*
 // 指令式使用demo
 ModalAlert.show({
    title: '确认提交',
    content: '提交后结果将不可更改，确认提交当前选项吗？',
    onAction: (item, index) => {
        ModalAlert.hide()
    },
    actions: [
        {
            key: 'cancel',
            text: '取消'
        },
        {
            key: 'confirm',
            text: '确认提交',
        }
    ]
})

*/

/*
//声明式使用demo
<ModalAlert
    visible={visible}
    title={title}
    content='人在天边月上明'
    closeOnAction
    onClose={onClose}
    onAction={(action) => {
        console.log(action)
    }}
    actions={[
        {
            key: 'cancal',
            text: '取消',
            style: {
                color: '#999',
                fontSize: 15
            }
        },
        {
            key: 'confirm',
            text: '确认',
            style: {
                color:'#CAA846'
            }
        },
    ]}
/>

*/