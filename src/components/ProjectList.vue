<template>
    <v-row justify="center">
        <v-col cols="9">
            <h2>Select A Project To Load</h2>
            <div class="py-2" />
            <v-row>
                <v-col>
                    <v-expansion-panels v-model="expandedPanel" variant="accordion" id="exp-panel">
                        <v-expansion-panel v-for="project in projects" class="text-surface-variant" focusable>
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
                    <v-btn @click="loadSelectedProject" type="submit" block>
                        <span>Load Project</span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted} from 'vue';
    import ProjectService from "@/services/project";
    import { formatDate } from '@/utils/format';
    import type {Project} from "@/models/project";

    export default defineComponent({
        setup() {
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
        
            return { projects, expandedPanel, formatDate, loadSelectedProject }
        }
    });
</script>

<style>
    .exp-panel {
        max-height: 90%;
    }
</style>