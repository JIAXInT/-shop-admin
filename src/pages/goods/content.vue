<template>
  <FromDrawer
    ref="formDrawerRef"
    title="设置商品详情"
    size="50%"
    destroy-on-close
    @submit="submit"
  >
    <el-form :model="form">
      <el-form-item>
        <Editor v-model="form.content" />
      </el-form-item>
    </el-form>
  </FromDrawer>
</template>
<script setup>
import { reactive, ref } from "vue";
import FromDrawer from "@/components/FromDrawer.vue";
import Editor from "@/components/Editor.vue";
import { readGoods, updateGoods } from "@/api/goods";
import { toast } from "@/composables/util";

const formDrawerRef = ref(null);

const form = reactive({
  content: "",
});

const goodsId = ref(0);
const open = (row) => {
  goodsId.value = row.id;
  row.contentLoading = true;
  readGoods(goodsId.value)
    .then((res) => {
      form.content = res.content;
      formDrawerRef.value.open();
    })
    .finally(() => {
      row.contentLoading = false;
    });
};

const emit = defineEmits(["reloadData"]);

const submit = () => {
  formDrawerRef.value.showLoading();
  updateGoods(goodsId.value, form)
    .then((res) => {
      toast("设置商品详情成功");
      formDrawerRef.value.close();
      emit("reloadData");
    })
    .finally(() => {
      formDrawerRef.value.hideLoading();
    });
};

defineExpose({
  open,
});
</script>
<style scoped></style>
