<template>
  <v-app class="app-grid-background">
    <v-main>
      <!-- Top App Bar -->
      <v-app-bar :elevation="2" rounded>
        <!-- Nav Toggle -->
        <template v-slot:prepend>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
        </template>

        <!-- App Logo and Title -->
        <v-app-bar-title class="d-flex flex-row align-center gap-2">
          <router-link to="/" class="d-flex align-center text-decoration-none">
            <v-img src="@/assets/logo.svg" alt="App Logo" contain max-height="32" width="32" />
            <span class="ml-2 font-weight-bold">RF Cascade Tool</span>
          </router-link>
        </v-app-bar-title>

        <!-- Theme Toggle -->
        <v-btn icon variant="text" @click="toggleTheme" class="mr-2">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>

        <!-- User Section -->
        <div v-if="userStore.isAuthenticated" class="d-flex align-center">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-avatar size="32">
                  <v-icon>mdi-account-circle</v-icon>
                </v-avatar>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="$router.push('/profile')">
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$router.push('/settings')">
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-btn v-else variant="tonal" color="primary" @click="$router.push('/login')">
          Login
        </v-btn>
      </v-app-bar>

      <!-- Navigation Drawer -->
      <v-navigation-drawer v-model="drawer" location="start" temporary :scrim="theme.global.current.value.dark ? 'rgba(255,255,255)' : undefined">
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" :to="item.to" link @click="drawer = false"
            :disabled="item.requiresAuth && !userStore.isAuthenticated"
            :prepend-icon="item.icon">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Route Content -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const theme = useTheme()
const router = useRouter()

onMounted(() => {
  userStore.fetchUser();
})

function logout() {
  userStore.logout()
  router.push('/login')
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const items = [
  { title: 'Home', to: '/', icon: 'mdi-home', requiresAuth: false },
  { title: 'RF Analysis', to: '/rf-analysis', icon: 'mdi-chart-line', requiresAuth: true },
  { title: 'Component Designer', to: '/components', icon: 'mdi-database-edit-outline', requiresAuth: true },
  { title: 'Settings', to: '/settings', icon: 'mdi-cog', requiresAuth: true },
  { title: 'About', to: '/about', icon: 'mdi-help', requiresAuth: false },
]

const drawer = ref(false)
</script>

<style>
a,
a:visited {
  color: inherit;
  text-decoration: none;
}

.app-grid-background {
  background-image:
    linear-gradient(to right, rgba(var(--v-theme-on-background), 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(var(--v-theme-on-background), 0.03) 1px, transparent 1px);
  background-size: 100px 100px; /* Size of the grid squares */
}
</style>