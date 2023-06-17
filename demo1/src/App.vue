<template>
  <div class="login-container">
    <el-card class="login-card">
      <h1 class="title">登录</h1>
      <el-form class="form" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-button" type="primary" @click="handleSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { ElForm, ElFormItem, ElInput, ElButton, ElCard } from 'element-plus'

export default defineComponent({
  name: 'Login',
  // components: {
  //   ElForm,
  //   ElFormItem,
  //   ElInput,
  //   ElButton,
  //   ElCard
  // },
  setup() {
    const form = ref({
      username: '',
      password: ''
    })

    const rules = ref({
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    })

    const handleSubmit = () => {
      console.log('form:', form.value)
    }

    return {
      form,
      rules,
      handleSubmit
    }
  }
})
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-card {
  width: 400px;
}

.title {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.form {
  margin-top: 2rem;
}

.submit-button {
  margin-top: 1rem;
  width: 100%;
}
</style>