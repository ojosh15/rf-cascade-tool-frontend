<template>
    <v-container class="fill-height">
        <v-responsive class="align-centerfill-height mx-auto" max-width="900">
            <v-row justify="center">
                <v-col cols="12">
                    <v-card class="py-4" color="surface-variant"
                        rounded="lg"
                        title="Create A New Project" variant="text">
                        <v-overlay opacity=".06" scrim="primary" contained model-value persistent />
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