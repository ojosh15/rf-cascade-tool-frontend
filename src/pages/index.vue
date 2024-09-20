<template>
  <v-container class="fill-height">
        <v-responsive class="align-centerfill-height mx-auto" max-width="900">
            <v-img class="mb-4" height="150" src="@/assets/logo.png" />

            <div class="text-center">
                <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

                <h1 class="text-h2 font-weight-bold">RF Cascade Tool</h1>
            </div>

            <div class="py-4" />

            <v-row>
                <v-col cols="6">
                    <v-card hover class="py-4" color="surface-variant"
                        href="/projects/new" prepend-icon="mdi-pencil-plus"
                        rounded="lg" subtitle="Start with an empty project file."
                        title="Create New Project" variant="text">
                        <v-overlay opacity=".06" scrim="primary" contained model-value persistent />
                    </v-card>
                </v-col>

                <v-col cols="6">
                    <v-card hover class="py-4" color="surface-variant"
                        href="/projects/load"
                        prepend-icon="mdi-tray-arrow-up" rounded="lg"
                        subtitle="Select an existing project file." title="Load Project"
                        variant="text">
                        <v-overlay opacity=".06" scrim="primary" contained model-value persistent />
                    </v-card>
                </v-col>

                <v-col cols="12">
                    <v-card hover class="py-4" color="surface-variant"
                        href="/components"
                        prepend-icon="mdi-database-edit-outline" rounded="lg"
                        subtitle="Add, edit, and view component models" title="Launch Component Designer"
                        variant="text">
                        <v-overlay opacity=".06" scrim="primary" contained model-value persistent />
                    </v-card>
                </v-col>
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script lang="ts" setup>
  //
</script>
