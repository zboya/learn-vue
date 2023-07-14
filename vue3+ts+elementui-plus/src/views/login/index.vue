<template>
    <div class="login-container">
        <el-row class="login-bg">
            <el-col>
                <!-- 登入表单 -->
                <el-form class="login-form" size="normal">
                    <h1>Hello</h1>
                    <h2>欢迎来到这里</h2>
                    <el-form-item label="">
                        <el-input type="primary"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">登入</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>
</template>
    
<script setup lang='ts'>

</script>
    
<style scoped lang="scss">
.login-container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login-bg {
        justify-content: center;
        align-items: center;
        height: 100vh;

        // padding: 40px;
        // background-color: gray;
        .login-form {
            position: relative;
            width: 80%;
            padding: 40px;
            background: url("@/assets/images/login_form.png") no-repeat;
            background-size: cover;
        }
    }
}
</style>
