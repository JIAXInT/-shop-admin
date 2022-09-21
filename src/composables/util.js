import { ElNotification, ElMessageBox } from "element-plus";
import nprogress from 'nprogress';

// 消息提示
export function toast(message, type = 'success') {
    ElNotification({
        message,
        type,
        duration: 3000,
    });
}

export function showModal(content = '提示内容', type = 'warning', title = '') {
    return ElMessageBox.confirm(
        content,
        title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type,
        }
    )
}

//显示全屏loding
export function showFullLoading() {
    nprogress.start()
}

//隐藏全屏loding
export function hideFullLoading() {
    nprogress.done()
}

//弹出输入框
export function showPronpt(tip, value = '') {
    return ElMessageBox.prompt(tip, '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: value
    })

}