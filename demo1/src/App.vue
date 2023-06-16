<template>
  <div class="login-container">
    <el-input v-model="input" placeholder="Please input" clearable />
    <el-input v-model="input" type="password" placeholder="Please input password" show-password />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>

<style >
.login-container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #2d3a4b;
}
</style>