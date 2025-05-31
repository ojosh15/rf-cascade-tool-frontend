<template>
    <v-card class="pa-4 fill-height d-flex flex-column" elevation="4">
        <v-card-title class="d-flex justify-space-between flex-align-center pb-4">
            <span>Component Database</span>
            <v-btn @click="dialog = true" text="Add Component" variant="elevated" color="primary" class="px-6"
                prepend-icon="mdi-plus"></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table class="flex-grow-1" :headers="headers" :items="components">
            <template v-slot:item.index="{ index }">
                {{ index + 1 }}
            </template>
            <template v-slot:item.modified_at="{ item }">
                {{ formatDate(item.modified_at) }}
            </template>
            <template v-slot:item="{ item }">
                <tr @click="selectRow(item)" :class="{ 'selected-row': selected === item }" style="cursor: pointer">
                    <td>{{ getRowIndex(item) }}</td>
                    <td>{{ item.model }}</td>
                    <td>{{ item.manufacturer }}</td>
                    <td>{{ item.serial_no }}</td>
                    <td>{{ item.type["type"] }}</td>
                    <td>{{ item.start_freq / 1e6 }}</td>
                    <td>{{ item.stop_freq / 1e6 }}</td>
                    <td>{{ item.is_active }}</td>
                    <td>{{ item.is_variable }}</td>
                    <td>{{ formatDate(item.modified_at) }}</td>
                </tr>
            </template>
        </v-data-table>
        <v-dialog v-model="dialog" width="auto">
            <v-card max-width="800" prepend-icon="mdi-plus-box"
                title="Add New Component">
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Model*" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field label="Manufacturer*" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field label="Serial Number"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field label="type*" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field label="Start Freq (MHz)*" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-autocomplete
                                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                label="Interests" auto-select-first multiple></v-autocomplete>
                        </v-col>
                    </v-row>
                    <small class="text-caption text-medium-emphasis">*indicates required field</small>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

                    <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ComponentService from "@/services/component";
import { formatDate } from '@/utils/format';
import type { Component } from "@/models/component";

export default defineComponent({
    emits: ["rowSelected"],
    setup(_, { emit }) {
        const components = ref<Component[]>([]);
        const selected = ref<Component | null>(null);
        const dialog = ref<boolean>(false)

        const headers = ref([
            { title: "#", key: "index", sortable: false },
            { title: "Model", key: "model" },
            { title: "Manufacturer", key: "manufacturer" },
            { title: "Serial No", key: "serial_no" },
            { title: "Type", key: "type[type]" },
            { title: "Start Freq (MHz)", key: "start_freq" },
            { title: "Stop Freq (MHz)", key: "stop_freq" },
            { title: "Active", key: "is_active" },
            { title: "Variable", key: "is_variable" },
            { title: "Modified At", key: "modified_at" },
        ]);

        const selectRow = (item: Component) => {
            selected.value = selected.value === item ? null : item;
            emit("rowSelected", selected.value);
        };

        const getRowIndex = (item: Component) => {
            return components.value.findIndex((c) => c.id === item.id) + 1;
        };

        onMounted(async () => {
            try {
                components.value = (await ComponentService.getComponents())
            } catch (error) {
                console.error('Failed to fetch components', error);
            }
        });

        return { components, headers, formatDate, selected, selectRow, getRowIndex, dialog }
    }


})
</script>

<style scoped>
.selected-row {
    /* background-color: rgba(0, 123, 255, 0.2) !important; */
    background-color: rgba(var(--v-theme-secondary), 0.2) !important;
}
</style>