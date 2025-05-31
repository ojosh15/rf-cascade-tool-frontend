<template>
    <v-container class="fill-height">
        <v-responsive class="align-centerfill-height mx-auto pa-8" max-width="900">
            <v-img class="mb-4" height="150" src="@/assets/logo.svg" />

            <div class="text-center pb-4">
                <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

                <h1 class="text-h2 font-weight-bold">RF Cascade Tool</h1>
            </div>

            <v-row>
                <v-col>
                    <v-row>
                        <v-col>
                            <v-card hover class="py-4" to="/projects/load" prepend-icon="mdi-tray-arrow-up"
                                rounded="lg" subtitle="Select an existing project file." title="Load Project"
                                elevation="4">
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-card hover class="py-4" to="/projects/new" prepend-icon="mdi-pencil-plus" rounded="lg"
                                subtitle="Start with an empty project file." title="Create New Project"
                                elevation="4">
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-card hover class="py-4" to="/components" prepend-icon="mdi-database-edit-outline"
                                rounded="lg" subtitle="Add, edit, and view component models"
                                title="Launch Component Designer" elevation="4">
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto'

definePage({
    meta: {
        requiresAuth: true,
    },
})
</script>
