import {createRouter, createWebHistory} from "vue-router";

import LoginUser from '@/pages/Login.vue';
import RegisterUser from "@/pages/Register.vue";
import LoginAdmin from '@/pages/Login.vue';
import RegisterAdmin from "@/pages/Register.vue";

import Booklist from "@/components/Booklist.vue";

import CheckUserInfo from "@/components/CheckUserInfo.vue";
import BookManagement from "@/components/BookManagement.vue";
import CheckMyBorrowInfo from "@/components/CheckMyBorrowInfo.vue";
import AddBook from "@/pages/AddBook.vue";

const routes =
    [
        {
            path: '/',
            name: 'UserLogin',
            component: LoginUser,
        },
        {
            path: '/userregister',
            name: 'Register',
            component: RegisterUser
        },
        {
            path: '/adminlogin',
            name: 'Admin',
            component: LoginAdmin,
        },        
        {
            path: '/adminregister',
            name: 'Register',
            component: RegisterAdmin
        },

        {
            path: '/user',
            component: () => import('@/pages/IndexUser.vue'),
            children: [
                {
                    path: 'booklist',
                    component: Booklist,
                    
                },
                {
                    path: 'checkMyBorrowInfo',
                    name: 'CheckMyBorrowInfo',
                    component: CheckMyBorrowInfo,
                },
            ]
        },
        {
            path: '/admin',
            component: () => import('@/pages/IndexAdmin.vue'),
            children: [
                {
                    path: 'booklist',
                    component: Booklist,
                },
                {
                    path: 'checkUserInfo',
                    component: CheckUserInfo,
                },
                {
                    path: 'bookManagement',
                    component: BookManagement,
                },
                {
                    path: '/newBook',
                    name: 'NewBook',
                    component: AddBook
                },
            ]
        }
    ];


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
