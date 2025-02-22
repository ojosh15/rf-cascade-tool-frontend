<template>
    <span class="go-back">
        <v-btn @click="goBack" icon="mdi-arrow-left-bold" variant="plain" size="x-large"></v-btn>
    </span>
</template>

<script>
export default {
    methods: {
        goBack() {
            return this.$router.go(-1);
        }
    }
};
</script>