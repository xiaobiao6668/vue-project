import { defineStore } from 'pinia'
export const useUserLoginStore = defineStore(
    '_user-login',
    {
        state: () => {
            return {
                firstMenuPath:'/login',
                userInfo: {
                    //用户信息(后端返回)
                    userId: 0,
                    userName: '',
                    displayName: '',
                    orgList: [],
                    roleList: [],
                    appList: []
                },
            }
        },
        getters: {
        },
        actions: {

        },
    }
)
