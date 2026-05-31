<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categorys = ref([
    /* {
        "id": 3,
        "categoryName": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "categoryName": "娱乐",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "categoryName": "军事",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
    } */
])

// 获取文章分类列表,定义一个异步函数
import { ArticleCategories } from '@/api/Article.js'
const getArticleCategories = async () => {
    let date = await ArticleCategories();
    categorys.value = date.data;
}
// 调用函数获取文章分类列表
getArticleCategories();


//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
    categoryName: '',
    categoryAlias: ''
})
//添加分类表单校验
const rules = {
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    categoryAlias: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
    ]
}

import { addAricleCategory } from '@/api/Article.js'
import { ElMessage } from 'element-plus'
// 添加分类函数
const addArticle = async () => {
    // 调用接口添加分类
    let result = await addAricleCategory(categoryModel.value);
    ElMessage.success(result.message ? result.message : '添加分类成功');

    // 重新获取文章分类列表
    getArticleCategories();

    // 关闭弹窗,并重置表单数据
    categoryModel.value = {
        categoryName: '',
        categoryAlias: ''
    }
    dialogVisible.value = false;
}

// 定义变量控制编辑分类弹窗
const title = ref('')



// 显示编辑分类弹窗函数
const showDialog = (row) => {
    dialogVisible.value = true;
    title.value = '编辑分类';

    // 数据拷贝
    categoryModel.value.categoryAlias = row.categoryAlias;
    categoryModel.value.categoryName = row.categoryName;
    // 扩展 Id 属性，将来需要传递给后台接口，完成分类的编辑
    categoryModel.value.id = row.id;
}

import { updateArticleCategory } from '@/api/Article.js'
// 编辑分类函数
const updateArticle = async () => {

    let result = await updateArticleCategory(categoryModel.value);
    ElMessage.success(result.message ? result.message : '编辑分类成功');

    // 重新获取文章分类列表
    getArticleCategories();
    // 关闭弹窗,并重置表单数据
    categoryModel.value = {
        categoryName: '',
        categoryAlias: ''
    }
    dialogVisible.value = false;
}

// 删除分类函数
import { deleteArticleCategory } from '@/api/Article.js'
import { ElMessageBox } from 'element-plus'
const deleteArticle = (row) => {
    // 询问用户是否确认删除(提示框)
    ElMessageBox.confirm(
        '确认删除该分类?',
        '删除提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //调用接口
            let date = await deleteArticleCategory(row.id);
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            // 重新获取文章分类列表
            getArticleCategories();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消了删除',
            })
        })
    /* let result = await deleteArticleCategory(row.id);
    ElMessage.success(result.message ? result.message : '删除分类成功');
    // 重新获取文章分类列表
    getArticleCategories(); */
}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible = true, title = '添加分类'">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteArticle(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 添加分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分类别名" prop="categoryAlias">
                    <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title === '添加分类' ? addArticle() : updateArticle()"> 确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>