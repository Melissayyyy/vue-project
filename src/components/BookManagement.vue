<template>
    <el-button round @click="addNewBook">导入新书</el-button>
    <el-button round @click="removeBook">图书更迭</el-button>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function addNewBook(){
    router.push('/newBook');
}
function removeBook(){
    router.push('/newBook');
}
</script>

<style scoped>

</style>