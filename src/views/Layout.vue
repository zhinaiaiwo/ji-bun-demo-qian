<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import router from '@/router';

import { userInfo } from '@/api/user.js'
import useUserInfoStore from '@/stores/userinfo.js'
let userInfoStors = useUserInfoStore();
import {useTokenStores} from '@/stores/token.js'
const useToken = useTokenStores();

// 调用函数，获取用户详细信息
const getUserInfo = async () => {
    // 调用接口
    let result = await userInfo();
    // 数据存储到 pinia 中
    userInfoStors.setUser(result.data);
}

getUserInfo();

import { useRouter } from 'vue-router'
import { ElMessageBox , ElMessage} from 'element-plus'
const routerIs = useRouter();
// 条目被点击后调用的函数
const handCommand = (command) => {
    // 判断指令
    if (command === 'logout') {
        // 询问用户是否确认退出登录(提示框)
        ElMessageBox.confirm(
            '确认退出登录吗?',
            '温馨提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async () => {
                // 退出登录
                // 清空 pinia 内容 （token ， userInfo）
                userInfoStors.removeUserInfo();
                useToken.removeToken();
                // 跳转 /login
                routerIs.push('/login')

                ElMessage({
                    type: 'success',
                    message: '退出成功',
                })
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消了退出登录',
                })
            })
        // 退出登录
        // alert('退出')
    } else {
        // 路由
        routerIs.push('/user/' + command);
    }
}

console.log(userInfoStors.Info.userPic);


</script>

<template>
    <!-- Element-plus 布局容器 -->
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router>
                <el-menu-item index="/article/category">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>文章分类</span>
                </el-menu-item>
                <el-menu-item index="/article/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                <el-sub-menu>
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更换头像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <div>黑马程序员：<strong>{{ userInfoStors.Info.nickname }}</strong></div>
                <!-- 下拉菜单 -->
                <!-- @command： 条目被点击后会触发，在时事件函数上声明一个参数，接收条目对应的指令 -->
                <el-dropdown placement="bottom-end" @command="handCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStors.Info.userPic ? userInfoStors.Info.userPic : avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                            <el-dropdown-item command="resetPassword" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中间区域 -->
            <el-main>
                <!-- <div style="width: 1290px; height: 570px;border: 1px solid red;">
                    内容展示区
                </div> -->
                <router-view></router-view>
            </el-main>
            <!-- 底部区域 -->
            <el-footer>大事件 &copy;2023 Created by 黑马程序员</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>