// 定义 store
import { defineStore } from 'pinia'
import { ref } from 'vue'

/* 
    第一个参数：store 的唯一 名字，必填，且需要在所有组件中保持唯一
    第二个参数：一个函数，函数的内部可以定义状态的所有内容

    返回值： 函数
*/
export const useTokenStores = defineStore('token', () => {
    // 定义状态的内容

    // 响应式变量
    const token = ref('');

    // 定义一个函数，修改 token 的值
    const setToken = (newToken) => {
        token.value = newToken;
    }

    // 函数，移除 token 的值
    const removeToken = () => {
        token.value = '';
    }

    return {
        token, setToken, removeToken
    }
},{
    persist:true        // 开启持久化存储
});