import {createRouter, createWebHistory} from "vue-router";

import Login from '@/pages/Login.vue';
import Index from "@/pages/Index.vue";
import Test from "@/pages/Test.vue";
import Booklist from "@/components/Booklist.vue";
import CheckUserInfo from "@/components/CheckUserInfo.vue";
import BookManagement from "@/components/BookManagement.vue";
import Register from "@/pages/Register.vue";
import IndexMain from "@/components/IndexMain.vue";
import AddBook from "@/pages/AddBook.vue";

const routes =
    [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/index',
            name: 'Index',
            component: Index,
            children: [
                {
                    path: 'booklist',
                    name: 'Booklist',
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
            ]

        },
        {
            path: '/indexMain',
            name: 'IndexMain',
            component: IndexMain
        },
        {
            path: '/newBook',
            name: 'NewBook',
            component: AddBook
        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        }
    ];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
