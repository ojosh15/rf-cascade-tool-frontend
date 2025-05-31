<template>
    <v-container class="fill-height pa-6">
        <v-row align="center" justify="center" class="text-center">
            <v-col cols="12" md="4" class="mb-6">
                <v-img src="@/assets/logo.svg" height="300" contain class="mx-auto" />
            </v-col>

            <v-col cols="12" md="6">
                <v-card elevation="4" class="pa-4 rounded-xl">
                    <v-card-title class="text-h4 font-weight-bold">
                        About
                    </v-card-title>
                    
                    <v-card-subtitle class="mb-2">
                        <p><strong>RF Cascade Tool</strong> — Version 0.1</p>
                        <p><strong>Developed By:</strong> Josh Outhous</p>
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-text class="text-body-1">
                        <p>
                            This tool assists in analyzing RF component cascades by computing
                            cumulative gain, noise figure, and more. This page will be updated
                            with documentation, technical articles, and utilities to support RF design.
                        </p>

                        <v-btn class="mt-4" href="http://localhost:5000/api/docs" target="_blank"
                            prepend-icon="mdi-book-open-variant" text="API Documentation" variant="elevated"
                            color="primary" size="large" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { definePage } from 'vue-router/auto'

definePage({
    meta: {
        requiresAuth: false,
    },
})
</script>

<style scoped>
/* .v-row {
    min-height: 300px;
} */
</style>