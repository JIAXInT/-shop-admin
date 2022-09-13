import { reactive, ref } from "vue";
import { showModal, toast } from "@/composables/util";
import { logout, updatepassword } from "@/api/manager.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";


export function useRepassword() {

    const router = useRouter();
    const store = useStore();

    //修改密码部分
    const fromDrawerRef = ref(null);

    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: "",
    });

    //表单验证规则
    const rules = {
        oldpassword: [
            { required: true, message: "旧密码不能为空", trigger: "blur" },
        ],
        password: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
        repassword: [{ required: true, message: "确认密码", trigger: "blur" }],
    };

    const formRef = ref(null);

    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false;
            }
            fromDrawerRef.value.showLoading();
            updatepassword(form)
                .then((res) => {
                    toast("修改密码成功，请重新登录");
                    store.dispatch("logout");
                    router.push("/login");
                })
                .finally(() => {
                    fromDrawerRef.value.hideLoading();
                });
        });
    };

    const openRepasswordForm = () => fromDrawerRef.value.open();

    return {
        fromDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRepasswordForm,
    };
}

//退出登录
export function useLogout() {

    const router = useRouter();
    const store = useStore();

    function handleLogout() {
        showModal("是否退出登录").then((res) => {
            logout().finally(() => {
                store.dispatch("logout");
                // 跳转回登录页
                router.push("/login");
                //提示退出登录成功
                toast("退出登录成功");
            });
        });
    }

    return { handleLogout }
}