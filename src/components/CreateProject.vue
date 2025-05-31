<template>
    <v-row justify="center">
        <v-col cols="9">
            <h2>Create A New Project</h2>
            <div class="py-2" />
            <v-alert v-if="error" class="mb-5" closable type="error" variant="tonal">{{ error }}</v-alert>
            <v-form @submit.prevent="createProject" v-model="formValid">
                <v-row>
                    <v-col>
                        <v-text-field
                        v-model="projectInput.name"
                        :counter="25"
                        :rules="[nameRule]"
                        label="Project name"
                        hide-details
                        required
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-textarea
                            v-model="projectInput.description"
                            :counter="25"
                            label="Project Description"
                            hide-details
                        ></v-textarea>
                    </v-col>
                </v-row>

                <v-row justify="center">
                    <v-col cols="6">
                        <v-btn :disabled="!formValid || loading" type="submit" block 
                        variant="elevated" color="primary" size="large">
                            <v-progress-circular
                            v-if="loading"
                            indeterminate
                            size="20"
                            color="white"
                            />
                            <span v-if="!loading">Create Project</span>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import ProjectService from "@/services/project";
    import type { Project, ProjectCreate } from "@/models/project";

    export default defineComponent({
        setup() {
            const projectInput = ref<ProjectCreate>({ name: ''});
            const newProject = ref<Project | null>(null);
            const loading = ref(false);
            const error = ref<string | null>(null);
            const formValid = ref(false);

            // Validation rule for the project name
            const nameRule = (value: string) => !!value || 'Project name is required';

            // Function to handle form submission
            const createProject = async () => {
                if (!formValid.value) return;
                loading.value = true;
                error.value = null;

                try {
                    newProject.value = await ProjectService.createProject(projectInput.value);
                    console.log(newProject.value)
                    // alert('Project created successfully!');
                    // newProject.value.name = ''; // Reset the form
                } catch (err) {
                    error.value = err instanceof Error ? err.message : 'Failed to create project';
                } finally {
                    loading.value = false;
                }
            }

            return { projectInput, loading, error, formValid, nameRule, createProject };
        }
    })
</script>

<style>
    html, body {
    overflow: hidden; /* Totally prevents scrolling */
    }
</style>