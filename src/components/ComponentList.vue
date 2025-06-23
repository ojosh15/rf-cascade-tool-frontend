<template>
    <v-card class="pa-4 fill-height d-flex flex-column" elevation="4">
        <v-card-title class="d-flex justify-space-between flex-align-center pb-4">
            <span>Component Database</span>
            <v-btn @click="dialog = true" text="Add Component" variant="elevated" color="primary" class="px-6"
                prepend-icon="mdi-plus"></v-btn>
        </v-card-title>
        <ag-grid-vue
            :theme="myTheme"
            style="width: 100%; height: 100%"
            :columnDefs="colDefs"
            :rowData="components"
            :defaultColDef="defaultColDef"
            :pagination="true"
        >
        </ag-grid-vue>
        <!-- <v-data-table class="flex-grow-1" :headers="headers" :items="components">
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
        </v-data-table> -->
        <v-dialog v-model="dialog" max-width="1000px" attach="body">
            <v-card prepend-icon="mdi-plus-box"
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
                    <v-btn text="Close" variant="outlined" @click="dialog=false"></v-btn>
                    <v-btn color="primary" text="Save" variant="elevated" @click="dialog=false"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import ComponentService from "@/services/component";
import { formatDate } from '@/utils/format';
import type { Component } from "@/models/component";
import { AllCommunityModule, ModuleRegistry, themeBalham, colorSchemeDark } from 'ag-grid-community'; 
import { AgGridVue } from "ag-grid-vue3";
import { useTheme } from 'vuetify'

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export default defineComponent({
    components: {
        AgGridVue,
    },
    emits: ["rowSelected"],
    setup(_, { emit }) {
        const components = ref<Component[]>([]);
        const selected = ref<Component | null>(null);
        const dialog = ref<boolean>(false)
        const theme = useTheme();

        const defaultColDef = ref({
            filter: true
        });

        const myTheme = ref(themeBalham.withParams({
            fontFamily: ['roboto', 'sans-serif'],
        }));

        const colDefs = ref([
            { headerName: "#", field: "id" },
            { headerName: "Model", field: "model" },
            { headerName: "Manufacturer", field: "manufacturer" },
            { headerName: "Serial No", field: "serial_no" },
            { headerName: "Type", field: "type[type]" },
            { headerName: "Start Freq (MHz)", field: "start_freq" },
            { headerName: "Stop Freq (MHz)", field: "stop_freq" },
            { headerName: "Active", field: "is_active" },
            { headerName: "Variable", field: "is_variable" },
            { headerName: "Modified At", field: "modified_at" },
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

        watch(() => theme.global.current.value.dark, (isDark) => {
            const baseTheme = themeBalham.withParams({
                fontFamily: ['roboto', 'sans-serif'],
            });

            myTheme.value = isDark
                ? baseTheme.withPart(colorSchemeDark)
                : baseTheme;
        }, { immediate: true });

        return { components, colDefs, formatDate, selected, selectRow, getRowIndex, dialog, defaultColDef, myTheme }
    }


})
</script>

<style scoped>
.selected-row {
    /* background-color: rgba(0, 123, 255, 0.2) !important; */
    background-color: rgba(var(--v-theme-secondary), 0.2) !important;
}

.ag-theme-alpine {
  /* Background of the whole grid */
  --ag-background-color: var(--v-theme-surface);

  /* Text color */
  --ag-foreground-color: var(--v-theme-on-surface);

  /* Border and grid lines */
  --ag-border-color: rgba(var(--v-border-color), var(--v-border-opacity));

  /* Hovered row background */
  --ag-row-hover-color: rgba(var(--v-theme-primary), 0.08);

  /* Selected row background */
  --ag-row-selected-color: rgba(var(--v-theme-primary), 0.2);

  /* Header background and text */
  --ag-header-background-color: var(--v-theme-surface-variant);
  --ag-header-foreground-color: var(--v-theme-on-surface);

  /* Accent: active cell border, checkbox, icons */
  --ag-selected-tab-underline-color: var(--v-theme-primary);
  --ag-checkbox-checked-color: var(--v-theme-primary);
}
</style>