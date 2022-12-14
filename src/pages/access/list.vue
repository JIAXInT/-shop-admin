<template>
  <el-card shadow="never" class="border-0">
    <ListHeader @click="handleCreate" @refresh="getData" />
    <el-tree
      :data="tableData"
      :props="{ label: 'name', children: 'child' }"
      v-loading="loading"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <el-tag size="normal" :type="data.menu ? '' : 'info'">{{
            data.menu ? "菜单" : "权限"
          }}</el-tag>
          <el-icon v-if="data.icon" :size="16" class="ml-2">
            <component :is="data.icon" />
          </el-icon>
          <span>{{ data.name }}</span>

          <div class="ml-auto">
            <el-switch
              :modelValue="data.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange($event, data)"
            />
            <el-button
              text
              type="primary"
              size="normal"
              @click.stop="handleEdit(data)"
              >修改</el-button
            >
            <el-button
              text
              type="primary"
              size="normal"
              @click.stop="addChild(data.id)"
              >增加</el-button
            >
            <el-popconfirm
              title="是否删除该记录？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="handleDelete(data.id)"
            >
              <template #reference>
                <el-button text type="primary" size="normal"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>
    </el-tree>

    <FromDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="上级菜单" prop="rule_id">
          <el-cascader
            v-model="form.rule_id"
            :options="options"
            :props="{
              value: 'id',
              label: 'name',
              children: 'child',
              checkStrictlt: true,
              emitPath: false,
            }"
            placeholder="请选择上级菜单"
          />
        </el-form-item>
        <el-form-item label="菜单/规则" prop="menu">
          <el-radio-group v-model="form.menu">
            <el-radio :label="1" size="large" border>菜单</el-radio>
            <el-radio :label="0" size="large" border>规则</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon" v-if="form.menu == 1">
          <IconSelect v-model="form.icon" />
        </el-form-item>
        <el-form-item
          label="前端路由"
          prop="frontpath"
          v-if="form.menu == 1 && form.rule_id > 0"
        >
          <el-input v-model="form.frontpath"></el-input>
        </el-form-item>
        <el-form-item label="后端规则" prop="condition" v-if="form.menu == 0">
          <el-input v-model="form.condition"></el-input>
        </el-form-item>
        <el-form-item label="请求方式" prop="method" v-if="form.menu == 0">
          <el-select
            v-model="form.method"
            class="m-2"
            placeholder="选择请求方式"
            size="large"
          >
            <el-option
              v-for="item in ['GET', 'POST', 'PUT', 'DELETE']"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" :max="1000" />
        </el-form-item>
      </el-form>
    </FromDrawer>
  </el-card>
</template>
<script setup>
import { reactive, ref } from "vue";
import ListHeader from "@/components/ListHeader.vue";
import FromDrawer from "@/components/FromDrawer.vue";
import IconSelect from "@/components/IconSelect.vue";
import {
  getRuleList,
  createRule,
  updateRule,
  updateRuleStatus,
  deleteRule,
} from "@/api/rule.js";

import { useInitTable, useInitFrom } from "@/composables/useCommon.js";

const options = ref([]);
const defaultExpandedKeys = ref([]);
const { loading, tableData, getData, handleDelete, handleStatusChange } =
  useInitTable({
    getList: getRuleList,
    onGetListSuccess: (res) => {
      options.value = res.rules;
      tableData.value = res.list;
      defaultExpandedKeys.value = res.list.map((o) => o.id);
    },
    delete: deleteRule,
    updateStatus: updateRuleStatus,
  });

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit,
} = useInitFrom({
  rules: {
    title: [{ required: true, message: "公告标题不能为空", trigger: "blur" }],
    content: [{ required: true, message: "公告内容不能为空", trigger: "blur" }],
  },
  form: {
    rule_id: 0,
    menu: 0,
    name: "",
    condition: "",
    method: "GET",
    status: 1,
    order: 50,
    icon: "",
    frontpath: "",
  },
  getData,
  update: updateRule,
  create: createRule,
});

//添加子分类
const addChild = (id) => {
  handleCreate();
  form.rule_id = id;
  form.status = 1;
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}
:deep(.el-tree-node__content) {
  padding: 20px 0;
}
</style>
