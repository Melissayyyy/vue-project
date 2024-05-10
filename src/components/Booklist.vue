<script setup lang="ts">
const handleClick = () => {
  console.log('click');
};

import { ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { Search, RefreshRight } from '@element-plus/icons-vue';
import { GetBookInfoByPageNum, discardBookById } from "@/request/api";
import { ElDialog, ElButton, ElMessage } from 'element-plus';

interface Book {
  bid: number;
  title: string;
  author: string;
  category: string;
  status: "在库" | "借出" | "已弃";
  borrowedCnt: number;
  version: number;
  time: number;
}

const tableData = ref<Book[]>([]);
const input = ref('');
let dialogVisible = ref(false);
let currentBook = ref<Book>();

let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(100);

const fetchData = async () => {
  let res = await GetBookInfoByPageNum({ pageNumber: currentPage.value });
  tableData.value = res.books.map(book => ({
    ...book,
    status: book.status === 0 ? "在库" : book.status === 1 ? "借出" : "已弃"
  }));
  total.value = res.total_books;
};

onBeforeMount(fetchData);

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchData();
};

const filteredBooks = computed(() => {
  const inputLowerCase = input.value.toLowerCase();
  return tableData.value.filter(book => (
    book.title.toLowerCase().includes(inputLowerCase) ||
    book.author.toLowerCase().includes(inputLowerCase) ||
    book.category.toLowerCase().includes(inputLowerCase) ||
    book.bid.toString().includes(inputLowerCase) ||
    book.version.toString().includes(inputLowerCase)
  ));
});

function clearInput() {
  input.value = '';
}

const DetailInfo = (book: Book) => {
  currentBook.value = book;
  dialogVisible.value = true;
};

function Edit(currentBook: Book){
  const fetchData = async () => {
  let discardres = await discardBookById({ bookID: currentBook.bid });
  if (discardres.success) {
    ElMessage.success('Book marked as discarded');
    fetchData(); // Refresh data to update view
  } else {
    ElMessage.error('Failed to discard the book: ' + discardres.message);
  }
};
}

</script>

<template>
  <div class="train-main">
    <div><h1>书库</h1></div>
    <div class="train-container">
      <div class="inputbox">
        <el-input v-model="input" style="width: 240px" placeholder="模糊搜索：编号/书名/分类/作者/出版年份（不区分大小写）" :icon="Search" />
        <el-button :icon="RefreshRight" class="inside-button" @click="clearInput" />
      </div>
      <el-table :data="filteredBooks" style="width: 100%" class="form-container">
        <el-table-column prop="bid" label="图书编号" width="150"/>
        <el-table-column prop="title" label="书名" width="250"/>
        <el-table-column prop="category" label="分类" width="100"/>
        <el-table-column prop="author" label="作者" width="200"/>
        <el-table-column prop="version" label="出版年份" sortable width="120"/>
        <el-table-column prop="status" label="状态" width="120"/>
        <el-table-column prop="borrowedCnt" label="出借次数" sortable width="120"/>
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="DetailInfo(row)">Detail</el-button>
            <el-button link type="primary" size="small" @click="Edit(row)" v-if="row.status !== '已弃'">Discard</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next" :total="total" />
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
.inputbox{
  display: flex;
  width:100%;
}
.form-container{
    display: flex;
    flex-grow: 1;
    overflow: auto;
    width: 100%;
    table-layout: fixed;
}
</style>
