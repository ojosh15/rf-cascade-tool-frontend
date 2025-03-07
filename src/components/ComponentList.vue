<template>
    <v-row class="fill-height" justify="center">
        <v-col class="fill-height">
            <v-data-table class="fill-height elevation-1" height="100%" :headers="headers" :items="components">
                <template v-slot:item.index="{ index }">
                    {{ index + 1 }}
                </template>
                <template v-slot:item.modified_at="{ item }">
                    {{ formatDate(item.modified_at) }}
                </template>
                <template v-slot:item="{ item }">
                    <tr
                        @click="selectRow(item)"
                        :class="{ 'selected-row': selected === item }"
                        style="cursor: pointer"
                    >
                    <td>{{ getRowIndex(item) }}</td>
                    <td>{{ item.model }}</td>
                    <td>{{ item.manufacturer }}</td>
                    <td>{{ item.serial_no }}</td>
                    <td>{{ item.type["type"] }}</td>
                    <td>{{ item.start_freq/1e6 }}</td>
                    <td>{{ item.stop_freq/1e6 }}</td>
                    <td>{{ item.is_active }}</td>
                    <td>{{ item.is_variable }}</td>
                    <td>{{ formatDate(item.modified_at) }}</td>
                    </tr>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted} from 'vue';
    import ComponentService from "@/services/component";
    import { formatDate } from '@/utils/format';
    import type {Component} from "@/models/component";

    export default defineComponent({
        emits: ["rowSelected"],
        setup(_, { emit }) {
            const components = ref<Component[]>([]);
            const selected = ref<Component | null>(null);

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
                } catch(error) {
                    console.error('Failed to fetch components', error);
                }
            });

            return { components, headers, formatDate, selected, selectRow, getRowIndex }
        }


    })
</script>

<style scoped>
.selected-row {
  background-color: rgba(0, 123, 255, 0.2) !important;
}
</style>