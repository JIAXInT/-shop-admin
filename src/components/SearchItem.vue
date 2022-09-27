<template>
  <el-col :span="8" :offset="0">
    <el-form-item label="关键词"> <slot /> </el-form-item
  ></el-col>
</template>
<script setup>
import { reactive, ref } from "vue";
defineProps({
  label: String,
});
</script>
<style scoped></style>
