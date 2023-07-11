<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Plus,
} from '@element-plus/icons-vue'
</script>

<template>
  <div>
    <div>
      boya
    </div>

    <el-button type="primary" size="default" :icon="Plus" @click="">主要按钮</el-button>
    <el-button type="success" size="small" :icon="Edit" @click=""></el-button>
    <el-button type="danger" size="default" :icon="Delete" @click=""></el-button>

  </div>
</template>

<style scoped></style>
