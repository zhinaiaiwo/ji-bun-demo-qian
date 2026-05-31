import {defineStore} from 'pinia'
import {ref} from 'vue'

const useUserInfoStore = defineStore('userInfo', () => {
    // 定义一个响应式数据
    const Info = ref({})

    // 修改 Info 的值
    const setUser = (newInfo) => {
        Info.value = newInfo;
    }

    // 清空 Info 的值
    const removeUserInfo = () => {
        Info.value = {};
    }

    return {
        Info, setUser, removeUserInfo
    }
},
{persist:true}
)

export default useUserInfoStore;