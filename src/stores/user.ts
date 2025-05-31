import { defineStore } from "pinia";
import userService from '@/services/user'
import { User, UserSignIn } from "@/models/user";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null as null | User,
        loading: false,
        error: null as null | string,
    }),

    actions: {
        async fetchUser() {
            this.loading = true
            try {
                this.user = await userService.currentUser();
                this.error = null
            } catch (err: any) {
                this.user = null;
                this.error = err.message
            } finally {
                this.loading = false;
            }
        },

        logout() {
            localStorage.removeItem("access_token");
            this.user = null;
            this.loading = false;
        },

        async login(user_info: UserSignIn) {
            this.loading = true
            try {
                const data = await userService.login(user_info)
                localStorage.setItem('access_token', data.access_token)
                await this.fetchUser() // get user info after login
            } catch (err: any) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },
    },

    getters: {
        isAuthenticated: (state) => !!state.user,
    },
});
