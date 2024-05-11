<!-- <script setup lang="ts">
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import {RegisterApi} from "@/request/api";
const router = useRouter()

const ruleFormRef = ref<FormInstance>()

const registerForm = reactive({
  studentno: '',
  userName: '',
  password: '',
  first_name:'',
  last_name:'',
  email:'',
  role:'',
})

const validateEmail = (rule: any, value: any, callback: any) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (emailRegex.test(value)) {
    return true;
  } else {
    callback(new Error('请输入有效的邮箱地址'));
  }
};
const rules = reactive({
  studentno: [{required:true, message: '请输入工号', trigger: 'blur'}],
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  first_name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  last_name: [{ required: true, message: '请输入姓氏', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' }
  ],
  role: "admin"
});


const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
    if (valid) {
      let res = await RegisterApi({
        studentno: registerForm.studentno,
//        username: registerForm.userName,
        password: registerForm.password,
        first_name: registerForm.first_name,
        last_name: registerForm.last_name,
        email: registerForm.email,
        role: "admin"
      })
      if (res.success) {
        ElMessage.success('注册成功')
        await router.push('/');
      } else {
        ElMessage.error('注册失败，请重新输入')
      }
    } else {
      ElMessage.error('注册失败，请重新输入')
      return false
    }
  })
}

function jumpToLogin() {
  router.push('/')
}

</script>

<template>
  <el-form
      ref="ruleFormRef"
      :model="registerForm"
      :rules="rules"
      style="max-width: 600px"
      label-width="auto"
      class="demo-ruleForm"
  >

    <el-form-item label="工号" prop="studentno">
      <el-input v-model="registerForm.studentno" type="studentno" autocomplete="off"/>
    </el-form-item>


    <el-form-item label="用户名" prop="userName" >
      <el-input v-model="registerForm.userName" type="text" autocomplete="off"/>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="registerForm.password" type="password" autocomplete="off"/>
    </el-form-item>

    <el-form-item label="名" prop="first_name">
      <el-input v-model="registerForm.first_name" type="text" autocomplete="off"/>
    </el-form-item>

    <el-form-item label="姓" prop="last_name">
      <el-input v-model="registerForm.last_name" type="text" autocomplete="off"/>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="registerForm.email" type="email" autocomplete="off"/>
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="submitForm(ruleFormRef)"
      >注册
      </el-button
      >
      <el-button type="primary" @click="jumpToLogin"
      >登录
      </el-button
      >
    </el-form-item>

  </el-form>
</template>

<style scoped>
/* scoped 表示样式仅应用于当前组件 */
label {
  display: block;
  margin: 20px 0 5px;
}
input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box; /* 定义尺寸计算方式 */
}
button {
  background-color: #357e86 ;
  color: rgb(255, 255, 255);
  border: blue;
  padding: 10px 20px;
  cursor: pointer;
}
button:hover {
  background-color: rgb(94, 128, 143);
}
</style> -->