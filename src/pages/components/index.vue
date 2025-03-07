<template>
    <v-container class="fill-height">
        <v-row class="fill-height" justify="center">
            <v-col class="fill-height" cols="8">
                <ComponentList @rowSelected="handleRowSelection" />
            </v-col>
            <v-col class="fill-height" cols="4">
                <PlotComponent :selectedComponent="selectedComponent" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ComponentList from "@/components/ComponentList.vue";
import PlotComponent from "@/components/PlotComponent.vue";
import type { Component } from "@/models/component";

// Store selected row in the parent component
const selectedComponent = ref<Component | null>(null);

const handleRowSelection = (component: Component | null) => {
  selectedComponent.value = component;
};
</script>