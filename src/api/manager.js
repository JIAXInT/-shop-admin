import axios from "@/axios"
import { queryParams } from "@/composables/util.js"

// 登录接口
export function login(username, password) {
    return axios.post('/admin/login', {
        username,
        password
    })
}

//获取用户信息
export function getinfo() {
    return axios.post('/admin/getinfo')
}

//退出登录
export function logout() {
    return axios.post('/admin/logout')
}

//修改密码
export function updatepassword(data) {
    return axios.post('/admin/updatepassword', data)
}

export function getManagerList(page, query = {}) {
    let r = queryParams(query)

    return axios.get(`/admin/manager/${page}${r}`)
}

export function updateManagerStatus(id, status) {
    return axios.post(`/admin/manager/${id}/update_status`, {
        status
    })
}

export function createManager(data) {
    return axios.post(`/admin/manager`, data)
}

export function updateManager(id, data) {
    return axios.post(`/admin/manager/${id}`, data)
}

export function deleteManager(id) {
    return axios.post(`/admin/manager/${id}/delete`)
}