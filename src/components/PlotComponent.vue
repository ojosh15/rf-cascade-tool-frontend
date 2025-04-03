<template>
    <v-card class="pa-4 fill-height d-flex flex-column">
        <v-card-title>Data Plot</v-card-title>
        <v-card-text v-if="selectedComponent" class="flex-grow-1">
            <v-row style="height: 100%; width: 100%">
                <v-col cols="12">
                    <v-chart class="chart" style="height: 500px;" :option="chartOptions" autoresize />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import type { Component, ComponentData } from "@/models/component";
import ComponentService from "@/services/component";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default defineComponent({
    components: {
        VChart
    },
    props: {
        selectedComponent: Object as () => Component | null
    },
    setup(props) {
        const componentData = ref<ComponentData | null>(null);
        const chartOptions = ref({});
        const seriesOptions: (keyof ComponentData)[] = [
        "gain",
        "nf",
        "p1db",
        "ip2",
        "ip3",
        "max_input"
        ];
        const selectedSeries = ref(seriesOptions);

        watch(
            () => props.selectedComponent,
            async (newComponent) => {
                if (newComponent) {
                    try {
                        componentData.value = await ComponentService.getComponentData(newComponent.id);
                        updateChart();
                    } catch (error) {
                        console.error("Error fetching data for plot:", error);
                    }
                }
            },
            { immediate: true }
        );

        watch(selectedSeries, () => {
            if (props.selectedComponent) {
                updateChart();
            }
        });

        const updateChart = () => {
            if (!componentData.value) return;

            // const chartInstance = echarts.getInstanceByDom(document.getElementById('chart-container'));
            // let previousLegendState = {};

            // if (chartInstance) {
            //     const currentOptions = chartInstance.getOption();
            //     previousLegendState = currentOptions.legend?.[0]?.selected || {};
            // }

            chartOptions.value = {
                tooltip: { trigger: "axis" },
                legend: { 
                    textStyle: { color: "white" }
                },
                xAxis: {
                    type: "value",
                    name: "Frequency (MHz)",
                    nameLocation: "center",
                    nameGap: 25,
                    textStyle: { color: "white" }
                },
                yAxis: { 
                    type: "value", 
                    name: "Magnitude (dB)",
                    nameLocation: "center",
                    nameGap: 20 ,
                    textStyle: { color: "white" }
                },
                series: seriesOptions.map((seriesName) => {
                    const seriesData = componentData.value?.[seriesName];

                    if (seriesData) {
                        return {
                            name: seriesName,
                            type: "line",
                            data: seriesData.freq.map((f: number, i: number) => [f/1e6, seriesData.mag[i]])
                        };
                    } else {
                        return { name: seriesName, type: "line", data: [] };
                    }
                })
            };
        };

        return { selectedSeries, seriesOptions, chartOptions };
    }
});
</script>

<style scoped>
.v-card {
  max-width: 800px;
  margin: auto;
}
</style>