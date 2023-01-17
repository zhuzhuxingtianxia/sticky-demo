# sticky-demo
效果预览：

![stickypreview](./stickypreview.gif)

项目创建：
```
create-react-app sticky-demo
```
添加`antd-mobile`:
```
npm install antd-mobile --save
```
添加`jquery`:
```
npm i jquery --save
```

## 配置（废弃）
```
npm install react-app-rewired customize-cra --save-dev
```
修改`package.json`文件。
添加`config-overrides.js`用于修改默认配置
按需加载：
```
npm install babel-plugin-import --save-dev
```
修改`config-overrides.js`文件

## 配置

```
npm install @craco/craco
```
修改`package.json`文件:
```
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
},
```
添加`craco.config.js`用于修改默认配置

## npm start

```
Don't try to install it manually: your package manager does it automatically.
However, a different version of babel-loader was detected higher up in the tree:

  /Users/jion/node_modules/babel-loader (version: 7.1.5) 

Manually installing incompatible versions is known to cause hard-to-debug issues.

If you would prefer to ignore this check, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
That will permanently disable this message but you might encounter other issues.
```

* **方案:**
    项目中创建一个 `.env` 的文件,内容写上 `SKIP_PREFLIGHT_CHECK=true`



## npm build

构建应用

## 遇到的问题

1. 在点击tab切换至对应元素时，移动端无动画效果。最后使用jquery的`animate`实现，最终目标是不依赖于第三方库实现，那么如何不使用jquery来实现呢？

2. Tabs依赖于`antd-mobile`，界面一行item的多少则是固定写死的，如何设置动态显示item的数量呢？


## 如何在类组件中使用 react-router-dom V6

方案一:
```
//Index.js
import {BrowserRouter, Routes, Route } from "react-router-dom"
class Index extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/page1" element={<NavigateComponent element={Page1} />} />
                    <Route path="/page2" element={<NavigateComponent element={Page2} />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

/*NavigateComponent.js*/
import {useNavigate} from "react-router-dom"
function NavigateComponent(props){
    const navigate = useNavigate()
    return <div>
        <props.element navigate={navigate} />
    </div>
}

//Page1.js使用
this.props.navigate("/page2")
```

方案二：
```
//withRouter.tsx
import React from "react";
import { NavigateFunction, useLocation, useNavigate, useParams } from "react-router";

export interface RoutedProps<Params = any, State = any> {
    location: State;
    navigate: NavigateFunction;
    params: Params;
}


export function withRouter<P extends RoutedProps>( Child: React.ComponentClass<P> ) {
    return ( props: Omit<P, keyof RoutedProps> ) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return <Child { ...props as P } navigate={ navigate } location={ location } params={ params }/>;
    }
}

//使用
export default withRouter(Page1);

```