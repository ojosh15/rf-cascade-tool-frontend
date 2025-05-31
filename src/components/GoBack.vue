<template>
    <span class="go-back">
        <v-btn @click="goBack" icon="mdi-arrow-left-bold" variant="plain" size="x-large"></v-btn>
    </span>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const goBack = () => {
    router.go(-1);
};
</script>