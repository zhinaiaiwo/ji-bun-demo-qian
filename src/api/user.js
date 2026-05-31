// 导入 request.js 请求工具
import request from '@/utils/request.js'

// 提供调用注册接口的函数
export const userRegisterService = (registerData) =>{
    // 借助于 UrlSearchParams 完成传递
    const params = new URLSearchParams()
    
    for (let key in registerData){
        params.append(key, registerData[key])
    }
    return request.post('/user/register', params)
}

// 登录接口函数
export const userLoginService = (loginUser) => {

    const params = new URLSearchParams()

    for (let key in loginUser){
        params.append(key, loginUser[key])
    }

    return request.post('/user/login', params)
}

// 获取用户详细信息
export const userInfo = () => {
    return request.get('/user/userInfo')
}

// 修改基本信息
export const updateUserInfo = (data) => {
    return request.put('/user/update', data)
}

// 修改头像
export const upLoadAvatar = (url) => {
    const params = new URLSearchParams();
    params.append("avatarUrl", url)
    return request.patch('/user/updateAvatar', params)
}

// 修改密码
export const updatePassword = (data) => {
    // const params = new URLSearchParams();

    return request.patch('/user/updatePwd', data)
}