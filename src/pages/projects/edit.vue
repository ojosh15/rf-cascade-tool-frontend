<template>
    <v-container class="fill-height">
        <v-responsive class="align-centerfill-height mx-auto pa-8" max-width="900">
            <v-row justify="center">
                <v-col cols="12">
                    <v-card class="py-4" color="surface-variant" elevation="4"
                        rounded="lg" variant="text">
                    </v-card>
                </v-col>
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script lang="ts" setup>
import { definePage } from 'vue-router/auto'

definePage({
    meta: {
        requiresAuth: true,
    },
})
</script>

<style>
</style>