<script setup lang="ts">
import AsideNavBar from "@/components/Admin_AsideNavBar.vue";
import Header from "@/components/Header.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header class="header"></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AsideNavBar class="SideBar"></AsideNavBar>
        </el-aside>

        <el-container>         
          <el-main>
            <RouterView></RouterView>
          </el-main>
        </el-container>

        
      </el-container>

    </el-container>
  </div>
</template>
	
<style scoped>
.common-layout {
  display: flex;
  flex-direction: column; /* 垂直布局 */
  width: 100vw; /* 视口宽度 */
  height: 100vh; /* 视口高度 */
  margin: 0;
  padding: 0;
}

.el-header {
  background-color: #333; /* 头部使用深灰色背景 */
  height: 60px;
}

.el-aside {
  background-color: #ddd;
  width: 200px; /* 宽度设定 */
  height: calc(100% - 60px); /* 减去头部的高度 */
}


.el-main {
  flex: 1; /* 占用剩余空间 */
  display: flex;
  justify-content: left;
  background-color: #eee; /* 主内容区域使用浅灰色背景 */
}



</style>
