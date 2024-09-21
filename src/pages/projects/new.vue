<template>
    <v-container class="fill-height">
        <v-responsive class="align-centerfill-height mx-auto" max-width="900">
            <v-row justify="center">
                <v-col cols="12">
                    <v-card class="py-4" color="surface-variant" :style="{ backgroundColor: 'rgba(var(--v-theme-primary), 0.06)' }"
                        rounded="lg" variant="text">
                        <CreateProject />
                    </v-card>
                </v-col>
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script lang="ts" setup>
//
</script>

<style>
    .surface-variant {
        backgroundColor: 'rgba(var(--v-theme-primary), 0.06)'
    }
</style>