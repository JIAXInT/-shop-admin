<template>
  <div class="flex items-center justify-between mb-4">
    <el-button type="primary" size="small" @click="$emit('create')"
      >新增</el-button
    >
    <el-tooltip effect="dark" content="刷新数据" placement="top">
      <el-button text @click="$emit('refresh')">
        <el-icon :size="20"><Refresh /></el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";

defineEmits(["create", "refresh"]);
</script>
<style scoped></style>
