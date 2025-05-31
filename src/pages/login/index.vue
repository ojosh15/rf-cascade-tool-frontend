<template>
    <v-container class="fill-height pa-6">
        <v-row align="center" justify="center">
            <v-col cols="12" md="6" lg="4">
                <v-card class="pa-6 rounded-xl" elevation="6">
                    <v-img src="@/assets/logo.svg" contain height="100" class="mx-auto mb-6" />

                    <v-card-title class="text-h4 font-weight-bold justify-center mb-4">
                        Login
                    </v-card-title>

                    <v-card-text>
                        <v-form @submit.prevent="submitLogin" ref="form">
                            <v-text-field v-model="user.username" label="Email" type="email" prepend-inner-icon="mdi-email"
                                required />

                            <v-text-field v-model="user.password" label="Password" type="password"
                                prepend-inner-icon="mdi-lock" required />

                            <v-alert v-if="error" type="error" class="my-4" dense border="start">
                                {{ error }}
                            </v-alert>

                            <v-btn color="primary" variant="elevated" size="large" type="submit" block class="mt-4">
                                Sign In
                            </v-btn>
                        </v-form>

                        <div class="text-center mt-4">
                            <span>Don't have an account?</span>
                            <v-btn variant="text" color="primary" @click="$router.push('/register')">
                                Register
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { UserSignIn } from '@/models/user'
import { definePage } from 'vue-router/auto'

definePage({
    meta: {
        requiresAuth: false,
    },
})

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const user = ref<UserSignIn>({
    "password": '',
    "username": '',
})
const error = ref('')

const submitLogin = async () => {
    error.value = ''
    try {
        await userStore.login(user.value)
        const redirect = (route.query.redirect as string) || '/'
        router.push(redirect)
    } catch (err: any) {
        error.value = err.message || 'Login failed'
    }
}
</script>