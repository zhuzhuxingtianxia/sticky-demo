/**
 * @description 自定义webview
 * @example 其他h5项目发送消息举例:
 * if(window.parent && window.parent !== window) {
        window.parent.postMessage(JSON.stringify({
            type: 'GMember',
            body: {
            data: '中国嘻嘻'
            }
        }),'*')
    }else {
        console.log('此处不在iframe中')
    }
 * @example 其他web项目接收消息举例:
    window.addEventListener('message', (event)=> {
        if(event.data && event.data.type == 'injectScript') {
            eval(event.data.script);
        }else if(event.data && event.data.type == 'GMember') {
            console.log(event.data)
        }
    })
 * @returns 
    <button 
        style={{height: 40}}
        onClick={()=>{
            webViewRef.current.sendMessage('SendMessageToJsPayResult',{a:'a',b:'n'});
    }}>按钮</button>
    <WebView 
        ref={webViewRef}
        onLoadFinsh={()=>{
            if(webViewRef.current) {
                webViewRef.current.injectScript(`alert('Hello, world!');`)
            }
        }}
        onMessage={data => {
            console.log('接收消息：',data);
        }}
    />
*/

import React, {useEffect, useRef } from "react";

const WebView = React.forwardRef((props, ref) => {

    const {
        src="",
        style={},
        onMessage,
        onLoadFinsh
    } = props;

    React.useImperativeHandle(ref, () => ({
        // postMessage 防止冲突
        sendMessage: (type,data)=>{
            if(webRef.current) {
                try {
                    getIframeContentWindow(webRef.current).postMessage({type,data}, '*')
                } catch (error) {
                    
                }
                
            }else {
                throw new Error('无法获取 iframe 的对象');
            }
        },
        injectScript: (scriptString)=> {
            try {
                getIframeContentWindow(webRef.current).postMessage({
                    type: 'injectScript',
                    script: scriptString
                }, '*')
            } catch (error) {
                
            }
            
        },
        // 同源策略
        same_injectScript: (scriptString)=> {
            try {
                // 跨域时无法获取到document,
                if(window.location.origin == getIframeContentWindow(webRef.current).location.origin) {
                    const script = document.createElement('script');
                    script.innerHTML = scriptString;
                    // script.textContent = scriptString;
                    getIframeContentWindow(webRef.current).document.head.appendChild(script);
                }
                
            } catch (error) {
                
            }
            
        }
    }));

    const webRef = useRef(null);

    useEffect(()=>{
        const messageListener = (event)=> {
            if (window == event.source) return;
            if(event.data) {
                const data = JSON.parse(event.data);
                if(data.type == 'GMember') {
                    console.log(data)
                }
                onMessage && onMessage(data);
            }
            // 可以使用 event.source.postMessage(...) 向回发送消息
        }
        window.addEventListener('message', messageListener);
        return ()=> {
            window.removeEventListener('message', messageListener);
        }
    },[])

    const getIframeContentWindow = (iframe)=> {
        if (iframe.contentWindow) {
          return iframe.contentWindow;
        } else if (iframe.contentDocument && iframe.contentDocument.defaultView) {
          return iframe.contentDocument.defaultView;
        } else {
          throw new Error('无法获取 iframe 的内容窗口');
        }
      }

    return (
        <div style={{display: 'flex',width: '100vw', height: '100vh',...style}}>
            <iframe 
                style={{flex:1, border: 'none'}} 
                scrolling="no"
                sandbox={'allow-forms allow-scripts'}
                src={src}
                ref={webRef}
                onLoad={(e)=>{
                    onLoadFinsh && onLoadFinsh(e);
                    console.log('>>>>>>>>>>>>>>>>iframe 加载完成<<<<<<<<<<<<<<<<<')
                    // getIframeContentWindow(e.currentTarget).postMessage('UnityFinshed', '*');
                }}
                onError={err => {
                    console.log(err)
                }}
            />
        </div>
    )
})

export {
    WebView
}