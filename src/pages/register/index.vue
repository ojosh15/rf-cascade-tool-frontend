<template>
    <v-container class="fill-height pa-6">
        <v-row align="center" justify="center">
            <v-col cols="12" md="6" lg="4">
                <v-card class="pa-6 rounded-xl" elevation="6">
                    <v-img src="@/assets/logo.svg" contain height="100" class="mx-auto mb-6" />

                    <v-card-title class="text-h4 font-weight-bold justify-center mb-4">
                        Register
                    </v-card-title>

                    <v-card-text>
                        <v-form @submit.prevent="submitRegister" ref="form">
                            <v-text-field v-model="newUser.full_name" label="Full Name" prepend-inner-icon="mdi-account"
                                required />

                            <v-text-field v-model="newUser.username" label="Email" type="email" prepend-inner-icon="mdi-email"
                                required />

                            <v-text-field v-model="newUser.password" label="Password" type="password"
                                prepend-inner-icon="mdi-lock" required />

                            <v-alert v-if="error" type="error" class="my-4" dense border="start">
                                {{ error }}
                            </v-alert>

                            <v-btn color="primary" variant="elevated" size="large" type="submit" block class="mt-4">
                                Sign Up
                            </v-btn>
                        </v-form>

                        <div class="text-center mt-4">
                            <span>Already have an account?</span>
                            <v-btn variant="text" color="primary" @click="$router.push('/login')">
                                Login
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import userService from '@/services/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { UserRegister } from '@/models/user'

const router = useRouter()
const newUser = ref<UserRegister>({
    "full_name": '',
    "username": '',
    "password": '',
})
const error = ref('')

const submitRegister = async () => {
    error.value = ''
    try {
        await userService.register(newUser.value)
        router.push('/login')
    } catch (err: any) {
        error.value = err.message || 'Could not register'
    }
}
</script>