import request from "@/utils/request.js";
import { useTokenStores } from "@/stores/token.js";

// 获取文章分类列表
export const ArticleCategories = () => {
    /* const tokenStore = useTokenStores();
    // 在请求头中携带 token
    return request.get('/category', {headers:{'Authorization': tokenStore.token}}); */
    return request.get('/category');
}

// 添加文章分类
export const addAricleCategory = (data) => {
    return request.post('/category', data);
}

// 编辑文章分类
export const updateArticleCategory = (data) => {
    return request.put('/category', data);
}

// 删除文章分类
export const deleteArticleCategory = (id) => {
/*     let abc = new URLSearchParams();
    abc.append('id', id); */ 
    // return request.delete('/category', { params: { id } });
    return request.delete('/category?id=' + id);
}

// 获取文章列表
export const ArticleList = (data) => {
    return request.get('/article', {params: data});
}

// 新增文章
export const addArticle = (data) => {
    return request.post('/article', data);
}

// 更新文章
export const BianJiArticle = (row) => {
    return request.put('/article', row);
}

// 删除文章
export const deleteArticle = (id) => {
    return request.delete('/article', { params: { id: id } });
}