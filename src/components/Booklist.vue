<script setup lang="ts">
const handleClick = () => {
  console.log('click')
}

import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import {Search, RefreshRight} from '@element-plus/icons-vue'
import {GetBookInfoByPageNum} from "@/request/api";


interface Book {
  bid: number
  title: string
  author: string
  category: string
  status: "在库" | "出借"; // 字符串字面量类型
  borrowedCnt: number
  version: number
}

const tableData = ref<Book[]>([]);
const input = ref('')


let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(100);



onBeforeMount(async () => {
  let res = await GetBookInfoByPageNum({
    pageNumber: 1
  })
  res.books.forEach(item => {
    if (!item.bid) {
        console.error("Item in 'books' array is missing 'bid' field", item);
        return;
      }
    // 根据 status 的值设置一个描述性的文本
    const bookStatusText = (item.status == 0 ? '在库' : '出借');    
    tableData.value.push({
      bid: item.bid,
      title: item.title,
      author: item.author,
      category: item.category,
      status: bookStatusText, // 使用描述性的文本而不是原始的 status 值
      borrowedCnt: item.borrowedCnt,
      version: item.version
    });
  });
  total.value = res.total_books
  console.log('total_pages.value:',total.value)
})



const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchData();
};

const fetchData = async () => {
  let res = await GetBookInfoByPageNum({
    pageNumber: currentPage.value
  })
  tableData.value=[]

  res.books.forEach(item => {
    // 检查 'id' 字段是否存在
    if (!item.bid) {
      console.error("Item in 'books' array is missing 'bid' field", item);
      return;
    }
    // 根据 status 的值设置一个描述性的文本
    const bookStatusText = (item.status == 0 ? '在库' : '出借');
    
    // 将具有描述性状态文本的项目添加到 tableData
    tableData.value.push({
      bid: item.bid,
      title: item.title,
      author: item.author,
      category: item.category,
      status: bookStatusText, // 使用描述性文本
      borrowedCnt: item.borrowedCnt,
      version: item.version
    });
  });

  total.value = res.total_books
};



// 计算属性，用于过滤
const filteredBooks = computed(() => {
    const inputLowerCase = input.value.toLowerCase(); //将 input 的值转换成小写
    return tableData.value.filter(database => {
      const nameLowerCase = database.title.toLowerCase();
      return nameLowerCase.includes(inputLowerCase);
    });
  }
)


function clearInput(){
    input.value = '';
}


</script>


<template>
  <div class="train-main">
    <div><h1>书库</h1></div>
    
    <div class="train-container">
        <!-- <div>
            <el-button round @click="newDB()">创建数据集</el-button>
        </div> -->
        <div>
            <el-input v-model="input" style="width: 240px" placeholder="按照名称搜索（不区分大小写）" :icon="Search"/> 
            <!-- <el-button :icon="Search" class="inside-button" @click="search()"/>   -->
            <el-button :icon="RefreshRight" class="inside-button" @click="clearInput()"/>          
        </div>
        <el-table
              :data="filteredBooks"
              :default-sort="{ prop: 'borrowedCnt', order: 'ascending' }"
              style="width: 100%"
              class="form-container"
          > 
        <el-table-column prop="bid" label="图书编号" width="150"/>
        <el-table-column prop="title" label="书名" width="250"/>
        <el-table-column prop="category" label="分类" width="150"/>
        <el-table-column prop="author" label="作者" width="200"/>
        <el-table-column prop="version" label="出版年份" sortable width="150"/>
        <el-table-column prop="status" label="状态" width="150"/>
        <el-table-column prop="borrowedCnt" label="出借次数" width="150"/>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick">
              Detail
            </el-button>
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>

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
}
.inside-button{
    width: 5px;
    margin: 0;
}
</style>