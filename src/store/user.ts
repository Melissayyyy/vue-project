import {defineStore} from "pinia"; //login时记录了用户信息，userName对应表单第一行，我改成了学号

export const useUserstore = defineStore(
    'user',
    {
        state() {
            return {
                userName:'userName'
            }
        }
    }
)