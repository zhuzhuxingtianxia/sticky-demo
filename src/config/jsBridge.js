const postParams = { method: 'setTitle', data: {} };
let actionPools = [];
window.callback = null;

class JsBridge {
    // static ReactNativeJsBridgeIsReady = false;

    static ready() {
        if (!JsBridge.ReactNativeJsBridgeIsReady) {
            return new Promise(function(resolve) {
                if (!window.JsbridgeReady) {
                    window.JsbridgeReady = [];
                }

                window.JsbridgeReady.push({
                    resolve: function() {
                        resolve();
                        JsBridge.ReactNativeJsBridgeIsReady = true;
                    }
                });
            });
        } else {
            return new Promise(function(resolve) {
                resolve(true);
            });
        }
    }


    static hasWebViewBridge() {
        return window.ReactNativeWebView;
    }

    static sendMessage(params) {
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
            JsBridge.ready().then(function() {
                window.ReactNativeWebView.postMessage(params);
            });
            return true;
        } else {
            return false;
        }
    }
    /**
     * 在app上打印网页数据
     * */
    static print(data) {
        postParams.method = 'print';
        postParams.data = data;
        JsBridge.sendMessage(JSON.stringify(postParams));
    }
    /**
         * 设置标题
         * title 标题名称
         */
    static setTitle(title) {
        postParams.method = 'setTitle';
        postParams.data = { title };
        JsBridge.sendMessage(JSON.stringify(postParams));
    }

    /**
     * 监听返回按钮事件
     */
    static setHeaderLeftClick() {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'setHeaderLeftClick';
        postParams.data = {
            actionName, params: {}
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }


    static setStatusBar(action, params) {
        postParams.method = 'setStatusBar';
        postParams.data = { action, params };
        JsBridge.sendMessage(JSON.stringify(postParams));
    }

    static getStatusBarHeight() {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'getStatusBarHeight';
        postParams.data = {
            actionName, params: {}
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 跳转原生页
     * path 原生路径 Web为Webview页面
     * params 路由参数
     *
     * 例：Jsbridge.navigate('Web', { uri:'http://localhost:8090/#/jkt/doc/company/safe'});
     * 跳转至Webview路径为http://localhost:8090/#/jkt/doc/company/safe的原生页面
     */
    static navigate(path = 'Web', params) {
        postParams.method = 'navigate';
        postParams.data = {
            path, params
        };
        JsBridge.sendMessage(JSON.stringify(postParams))

    }

    static push(path = 'Web', params) {
        postParams.method = 'push';
        postParams.data = {
            path, params
        };
        this.sendMessage(JSON.stringify(postParams))

    }

    static close() {
        postParams.method = 'close';
        postParams.data = {};
        JsBridge.sendMessage(JSON.stringify(postParams))
    }

    static backToTop() {
        postParams.method = 'navigatePopToTop';
        postParams.data = {};
        JsBridge.sendMessage(JSON.stringify(postParams))
    }
    /**
     * 跳转元宇宙
     */
     static startUnity3d(params) {

        const { actionName, promise } = this.setActionName();
        postParams.method = 'startUnity3d';
        postParams.data = { actionName: actionName,params};
        JsBridge.sendMessage(JSON.stringify(postParams));

        return promise;

    }
    /**
     * 跳转原生Webview
     * uri Webview路径
     * 例：Jsbridge.open('/#/jkt/doc/company/safe');
     */
    static open(uri) {
        uri = uri.startsWith('/') ? (window.location.origin + uri) : uri;
        postParams.method = 'open';
        postParams.data = {
            path: 'Web', params: { uri }
        };
        JsBridge.sendMessage(JSON.stringify(postParams))
    }
    /**
     * android下的webview返回
     */
    static back() {
        postParams.method = 'navigateGoback';
        postParams.data = {};
        JsBridge.sendMessage(JSON.stringify(postParams))
    }

    /**
     * Webview goback
     */
    static webviewGoback() {
        postParams.method = 'webviewGoback';
        postParams.data = {};
        JsBridge.sendMessage(JSON.stringify(postParams))
    }

    static replace(path = 'Web', params) {
        postParams.method = 'replace';
        postParams.data = {
            path, params
        };
        JsBridge.sendMessage(JSON.stringify(postParams))
    }

    static isFullScreen() {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'isFullScreen';
        postParams.data = {
            actionName, params: {}
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
    * 调用原生Services
    */
    static runServices(module = 'alert', serviceName = 'show', params = [], isLoading = true) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'services';
        postParams.data = {
            module, serviceName, params, actionName, isLoading
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 调用原生Actions
     */
    static runAction(module = 'alert', action = 'show', params = []) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'actions';
        postParams.data = {
            module, action, params, actionName
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    static async runRealName(actionName) {
        if (!actionName) {
            actionName = new Date().getTime();
        }
        postParams.method = 'realName';
        postParams.data = { actionName: actionName };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return new Promise(function(reslove) {
            if (!window[actionName]) {
                window[actionName] = function(data) {
                    reslove(data);
                };
            }
        });
    }

    static setActionName() {
        var actionName = new Date().getTime() + parseInt(Math.random() * 10000, 10);
        if (window[actionName]) {
            return JsBridge.setActionName();
        } else {
            const promise = new Promise((resolve) => {
                window[actionName] = resolve;
            });
            return {
                actionName, promise
            };
        }
    };

    static updateHistory(history) {
        postParams.method = 'updateHistory';
        postParams.data = {
            history
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
    };

    /**
     * 原生打开Linking Url
     * Url
     * 例：Jsbridge.link('/#/jkt/doc/company/safe');
     */
    static link(url) {
        postParams.method = 'link';
        postParams.data = {
            link: url
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
    }

    static canOpenLink(url) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'canOpenLink';
        postParams.data = {
            link: url, actionName
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    static share(shareParams) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'share';
        postParams.data = { actionName: actionName, params: shareParams };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    };

    static shareBoard(shareParams) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'shareboard';
        postParams.data = { actionName: actionName, params: shareParams };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    };

    static saveImageToPhotosAlbum(uri) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'saveImageToPhotosAlbum';
        postParams.data = { actionName: actionName, params: { uri } };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    };
    /**
     * 保存base64图片
     */
    static saveImgBase64(imgData) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'saveImgBase64';
        postParams.data = {
            actionName,
            params: { imgData }
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 拨打电话
     * tel 电话号码
     */
    static tel(tel) {
        postParams.method = 'tel';
        postParams.data = { tel };
        JsBridge.sendMessage(JSON.stringify(postParams));
    }

    /**
     * 获取设备信息
     */
    static getDeviceInfo(action) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'deviceInfo';
        postParams.data = { actionName: actionName, params: [], action };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    };

    /**
     * 获取网络信息
     */
    static getNetInfo() {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'netInfo';
        postParams.data = { actionName: actionName, params: {} };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    };

    /**
     * 请求权限
     * @param {*} permission
     */
    static requestPermission(permission) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'requestPermission';
        postParams.data = { actionName: actionName, params: { method: permission } };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    };

    /**
     * 选择图片
     */
    static imagePicker(params) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'imagePicker';
        postParams.data = { actionName: actionName, params };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 选择图片
     */
    static camera(params) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'camera';
        postParams.data = { actionName: actionName, params };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 下载图片
     */
    static downloadFile(params) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'downloadFile';
        postParams.data = { actionName: actionName, params };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 图片保存至相册
     */
    static saveImageToPhotosAlbum(uri) {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'saveImageToPhotosAlbum';
        postParams.data = { actionName: actionName, params: { uri } };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
    * 获取地理位置
    */
    static geolocation() {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'geolocation';
        postParams.data = {
            actionName
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
    * 获取城市
    */
    static getLocalCity() {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'getLocalCity';
        postParams.data = {
            actionName
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 银行卡扫描
     * platform:使用平台，百度:baidu,商汤:sense
     */
    static startBankCard(platform = 'sense') {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'startBankCard';
        let params = { platform };
        postParams.data = {
            actionName, params
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 身份证扫描
     * type:正反面
     * platform:使用平台，百度:baidu,商汤:sense
     */
    static startIdCard(type, platform = 'sense') {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'startIdCard';
        let params = { type, platform };
        postParams.data = {
            actionName, params
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 活体失败
     * platform:使用平台，百度:baidu,商汤:sense
     */
    static startLiveness(platform = 'sense') {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'startLiveness';
        let params = { platform };
        postParams.data = {
            actionName, params
        };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 实名认证校验
     */
    static verifyRealName(message) {
        const { actionName, promise } = this.setActionName();
        postParams.method = 'realNameVerify';
        postParams.data = { actionName: actionName, params: { message } };
        this.sendMessage(JSON.stringify(postParams));
        return promise;
    }


    /**
         * U盟track
         */
    static UmengTrack(umengPramas, content, extra) {
        postParams.method = 'UmengTrack';
        postParams.data = { umengPramas, content, extra };
        JsBridge.sendMessage(JSON.stringify(postParams));
    }

    /**
     * 获取app版本号以及渠道信息
     */
    static getAppInfo() {
        const { actionName, promise } = JsBridge.setActionName();
        postParams.method = 'appInfo';
        postParams.data = { actionName: actionName };
        JsBridge.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 打开智齿客服
     */
    static startZCSobot() {
        postParams.method = 'startZCSobot';
        postParams.data = {};
        JsBridge.sendMessage(JSON.stringify(postParams));
    }

    /**
     * 保存数据
     * */
    static setStorage(data) {
        postParams.method = 'setStorage';
        postParams.data = data;
        this.sendMessage(JSON.stringify(postParams));
    }

    /**
     * 读取数据
     * */
    static getStorage(key) {
        const { actionName, promise } = this.setActionName();
        postParams.method = 'getStorage';
        postParams.data = { actionName: actionName, key };
        this.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 打开和缓
     * */
    static startHHDoctor(userToken) {
        postParams.method = 'startHHDoctor';
        postParams.data = { userToken };
        this.sendMessage(JSON.stringify(postParams));
    }

    /**
     * 添加监听事件桥接(监听当前页面navigation)
     */
    static addListener(eventName = 'didFocus') {
        const { actionName, promise } = this.setActionName();
        postParams.method = 'addListener';
        postParams.data = { actionName: actionName, params: { eventName } };
        this.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 打开小程序
     */
    static jumptominiprogram(params){
        const { actionName, promise } = this.setActionName();
        postParams.method = 'jumptominiprogram';
        postParams.data = { actionName: actionName,params};
        this.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 支付宝支付
     */
    static aliPay(payResult){
        const { actionName, promise } = this.setActionName();
        postParams.method = 'aliPay';
        postParams.data = { actionName: actionName,payResult};
        this.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * ios内购
     */
    static iapPay(productId) {
        const { actionName, promise } = this.setActionName();
        postParams.method = 'iapPay';
        postParams.data = { actionName: actionName,productId};
        this.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 微信支付
     */
    static wxPay(payResult){
        const { actionName, promise } = this.setActionName();
        postParams.method = 'wxPay';
        postParams.data = { actionName: actionName,payResult};
        this.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 调用原生NativeModules
     */
    static nativeModules(module = 'SysModule', action = '', params = []) {
        const { actionName, promise } = this.setActionName();
        postParams.method = 'nativeModules';
        postParams.data = {
            module, action, params, actionName
        };
        this.sendMessage(JSON.stringify(postParams));
        return promise;
    }

    /**
     * 版本号比较
     */
    static compareVersion(v1, v2) {
        if (v1 === v2) {
            return 0;
        } else {
            let arr1 = v1.split('.');
            let arr2 = v2.split('.');
            let ret = -1;
            for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
                let n1 = '0';
                let n2 = '0';
                if (arr1.length > i) {
                    n1 = arr1[i];
                }
                if (arr2.length > i) {
                    n2 = arr2[i];
                }
                if (n1 > n2) {
                    ret = 1;
                    break;
                } else if (n1 < n2) {
                    ret = -1;
                    break;
                }
            }

            return ret;
        }
    }
    /**
     * 读取用户信息
     * */
     static getCurrentUserInfo() {
        const { actionName, promise } = this.setActionName();
        postParams.method = 'getCurrentUserInfo';
        postParams.data = { actionName: actionName};
        this.sendMessage(JSON.stringify(postParams));
        return promise;
    }

}

window.JsBridge = JsBridge;
export default JsBridge;
