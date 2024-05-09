<template>
  <header class="header">
    <div class="logo-container">
      <img src="@/assets/images/background.jpeg" alt="Logo" style="height: 40px;">
      <span class="logo-text"><span class="larger">B</span>ook<span class="larger">C</span>loud</span>
    </div>

    <div class="rightitems">

        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              @click="toIndexMain"/>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
                <el-dropdown-item :icon="CirclePlusFilled">
                  Action 2
                </el-dropdown-item>
                <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
                <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
                <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="mb-4">
          <el-button type="info" plain class="sign-out" @click="logout">登出</el-button>
        </div>
    </div>
    
  </header>
</template>

<script setup lang="ts">
  import { UserFilled } from '@element-plus/icons-vue'
  import {ElMessage, ElNotification as notify} from 'element-plus'
  import {
  ArrowDown,
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from '@element-plus/icons-vue'
  import {LogoutApi} from "@/request/api";
  import {useRouter} from 'vue-router'
  const router = useRouter()
  let showDropdown = false;


  async function logout() {
    let res = await LogoutApi()
    if (res.success) {
      ElMessage.success("登出成功")
      await router.push('/')
    } else {
      ElMessage("登出失败")
    }
    console.log(res)
  }

  function toIndexMain(){
    router.push('/indexMain');
  }
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.rightitems{
  display: flex; justify-content: space-between; align-items: center;
  gap: 20px;
}
.logo-container{
  height: 100%;
  padding: 10px 20px;
  display: flex; justify-content: space-between; align-items: center;
}
.logo-text {
  font-size: 24px;
  vertical-align: middle;
  margin-left: 10px;
  color: rgb(253, 253, 253);
}
.logo-text .larger {
  font-size: 120%;
}
.user-menu img {
  cursor: pointer;
}
.dropdown-menu {
  display: none;
  position: absolute;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.dropdown-menu a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-menu a:hover {
  background-color: #f1f1f1;
}
.sign-out {
  padding: 8px 16px;
  text-decoration: none;
  border: none;
  cursor: pointer;
}
</style>