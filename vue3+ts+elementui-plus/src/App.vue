<template>
  <div>
    <div>
      boya
    </div>

    <hr>
    <el-button type="primary" size="default" :icon="Plus" @click="">主要按钮</el-button>
    <el-button type="success" size="small" :icon="Edit" @click=""></el-button>
    <el-button type="danger" size="default" :icon="Delete" @click=""></el-button>

    <hr>
    <div>svg测试</div>
    <svgIcon iconName="shouji" :size="200"></svgIcon>


  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import {
  Delete,
  Edit,
  Plus,
} from '@element-plus/icons-vue'
</script>
