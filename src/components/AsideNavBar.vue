<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
const router = useRouter()

function change(key: string, keyPath: string[]) {
  console.log(key)
}
function jumpToAddUser() {
  router.push('/addUser')
}


</script>

<template>
  <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :router=true
  >
    <el-menu-item index="/index/booklist">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <span>查看图书信息</span>
    </el-menu-item>
    <el-menu-item index="/index/checkUserInfo">
      <el-icon>
        <document/>
      </el-icon>
      <span>查看借阅信息</span>
    </el-menu-item>
    <el-menu-item index="/index/bookManagement">
      <el-icon>
        <setting/>
      </el-icon>
      <span>图书管理</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
</style>