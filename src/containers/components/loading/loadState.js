import { Toast } from "antd-mobile";

class LoadingState {
    // 设置loading文字
    loadText = '加载中...'

    animating = [];
    addAnimating = (data=true) => {
        if(data) {
            this.animating.push(data)
        }

        if(this.animating.length == 1){
            Toast.show({
                icon: 'loading',
                content: this.loadText,
                duration: 45,
                afterClose: ()=> {
                    console.log('Load complete!')
                }
            })
        }
    }

    reduceAnimating = ()=> {
        this.animating.shift()
        if(this.animating.length <= 0){
            Toast.clear()
            this.loadText = '加载中...'
        }
    }

}

export default new LoadingState();