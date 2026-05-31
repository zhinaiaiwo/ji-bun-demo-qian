//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'
//定义一个变量,记录公共的前缀  ,  baseURL
// const baseURL = 'http://localhost:8080';
const baseURL = '/api';
const instance = axios.create({ baseURL })


/* import {useRouter} from 'vue-router'
const router = useRouter(); */
import router from '@/router'
//添加响应拦截器
instance.interceptors.response.use(
    result => {
        if (result.data.code === 0) {
            return result.data;
        }
        // alert(result.data.message? result.data.message : '服务异常');
        ElMessage.error(result.data.message ? result.data.message : '服务异常');
        return Promise.reject(result.data); //异步的状态转化成失败的状态
    },
    err => {
        // 判断响应状态码，如果是 401 则证明未登录，提示用户登录，并跳转到登录页面
        if (err.response.status === 401) {
            ElMessage.error('请先登录');
            router.push('/login');
        }else{
            ElMessage.error('服务异常');
        }
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

import { useTokenStores } from '@/stores/token.js'
// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 请求前的回调
        const tokenStore = useTokenStores();
        // 判断是否存在 token，如果存在则在请求头中携带 token
        if (tokenStore.token) {
            config.headers['Authorization'] = tokenStore.token;
        }
        return config;
    },
    (error) => {
        // 请求错误的回调
        return Promise.reject(error);
    }
)


export default instance;