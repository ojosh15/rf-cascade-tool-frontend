<template>
  <v-app>
    <v-main>
      <v-app-bar :elevation="2" rounded>
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>RF Cascade Tool</v-app-bar-title>
      </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
