<template>
    <v-card class="flex-column flex-grow-1" variant="text">
        <v-card-title>Select A Project To Load</v-card-title>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-expansion-panels v-model="expandedPanel" variant="accordion" id="exp-panel" class="elevation-3">
                        <v-expansion-panel v-for="project in projects" class="text-surface-variant">
                            <v-expansion-panel-title>
                                <div class="d-flex justify-space-between w-100">
                                    <span class="text-subtitle-1">{{ project.name }}</span>
                                    <span class="text-caption text-center pr-2">{{ formatDate(project.modified_at) }}</span>
                                </div>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>{{ project.description }}</v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
                
            <v-row justify="center">
                <v-col cols="6">
                    <v-btn @click="loadSelectedProject" type="submit" 
                    variant="elevated" color="primary" block size="large">
                        Load Project
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import { ref, onMounted} from 'vue';
import ProjectService from "@/services/project";
import { formatDate } from '@/utils/format';
import type {Project} from "@/models/project";

const projects = ref<Project[]>([]);
const expandedPanel = ref<number | null>(null);

onMounted(async () => {
    try {
        projects.value = (await ProjectService.getProjects()).sort((a, b) => 
            new Date(b.modified_at).getTime() - new Date(a.modified_at).getTime()
        );
    } catch(error) {
        console.error('Failed to fetch projects', error);
    }
});

const loadSelectedProject = () => {
    if (expandedPanel.value !== null) {
        // Use the expanded panel index to load the corresponding project
        alert(projects.value[expandedPanel.value].id);
    } else {
        // If no panel is expanded, prompt the user to select a project
        alert('Please select a project first.');
    }
};
</script>

<style>
    #exp-panel {
        min-height: 300px;
    }
</style>