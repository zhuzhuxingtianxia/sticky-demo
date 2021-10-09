import axios from 'axios'

function localProxy(config) {
    const url = window.location.href
    if (process.env.NODE_ENV === 'development' && 
        url.indexOf('http://localhost') > -1 && 
        (navigator.vendor.indexOf('Google') > -1 || navigator.platform == 'MacIntel')) {
        let stg = 1
        config.url = `http://localhost:3000/proxyStg${stg}${config.url}`
    }
    return config
}

// axios.defaults.baseURL = ''
axios.defaults.timeout = 60000;
let cancelAxios;
axios.interceptors.request.use(
    config => {

        config.headers.token = window.token;
        config.cancelToken = new axios.CancelToken(function executor(c) {
            cancelAxios = c;
        })
        config = localProxy(config)

        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        // return Promise.reject(response.data)
        return response;
    },
    error => {
        const errStr = `${error}`
        if (errStr.indexOf('Network') > -1) {
            console.log('网络连接失败');
        }
        return error;
    }
)

export const cancel = () => {
    cancelAxios && cancelAxios('请求被取消!')
}
export default axios;

/*
//使用
const loadData = (req={}) => {

    return new Promise(resolve, reject) => {
        axios.post(url,req)
        .then(res => resolve(res))
        .catch(err => reject(err))
    }

}
*/