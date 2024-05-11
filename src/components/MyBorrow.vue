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
//ref 的使用：ref 是用来保持响应式的引用，对于数组和对象应始终初始化为其直接类型（如空数组 [] 或空对象 {}），而不是直接填充一个对象，除非是确切的默认值。

//数据检查：在尝试访问可能未定义的属性之前检查了 res 和 res.myborrowresps 的存在性，这可以防止运行时错误，并提供更清晰的调试信息。

// 确保 res 和 res.myborrowresps 存在
// onBeforeMount(async () => {
//   try {
//     let res = await MyBorrowQuery({ id: userName });
//     console.log("API response:", res);  // 这将帮助你看到从 API 返回的实际响应

//     // 检查 res 是否存在，res.myborrowresps 是否是数组
//     if (res && Array.isArray(res.myborrowresps)) {
//       tableData.value = res.myborrowresps.map(item => ({
//         id: userName,
//         databorrow: item.databorrow,
//         datereturn: item.datereturn,
//         expired: item.expired,
//         title: item.title,
//         author: item.author,
//         bid: item.bid,
//         category: item.category,
//         version: item.version,
//       }));
//     } else {
//       // 提供更具体的错误信息以帮助诊断问题
//       console.error("Response received but the 'myborrowresps' key is missing or invalid:", res);
//     }
//   } catch (error) {
//     console.error('Error during data fetch:', error);
//   }
// });

onBeforeMount(async () => {
  try {
    let res = await MyBorrowQuery({ id: userName });
    console.log("API response:", res);  // 这将帮助你看到从 API 返回的实际响应

    // 检查 res 是否存在，res.myborrowresps 是否是数组
    if (res && Array.isArray(res.MyBorrowRespList)) {
      tableData.value = [];  // 先清空数组
      res.MyBorrowRespList.forEach(item => {
        tableData.value.push({
          id: userName,
          databorrow: item.databorrow,
          datereturn: item.datereturn,
          expired: item.expired,
          title: item.title,
          author: item.author,
          bid: item.bid,
          category: item.category,
          version: item.version,
        });
      });
    } else {
      // 提供更具体的错误信息以帮助诊断问题
      console.error("Response received but the 'myborrowresps' key is missing or invalid:", res);
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