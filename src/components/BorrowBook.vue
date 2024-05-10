<script setup lang="ts">
import { useUserstore } from "@/store/user";

const userStore = useUserstore();
const userName = userStore.userName;

const handleClick = () => {
  console.log('click')
}

import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import {Search, RefreshRight} from '@element-plus/icons-vue'
import {GetBookInfoByPageNum, DiscardBookById, BorrowABook} from "@/request/api";
import {ElDialog, ElButton, ElMessage} from 'element-plus'

interface Book {
  bid: number
  title: string
  author: string
  category: string
  status: "在库" | "出借"; // 字符串字面量类型
  borrowedCnt: number
  version: number
  time: number
}

const tableData = ref<Book[]>([]);
const input = ref('')
let dialogVisible = ref(false); // 控制对话框显示的引用
let currentBook = ref<Book | null>(null); // 当前选中的书籍数据

const DetailInfo = (book: Book) => {
  console.log('DetailInfo called', book);
  currentBook.value = book; // 设置当前书籍数据
  dialogVisible.value = true; // 显示对话框
};

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
      version: item.version,
      time: item.time
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

    tableData.value.push({
      bid: item.bid,
      title: item.title,
      author: item.author,
      category: item.category,
      status: bookStatusText, // 使用描述性文本
      borrowedCnt: item.borrowedCnt,
      version: item.version,
      time: item.time
    });
  });

  total.value = res.total_books
};



const filteredBooks = computed(() => {
  const inputLowerCase = input.value.toLowerCase(); // 将 input 的值转换成小写
  return tableData.value.filter(book => {
    const titleLowerCase = book.title.toLowerCase();
    const authorLowerCase = book.author.toLowerCase();
    const categoryLowerCase = book.category.toLowerCase();
    const bidStr = book.bid.toString(); // 将编号转换为字符串
    const versionStr = book.version.toString();

    // 检查输入值是否包含在任一字段中
    return titleLowerCase.includes(inputLowerCase) ||
           authorLowerCase.includes(inputLowerCase) ||
           categoryLowerCase.includes(inputLowerCase) ||
           versionStr.includes(inputLowerCase) ||
           bidStr.includes(inputLowerCase);
  });
});


function clearInput(){
    input.value = '';
}

interface BS_form{
    bid: number
    databorrow: string
    datareturn: string
}

let delres = ref<BS_form>();

const Borrow = async (book: Book) => {
  try {
    const response = await BorrowABook({
      bid: book.bid,
      databorrow: new Date().toISOString().split('T')[0],  // Assumes date is needed in YYYY-MM-DD format
      datareturn: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],  // Example: set return date as 30 days from now
    });
    if (response.success) {
      ElMessage.success('Book successfully borrowed');
      fetchData(); // Refresh data
    } else {
      ElMessage.error('Failed to borrow the book: ' + response.message);
    }
  } catch (error) {
    console.error('Error borrowing the book:', error);
    ElMessage.error('Error borrowing the book');
  }
};

</script>


<template>
  <div class="train-main">
    <div>
    用户名: {{ userName }}
    </div>
    <div><h1>书库</h1></div>
    
    <div class="train-container">
        <div class="inputbox">
            <el-input v-model="input" style="width: 240px" placeholder="模糊搜索：编号/书名/分类/作者/出版年份（不区分大小写）" :icon="Search"/> 
            <el-button :icon="RefreshRight" class="inside-button" @click="clearInput()"/>          
        </div>
        <el-table
              :data="filteredBooks"
              style="width: 100%"
              class="form-container"              
          > 
        <el-table-column prop="bid" label="图书编号" width="150"/>
        <el-table-column prop="title" label="书名" width="250"/>
        <el-table-column prop="category" label="分类" width="0"/>
        <el-table-column prop="author" label="作者" width="200"/>
        <el-table-column prop="version" label="出版年份" sortable width="120"/>
        <el-table-column prop="status" label="状态" width="120"/>
        <el-table-column prop="borrowedCnt" label="出借次数" sortable width="120"/>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="DetailInfo(scope.row)">
              详情
            </el-button>
            <el-button link type="primary" size="small" @click="Borrow(scope.row)">
              借阅
            </el-button>
            

            <el-dialog
              title="书籍详情"
              v-model="dialogVisible"
              width="30%"
              @close="currentBook = null"
            >
              <div v-if="currentBook">
                <p>图书编号: {{ currentBook.bid }}</p>
                <p>书名: {{ currentBook.title }}</p>
                <p>作者: {{ currentBook.author }}</p>
                <p>分类: {{ currentBook.category }}</p>
                <p>状态: {{ currentBook.status }}</p>
                <p>出借次数: {{ currentBook.borrowedCnt }}</p>
                <p>出版年份: {{ currentBook.version }}</p>
                <p>入库年份: {{ currentBook.time }}</p>
              </div>
              <template #footer>
                <span class="dialog-footer">
                  <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
                </span>
              </template>
            </el-dialog>

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