<template>
  <v-app>
    <v-main>
      <v-app-bar :elevation="2" rounded>
        <template v-slot:prepend>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>RF Cascade Tool</v-app-bar-title>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
            @click="drawer = false"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const items = [
  { title: 'Home', to: '/' },
  { title: 'RF Analysis', to: '/rf-analysis' },
  { title: 'Settings', to: '/settings' },
  { title: 'About', to: '/about' },
]

const drawer = ref(false)
</script>
