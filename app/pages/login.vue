
<script setup lang="ts">
const {
  error,
  initializeGoogleSignIn
} = useAuth()

onMounted(() => {
  initializeGoogleSignIn('google-signin-button')
})
</script>

<template>
  <v-container fluid class="login-page fill-height pa-4">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" lg="10" xl="9">
        <v-card rounded="xl" elevation="4" class="login-card overflow-hidden">
          <v-row no-gutters class="fill-height">

            <!-- LEFT PANEL -->
            <v-col
              cols="12"
              md="6"
              class="brand-panel pa-8 pa-md-10"
            >
              <div class="d-flex align-center ga-3">
                <v-avatar color="white" rounded="lg" size="52">
                  <v-icon color="primary" size="32">
                    mdi-school
                  </v-icon>
                </v-avatar>

                <span class="text-h6 font-weight-bold">
                  UpSkill
                </span>
              </div>

              <div class="brand-content">
                <p class="text-subtitle-1 mb-5">
                  YOUR LEARNING JOURNEY STARTS HERE
                </p>

                <h1 class="text-h3 font-weight-bold mb-5">
                  Learn. Improve. Achieve.
                </h1>

                <p class="text-body-1">
                  A digital learning platform where 
                  users can explore educational videos and develop new skills.
                </p>

                <v-icon size="90" class="mt-8 play-icon">
                  mdi-play-circle-outline
                </v-icon>
              </div>

              <div class="text-body-2 mt-auto">
                © 2026 UpSkill | Learn. Improve. Achieve.
              </div>
            </v-col>

            <!-- RIGHT PANEL -->
            <v-col
              cols="12"
              md="6"
              class="login-panel pa-8 pa-md-10"
            >
              <div class="text-center">
                <v-avatar color="blue-lighten-5" size="80">
                  <v-icon color="primary" size="42">
                    mdi-account-circle-outline
                  </v-icon>
                </v-avatar>

                <h2 class="text-h4 font-weight-bold mt-6">
                  Welcome Back!
                </h2>

                <p class="text-body-1 text-grey mt-3">
                  Sign in to continue your learning journey.
                </p>
              </div>

              <v-divider class="my-6" />

              <h3 class="text-h6 mb-4">
                Sign in to your account
              </h3>

              <p class="text-body-1 text-grey-darken-1 mb-6">
                Use your Google account to access your personalized
                learning dashboard.
              </p>

              <div
                id="google-signin-button"
                class="d-flex justify-center"
              ></div>

              <v-alert
                v-if="error"
                type="error"
                variant="tonal"
                class="mt-5"
              >
                {{ error }}
              </v-alert>

              <p class="text-center text-body-2 text-grey mt-8">
                By continuing, you agree to use UpSkill responsibly
                for educational purposes.
              </p>
            </v-col>

          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.login-page {
  background: #f0f3f9;
  min-height: 100vh;
}

.login-card {
  min-height: 650px;
}

.brand-panel {
  background: linear-gradient(145deg, #17477f, #1766b5);
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 650px;
}

.brand-content {
  margin-top: 100px;
}

.play-icon {
  color: rgba(255, 255, 255, 0.35);
}

.login-panel {
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 600px) {
  .brand-panel {
    min-height: 350px;
  }

  .brand-content {
    margin-top: 50px;
  }

  .login-card {
    min-height: auto;
  }
}
</style>
