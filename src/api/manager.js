import axios from "@/axios"

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