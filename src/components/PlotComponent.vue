<template>
    <v-card class="pa-4">
        <h2>Plot for Selected Component</h2>
        <div v-if="selectedComponent">
            <p><strong>Model:</strong> {{ selectedComponent.model }}</p>
            <p><strong>Manufacturer:</strong> {{ selectedComponent.manufacturer }}</p>

            <!-- Plotly Chart
            <div ref="plotDiv"></div> -->
        </div>
        <p v-else>Select a component to view the plot.</p>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
// import Plotly from "plotly.js-dist-min";
// import DataService from "@/services/dataService"; // Service to fetch backend data
import type { Component } from "@/models/component";

export default defineComponent({
  props: {
    selectedComponent: Object as () => Component | null
  },
});
</script>