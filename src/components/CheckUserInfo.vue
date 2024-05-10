<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {GetUserInfoByPageNum} from "@/request/api";

interface User {
    id: number,
    username: string,
    role: string,
    email: string,
    first_name: string,
    last_name: string,
    is_active: boolean,
    studentno: string,
}

const tableData = ref<User[]>([]);

let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(100);


onBeforeMount(async () => {
  let res = await GetUserInfoByPageNum({
    pageNumber: 1
  })
  res.users.forEach(item => {
    tableData.value.push({
      id: item.id,
      username: item.username,
      role: item.role,
      email: item.email,
      first_name: item.first_name,
      last_name: item.last_name,
      is_active: item.is_active,
      studentno: item.studentno
    });
  });
  total.value = res.total_users
  console.log('total_pages.value:',total.value)
})


const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchData();
};
const fetchData = async () => {
  // 在这里调用 API 获取数据，使用 currentPage 作为参数
  let res = await GetUserInfoByPageNum({
    pageNumber: currentPage.value
  })
  tableData.value=[]
  res.users.forEach(item => {
    tableData.value.push({
      id: item.id,
      username: item.username,
      role: item.role,
      email: item.email,
      first_name: item.first_name,
      last_name: item.last_name,
      is_active: item.is_active,
      studentno: item.studentno
    });
  });
  total.value = res.total_users
};


</script>

<template>
   <div class="train-main">
    <div><h1>学生信息</h1></div>
    
    <div class="train-container">
        <el-table
              :data="tableData"
              style="width: 100%"
              class="form-container"
              
        > 
          <el-table-column prop="username" label="用户名" width="150"/>
          <el-table-column prop="studentno" label="用户学号" width="150"/>
          <el-table-column prop="first_name" label="姓" width="150"/>
          <el-table-column prop="last_name" label="名" width="150"/>
          <el-table-column prop="email" label="邮箱" width="200"/>
          <el-table-column prop="is_active" label="学生状态" width="150"/>

        </el-table>      

    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
    />
    </div>
  </div>
</template>

<style scoped>
.train-main {
    display: flex;    
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    width: 100%;
}
.train-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    block-size: auto;
}
.inside-button{
    width: 5px;
    margin: 0;
}
.inputbox{
  display: flex;
  width:100%;
}
.form-container{
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    overflow: auto; /* 如果内容超出，显示滚动条 */
    width: 100%;
    table-layout: fixed; /* 表格列宽均匀分布 */
  }
</style>