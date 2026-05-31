<script setup>
import { reactive, ref } from 'vue'

const ruleFormRef = ref()

const checkAge = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('Please input the age'))
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
        } else {
            if (value < 18) {
                callback(new Error('Age must be greater than 18'))
            } else {
                callback()
            }
        }
    }, 1000)
}

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入旧密码'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass')
        }
        callback()
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入新密码'))
    } else if (value !== ruleForm.checkPass) {
        callback(new Error("两次输入的密码不一致!"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    pass: '',
    checkPass: '',
    checkPassre: '',
})

const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' },
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 16, message: '长度必须在 5 - 16', trigger: 'blur' }
    ],
    checkPass: [{ validator: validatePass2, trigger: 'blur' },
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 16, message: '长度必须在 5 - 16', trigger: 'blur' }
    ],
    checkPassre: [{ validator: validatePass2, trigger: 'blur' },
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 16, message: '长度必须在 5 - 16', trigger: 'blur' }
    ],
})

import { ElMessage } from "element-plus"
import {useTokenStores} from '@/stores/token.js'
const useToken = useTokenStores();
import { useRouter } from 'vue-router'
const routerIs = useRouter();
import useUserInfoStore from '@/stores/userinfo.js'
let userInfoStors = useUserInfoStore();

import { updatePassword } from '@/api/user.js'
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate()/* ((valid) => {
        if (valid) {
            // console.log('submit!')
            ElMessage.success(result.message? result.message : '修改成功')
        } else {
            // console.log('error submit!')
            ElMessage.error(result.message? result.message : '修改失败')
        }
    }) */
   const requestData = {
            old_pwd: ruleForm.pass,      // 旧密码
            new_pwd: ruleForm.checkPass,  // 新密码
            re_pwd: ruleForm.checkPassre  // 确认新密码
        }
    let result = await updatePassword(requestData);
    if (result.code === 0) {
        ElMessage.success(result.message ? result.message : '修改成功')
        // 退出登录
        // 清空 pinia 内容 （token ， userInfo）
        userInfoStors.removeUserInfo();
        useToken.removeToken();
        // 跳转 /login
        routerIs.push('/login')

    } else {
        ElMessage.error(result.message ? result.message : '修改失败')
    }
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>


<template>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules" label-width="auto"
        class="demo-ruleForm">
        <el-form-item label="旧密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPassre">
            <el-input v-model="ruleForm.checkPassre" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                提交
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">清空</el-button>
        </el-form-item>
    </el-form>
</template>