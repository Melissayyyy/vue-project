<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { MyBorrowQuery } from "@/request/api";
import { useUserstore } from "@/store/user";

const userStore = useUserstore();
const userName = userStore.userName;

interface MyBorrowResp {
    id: string
    databorrow: string
    datereturn: string
    expired: boolean
    title: string
    author: string
    bid: string
    category: string
    version: number
}

const tableData = ref<MyBorrowResp[]>([]); // 正确的初始化为一个空数组
const cnt = ref(0); // 创建一个响应式变量来存储表格行数

onBeforeMount(async () => {
  try {
    let res = await MyBorrowQuery({ id: userName });
    console.log("API response:", res);

    if (res && Array.isArray(res.MyBorrowRespList)) {
      // 更新表格数据和行数
      tableData.value = res.MyBorrowRespList.map(item => ({
        id: userName,
        databorrow: item.databorrow,
        datereturn: item.datereturn,
        expired: item.expired,
        title: item.title,
        author: item.author,
        bid: item.bid,
        category: item.category,
        version: item.version,
      }));
      cnt.value = tableData.value.length; // 设置响应式变量 cnt 的值为表格行数
    } else {
      console.error("Response received but the 'MyBorrowRespList' key is missing or invalid:", res);
    }
  } catch (error) {
    console.error('Error during data fetch:', error);
  }
});



</script>



<template>
<div class="train-main">
    <div>
    欢迎， {{ userName }}!
    </div>
    <div><h1>借阅记录</h1></div>
    <div><h1>很厉害！总共借书{{cnt}}次</h1></div>
    
    <div class="train-container">
        <el-table
                :data="tableData"
                style="width: 100%"
                class="form-container"              
        > 
        <el-table-column prop="title" label="书名" width="230"/>
        <el-table-column prop="author" label="作者" width="200"/>
        <el-table-column prop="bid" label="图书编号" width="150"/>
        <el-table-column prop="category" label="所属类别" width="150"/>
        <el-table-column prop="databorrow" label="借书日期" width="150"/>
        <el-table-column prop="datereturn" label="还书日期" width="150"/>
        <el-table-column prop="expired" label="是否过期" width="120"/>
        <el-table-column prop="version" label="出版年份" sortable width="120"/>
    </el-table>
    
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
    overflow: auto; /* 如果内容超出，显示滚动条 */
    width: 100%;
    table-layout: fixed; /* 表格列宽均匀分布 */
  }
</style>