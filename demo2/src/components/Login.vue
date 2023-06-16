<template>
  <div id="login">
    <div>
      <div class="form-wrap">
        <ul class="menu-tab">
          <li :class="{ current: current_menu === item.type }" v-for="item in data.tab_menu" :key="item.type"
            @click="toggleMenu(item.type)">
            {{ item.label }}
          </li>
        </ul>
        <el-form :model="data.form" ref="account_form" :rules="data.form_rules" label-width="80px">
          <el-form-item prop="username">
            <label class="form-label">用户名</label>
            <el-input type="password" v-model="data.form.username" />
          </el-form-item>
          <el-form-item prop="password">
            <label class="form-label">密码</label>
            <el-input type="password" v-model="data.form.password" />
          </el-form-item>
          <el-form-item v-show="current_menu === 'register'" prop="passwords ">
            <label class="form-label">确认密码</label>
            <el-input type="password" v-model="data.form.passwords" />
          </el-form-item>
          <el-form-item prop="code">
            <label class="form-label">验证码</label>
            <el-row :gutter="10">
              <el-col :span="14">
                <el-input v-model="data.form.code"></el-input>
              </el-col>
              <el-col :span="10">
                <el-button type="success" class="el-button-block" @click="handleGetCode">获取验证码</el-button></el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" class="el-button-block" :disabled="data.submit_button_disabled"
              :loading="data.submit_button_loading" @click="submitForm">{{ current_menu === "login" ? "登录" : "注册"
              }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
import { reactive, ref, getCurrentInstance, onBeforeUnmount } from "vue";
import {
  validate_email,
  validate_password,
  validate_code,
} from "@/utils/validate";
import { GetCode } from "@/api/common";
import { Register, Login } from "@/api/account";
import sha1 from "js-sha1"; //密码加密
// ErrorHttp
export default {
  setup() {
    const instance = getCurrentInstance();
    const { proxy } = getCurrentInstance();
    console.log("instance", instance);
    // console.log("proxy", proxy);
    // 用户名校验
    const validate_name_rules = (rule, value, callback) => {
      let regEmail = validate_email(value);
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!regEmail) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };

    //获取验证码
    const handleGetCode = () => {
      const username = data.form.username;
      const password = data.form.password;
      const passwords = data.form.passwords;
      //校验用户名
      if (!validate_email(username)) {
        proxy.$message({
          message: "用户名不能为空 或 格式不正确",
          type: "error",
        });
        return false;
      }

      //校验密码
      if (!validate_password(password)) {
        proxy.$message({
          message: "密码不能为空 或 格式不正确",
          type: "error",
        });
        return false;
      }

      //判断为注册时,校验两次密码
      if (data.current_menu === "redister" ** (password !== passwords)) {
        proxy.$message({
          message: "两次密码不一致",
          type: "error",
        });
        return false;
      }
      //获取验证码接口
      const requestData = {
        username: data.form.username,
        module: "register",
      };

      data.code_button_loading = true;
      data.code_button_text = "发送中";
      GetCode(requestData)
        .then((res) => {
          // console.log("123", res.data);验证码
          // const data=res.resCode

          const data = res;
          if (data.resCode === 1024) {
            proxy.$message.error(data.message);
            return false;
          }
          // 成功 Elementui 提示
          proxy.$message({
            message: data.message,
            type: "success",
          });
          //执行倒计时
          countdown();
        })
        .catch((err) => {
          console.log(err);
          data.code_button_loading = false;
          data.code_button_text = "发送验证码";
        });

      // ErrorHttp(requestData)
      //   .then((res) => {
      //     console.log(res.data);
      //     // const data=res.resCode
      //     const data = res.data;
      //     if (data.resCode === 1024) {
      //       proxy.$message.error(data.message);
      //       return false;
      //     }
      //     // 成功 Elementui 提示
      //     proxy.$message({
      //       message: data.message,
      //       type: "success",
      //     });
      //     //执行倒计时
      //     countdown();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     data.code_button_loading = false;
      //     data.code_button_text = "发送验证码";
      //   });
    };

    /** 倒计时 */
    const countdown = (time) => {
      if (time && typeof time !== "number") {
        return false;
      }
      let second = time || 60; // 默认时间
      data.code_button_loading = false; // 取消加载
      data.code_button_disabled = true; // 禁用按钮
      data.code_button_text = `倒计进${second}秒`; // 按钮文本
      // 判断是否存在定时器，存在则先清除
      if (data.code_button_timer) {
        clearInterval(data.code_button_timer);
      }
      // 开启定时器
      data.code_button_timer = setInterval(() => {
        second--;
        data.code_button_text = `倒计进${second}秒`; // 按钮文本
        if (second <= 0) {
          data.code_button_text = `重新获取`; // 按钮文本
          data.code_button_disabled = false; // 启用按钮
          clearInterval(data.code_button_timer); // 清除倒计时
        }
      }, 1000);
    };

    // 组件销毁之前 - 生命周期
    onBeforeUnmount(() => {
      clearInterval(data.code_button_timer); // 清除倒计时
    });

    // 校验确认密码
    const validate_password_rules = (rule, value, callback) => {
      let regPassword = validate_password(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!regPassword) {
        callback(new Error("请输入>=6并且<=20位的密码，包含数字、字母"));
      } else {
        callback();
      }
    };

    // 校验确认密码
    const validate_passwords_rules = (rule, value, callback) => {
      // 如果是登录，不需要校验确认密码，默认通过
      if (data.current_menu === "login") {
        callback();
      }
      let regPassword = validate_password(value);
      // 获取“密码”
      const passwordValue = data.form.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!regPassword) {
        callback(new Error("请输入>=6并且<=20位的密码，包含数字、字母"));
      } else if (passwordValue && passwordValue !== value) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    const validate_code_rules = (rule, value, callback) => {
      let regCode = validate_code(value);
      // 激活提交按钮
      data.submit_button_disabled = false;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!regCode) {
        callback(new Error("请输入6位的验证码"));
      } else {
        callback();
      }
    };

    // 提交表单
    const submitForm = () => {
      // let res = proxy.$refs.account_form;
      proxy.$refs.account_form.validate((valid) => {
        if (valid) {
          console.log("提交表单", current_menu.value);
          current_menu.value === "login" ? login() : register();
          // register();
        } else {
          alert("error submit!");
          return false;
        }
      });
      // console.log(" 提交表单", res);
    };
    /** 登录 */
    const login = () => {
      const requestData = {
        username: data.form.username,
        password: sha1(data.form.password),
        code: data.form.code,
      };
      data.submit_button_loading = true;
      Login(requestData)
        .then((response) => {
          console.log("login", response);
          data.submit_button_loading = false;
          proxy.$message({
            message: response.message,
            type: "success",
          });

          reset();
        })
        .catch((error) => {
          console.log("登录失败", error);
          data.submit_button_loading = false;
        });
    };
    //注册
    const register = () => {
      const requestData = {
        username: data.form.username,
        password: sha1(data.form.password),
        code: data.form.code,
      };
      data.submit_button_loading = true;
      Register(requestData)
        .then((res) => {
          proxy.$message({
            message: res.message,
            type: "success",
          });
        })
        .catch((error) => {
          console.log("注册错误", error);
          data.submit_button_loading = false;
        });
    };

    /** 重置 */
    const reset = () => {
      // 重置表单
      proxy.$refs.form.resetFields();
      // 切回登录模式
      data.current_menu = "login";
      // 清除定时器
      data.code_button_timer && clearInterval(data.code_button_timer);
      // 获取验证码重置文本
      data.code_button_text = "获取验证码";
      // 获取验证码激活
      data.code_button_disabled = false;
      // 禁用提交按钮
      data.submit_button_disabled = true;
      // 取消提交按钮加载
      data.submit_button_loading = false;
    };

    const data = reactive({
      form_rules: {
        username: [{ validator: validate_name_rules, trigger: "change" }],
        password: [{ validator: validate_password_rules, trigger: "change" }],
        passwords: [{ validator: validate_passwords_rules, trigger: "change" }],
        code: [{ validator: validate_code_rules, trigger: "change" }],
      },
      form: {
        username: "", // 用户名
        password: "", // 密码
        passwords: "", // 确认密码
        code: "", // 验证码
      },
      tab_menu: [
        { type: "login", label: "登录" },
        { type: "register", label: "注册" },
      ],
      /**
       * 获取验证码按钮交互
       */
      code_button_disabled: false,
      code_button_loading: false,
      code_button_text: "获取验证码",
      code_button_timer: null,
      // 提交按钮
      submit_button_disabled: true,
    });

    const toggleMenu = (type) => {
      current_menu.value = type;
    };
    let current_menu = ref(data.tab_menu[0].type);
    // const dataItem = toRefs(data);
    return {
      // ...dataItem,
      data,
      current_menu,
      toggleMenu,
      handleGetCode,
      submitForm,
      register,
      reset,
      login,
    };
  },
};
</script>


<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}

.form-wrap {
  width: 320px;
  padding-top: 100px;
  margin: auto;
}

.menu-tab {
  text-align: center;

  li {
    display: inline-block;
    padding: 10px 24px;
    margin: 0 10px;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;

    &.current {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}

.form-label {
  display: block;
  color: #fff;
  font-size: 14px;
}
</style>
