<template>
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="newbookForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
        <el-form-item label="书名" prop="name">
            <el-input v-model="newbookForm.title" />
        </el-form-item>
        <el-form-item label="出版年份" prop="version">
            <el-input v-model="newbookForm.version" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
            <el-input v-model="newbookForm.author" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
        <el-select-v2
          v-model="newbookForm.category"
          :options="options"
        />
      </el-form-item>

      
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </template>


<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import {AddBook} from "@/request/api";
import { GetCategories } from '@/request/api';


interface RuleForm {
    title: string,
    version: number,
    author: string,
    category: string,
}

const ruleFormRef = ref<FormInstance>()
const formSize = ref<ComponentSize>('default')

let categories = ref<string[]>([]);
const router = useRouter()

interface Option {
  label: string;
  value: string;
}
let options = ref<Option[]>([]); //不是响应式的就没办法更新！

onMounted(async () => {
  try {
    const response = await GetCategories();
    if (response.success && response.result.categories) {
      categories.value = response.result.categories;
      options.value = categories.value.map(category => ({ label: category, value: category })) //及时更新options的值
    } else {
      console.error('Failed to fetch categories: ', response.message);
    }
  } catch (error) {
    console.error('Error fetching categories: ', error);
  }
});


const newbookForm = reactive<RuleForm>({
    title: '',
    version: 2999,
    author: '',
    category: '',
  })

  const rules = reactive<FormRules<RuleForm>>({
    title: [
    { required: true, message: '新书书名', trigger: 'blur' },
    ],
    version: [
    { required: true, message: '出版年份', trigger: 'blur' },
    ],
    author: [
    { required: true, message: '作家', trigger: 'blur' },
    ],
    category: [
        {
        required: true,
        message: '分类',
        trigger: 'change',
        },
    ],
  })


  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
    if (valid) {
        let res = await AddBook({
            title: newbookForm.title,
            version: newbookForm.version,
            author: newbookForm.author,
            category: newbookForm.category,
      })
      if (res.success) {
        ElMessage.success('新书添加成功')
        await router.push('/index/booklist');
      } else {
        ElMessage.error('注册失败请重新输入')
      }
    } else {
      ElMessage.error('注册失败请重新输入')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
</script>
  

