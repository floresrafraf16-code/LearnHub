
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useAuth()
</script>

<template>
  <v-container fluid class="dashboard-page fill-height pa-6">

    <!-- HEADER -->
    <v-card rounded="lg" elevation="1" class="mb-6">
      <v-toolbar color="white" class="px-4">

        <v-avatar color="primary" rounded="lg" class="mr-3">
          <v-icon color="white">mdi-school</v-icon>
        </v-avatar>

        <v-toolbar-title class="font-weight-bold">
          UpSkill
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          color="error"
          variant="tonal"
          prepend-icon="mdi-logout"
          @click="logout"
        >
          Logout
        </v-btn>

      </v-toolbar>
    </v-card>

    <!-- WELCOME SECTION -->
    <v-row>
      <v-col cols="12">

        <v-card
          color="primary"
          rounded="xl"
          class="pa-6 pa-md-8"
        >
          <p class="text-overline">
            UPSKILL DASHBOARD
          </p>

          <h1 class="text-h4 font-weight-bold mb-3">
            Welcome, {{ user?.name }}!
          </h1>

          <p class="text-body-1">
            A digital learning platform where users can explore educational videos and develop new skills.
          </p>
        </v-card>

      </v-col>
    </v-row>

    <!-- USER PROFILE -->
    <v-row class="mt-2">

      <v-col cols="12" md="5">

        <v-card rounded="xl" elevation="2" class="pa-6 h-100">

          <h2 class="text-h6 font-weight-bold mb-6">
            Your Google Profile
          </h2>

          <div class="d-flex align-center ga-4 mb-6">

            <v-avatar size="85">
              <v-img
                :src="user?.picture"
                alt="Google Profile"
              />
            </v-avatar>

            <div>
              <h3 class="text-h6">
                {{ user?.name }}
              </h3>

              <p class="text-body-2 text-grey">
                Signed in with Google
              </p>
            </div>

          </div>

          <v-divider class="mb-4" />

          <div class="d-flex align-center ga-3 mb-4">
            <v-icon color="primary">
              mdi-email-outline
            </v-icon>

            <div>
              <p class="text-caption text-grey">
                Email Address
              </p>

              <p class="text-body-2 font-weight-medium">
                {{ user?.email }}
              </p>
            </div>
          </div>

          <v-chip color="success" variant="tonal">
            <v-icon start>mdi-check-circle</v-icon>
            Successfully Signed In
          </v-chip>

        </v-card>

      </v-col>

      <!-- LEARNING SECTION -->
      <v-col cols="12" md="7">

        <v-card rounded="xl" elevation="2" class="pa-6 h-100">

          <h2 class="text-h6 font-weight-bold mb-2">
            Your Learning Space
          </h2>

          <p class="text-body-2 text-grey mb-6">
            Discover educational content and expand your knowledge.
          </p>

          <v-card
            color="blue-lighten-5"
            rounded="lg"
            class="pa-5"
          >
            <v-icon color="primary" size="45">
              mdi-play-circle
            </v-icon>

            <h3 class="text-h6 font-weight-bold mt-3">
              Video Learning
            </h3>

            <p class="text-body-2 text-grey-darken-1 mt-2">
              Watch educational videos using our integrated
              Video.js player.
            </p>

            <v-btn
              color="primary"
              class="mt-4"
              prepend-icon="mdi-play"
              to="/videos"
            >
              Explore Videos
            </v-btn>

          </v-card>

        </v-card>

      </v-col>

    </v-row>

    <!-- FOOTER -->
    <div class="text-center text-caption text-grey mt-8">
      © 2026 UpSkill | Learn. Improve. Achieve.
    </div>

  </v-container>
</template>

<style scoped>
.dashboard-page {
  background: #f0f3f9;
  min-height: 100vh;
}
</style>
