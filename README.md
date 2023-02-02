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

## 样式模版及适配说明

@mixin的使用及用法

* @mixin 混入指令允许包含所有的css和sass中被允许使用的东西，还可以携带参数。

* @include 指令可以将混入（mixin）引入到文档中。

```
@mixin button($width, $height, $fontSize) {
    border-radius: $height/2;
    border-radius: $height/2;
    width: $width;
    height: $height;
    line-height: $height;
    font-size: $fontSize;
    box-sizing: content-box;
    text-align: center;
}
// 参数可设置默认值
@mixin deepButton($width, $height, $fontSize: 16px) {
    @include button($width, $height, $fontSize);
    background-image: linear-gradient(120deg, #D4BA77 0%, #FFEAB4 100%);
    border: none 0px;
    color: #624C16;
}

//混入设置可变参数
@mixin box-shadow($shadows...) {
      -moz-box-shadow: $shadows;
      -webkit-box-shadow: $shadows;
      box-shadow: $shadows;
}
 
.shadows {
  @include box-shadow(0px 4px 5px red, 2px 6px 10px blue);
}

//或
@mixin box-shadow($top, $left, $blur, $size, $color) {
   -webkit-box-shadow: $top $left $blur $size $color;
   -moz-box-shadow: $top $left $blur $size $color;
   box-shadow: $top $left $blur $size $color;
}
.box {
    @include box-shadow(2px,2px,5px,0, rgba(0,0,0,0.6));
}

//浏览器前缀使用混入
@mixin transform($property) {
  -webkit-transform: $property;
  -ms-transform: $property;
  transform: $property;
}
 
.myBox {
  @include transform(rotate(20deg));
}

```

```
//全局样式设置
html {
  font-size: 20px;
  width: 100%;
  color: #666;
  height: 100%;
}
//全局样式设置
body {
  font-family: "PingFang SC", "HanHei SC", "microsoft yahei", Arial;
  //PingFang SC, Verdana, Helvetica Neue, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
  overflow-x: hidden;
  width: 100%;
  margin: auto;
  font-weight: normal;
  font-size: 2.8 * $rem;
}

button,
input[type='button'],
input[type='reset'],
input[type='submit'] {
  appearance: none;
  cursor: pointer;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  appearance: none;
}

// 修改input的placeholder的颜色
::-webkit-input-placeholder {
  color: #999;
}

select {
  appearance: none;
}

em,
i {
  font-weight: normal;
  font-style: normal;
}

//统配设置
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

//设置disabled属性的元素为灰色
[disabled] {
    filter: grayscale(100%);
}

//兼容性设置
/*
   constant()和 env()，是IOS11新增特性，有4个预定义变量：
    safe-area-inset-left：安全区域距离左边边界的距离
    safe-area-inset-right：安全区域距离右边边界的距离
    safe-area-inset-top：安全区域距离顶部边界的距离
    safe-area-inset-bottom ：安全距离底部边界的距离

    而constant()和env()函数有个必要的使用前提，H5网页设置viewport-fit=cover的时候才生效，小程序里的viewport-fit默认是cover。
    先constant(兼容iOS<11.2)，再env(兼容ios>11.2)
*/
.container {
    min-height: 100vh;
    width: 100%;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom:  calc(10px + env(safe-area-inset-bottom));
}

 //兼容性设置 华为p40-780，iPhonex-812,iphonePlus-736
@media screen and (min-height: 780px) {
    &__navBar, &__mini {
        padding-top: 44px;
    }
}

```