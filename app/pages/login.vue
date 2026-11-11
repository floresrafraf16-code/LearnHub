
<script setup lang="ts">
const { error, initializeGoogleSignIn } = useAuth()

onMounted(() => {
  initializeGoogleSignIn('google-signin-button')
})
</script>

<template>
  <v-container fluid class="login-page fill-height pa-4">
    <div class="background-glow glow-one"></div>
    <div class="background-glow glow-two"></div>

    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" lg="10" xl="9">
        <v-card class="login-card" rounded="xl" elevation="0">
          <v-row no-gutters class="fill-height">

            <!-- LEFT BRANDING -->
            <v-col
              cols="12"
              md="6"
              class="brand-panel pa-8 pa-md-12"
            >
              <div class="brand-logo">
                <v-avatar size="48" rounded="lg" class="logo-icon">
                  <v-icon size="30" color="white">
                    mdi-school
                  </v-icon>
                </v-avatar>

                <span>UpSkill</span>
              </div>

              <div class="brand-content">
                <div class="eyebrow">
                  <span class="status-dot"></span>
                  YOUR DIGITAL LEARNING SPACE
                </div>

                <h1>
                  Learn beyond
                  <span>limits.</span>
                </h1>

                <p>
                  Explore educational videos, discover new skills,
                  and take your learning journey to the next level.
                </p>

                <div class="feature-list">
                  <div class="feature-item">
                    <v-icon color="#55c8ff">mdi-play-circle-outline</v-icon>
                    <span>Learn through educational videos</span>
                  </div>

                  <div class="feature-item">
                    <v-icon color="#55c8ff">mdi-lightning-bolt-outline</v-icon>
                    <span>Learn at your own pace</span>
                  </div>

                  <div class="feature-item">
                    <v-icon color="#55c8ff">mdi-account-check-outline</v-icon>
                    <span>Your personalized learning space</span>
                  </div>
                </div>
              </div>

              <div class="brand-footer">
                © 2026 UpSkill. All rights reserved.
              </div>
            </v-col>

            <!-- RIGHT LOGIN -->
            <v-col
              cols="12"
              md="6"
              class="login-panel pa-8 pa-md-12"
            >
              <div class="login-content">
                <div class="welcome-icon">
                  <v-icon size="35" color="#58caff">
                    mdi-account-outline
                  </v-icon>
                </div>

                <div class="text-center">
                  <div class="login-eyebrow">WELCOME TO UPSKILL</div>

                  <h2>Welcome back.</h2>

                  <p class="login-description">
                    Sign in to continue your learning journey.
                  </p>
                </div>

                <div class="login-divider">
                  <span></span>
                  <span>YOUR ACCOUNT</span>
                  <span></span>
                </div>

                <div class="signin-label">
                  Continue with your Google account
                </div>

                <div
                  id="google-signin-button"
                  class="google-button"
                ></div>

                <v-alert
                  v-if="error"
                  type="error"
                  variant="tonal"
                  rounded="lg"
                  class="mt-5"
                >
                  {{ error }}
                </v-alert>

                <div class="security-note">
                  <v-icon size="17" color="#55c8ff">
                    mdi-shield-check-outline
                  </v-icon>

                  <span>
                    Secure authentication powered by Google.
                  </span>
                </div>
              </div>

              <div class="login-footer">
                By continuing, you agree to use UpSkill
                responsibly for educational purposes.
              </div>
            </v-col>

          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #050914;
}

.background-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(110px);
  pointer-events: none;
  opacity: 0.22;
}

.glow-one {
  width: 400px;
  height: 400px;
  background: #087cff;
  top: -150px;
  left: -100px;
}

.glow-two {
  width: 350px;
  height: 350px;
  background: #00c8e8;
  bottom: -150px;
  right: -100px;
}

.login-card {
  position: relative;
  z-index: 1;
  min-height: 650px;
  overflow: hidden;
  background: rgba(13, 22, 39, 0.94);
  border: 1px solid rgba(117, 175, 255, 0.18);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
}

.brand-panel {
  display: flex;
  flex-direction: column;
  min-height: 650px;
  color: white;
  background:
    radial-gradient(circle at 80% 20%, rgba(0, 150, 255, 0.22), transparent 35%),
    linear-gradient(145deg, #102a4d, #071326 75%);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 13px;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -1px;
}

.logo-icon {
  background: linear-gradient(135deg, #087cff, #00c8e8);
}

.brand-content {
  margin-top: auto;
  margin-bottom: auto;
  padding: 55px 0;
}

.eyebrow,
.login-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #63caff;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #29d8bd;
  box-shadow: 0 0 12px #29d8bd;
}

.brand-content h1 {
  max-width: 430px;
  font-size: clamp(42px, 5vw, 58px);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -2px;
}

.brand-content h1 span {
  display: block;
  color: #55c8ff;
}

.brand-content p {
  max-width: 400px;
  margin-top: 24px;
  color: #a8bad1;
  font-size: 15px;
  line-height: 1.9;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 19px;
  margin-top: 38px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 13px;
  color: #d4e2f4;
  font-size: 13px;
}

.brand-footer {
  color: #71839c;
  font-size: 12px;
}

.login-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(10, 17, 30, 0.95);
}

.login-content {
  width: 100%;
  max-width: 390px;
  margin: auto;
}

.welcome-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  margin: 0 auto 25px;
  border-radius: 22px;
  background: rgba(43, 154, 255, 0.12);
  border: 1px solid rgba(85, 200, 255, 0.25);
  box-shadow: 0 0 30px rgba(0, 140, 255, 0.1);
}

.login-eyebrow {
  margin-bottom: 12px;
}

.login-panel h2 {
  color: white;
  font-size: 35px;
  font-weight: 800;
  letter-spacing: -1px;
}

.login-description {
  margin-top: 12px;
  color: #91a2ba;
  font-size: 14px;
}

.login-divider {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 38px 0 25px;
  color: #73849c;
  font-size: 10px;
  letter-spacing: 1.5px;
  white-space: nowrap;
}

.login-divider span:first-child,
.login-divider span:last-child {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
}

.signin-label {
  margin-bottom: 18px;
  color: #dce8f7;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
}

.google-button {
  display: flex;
  justify-content: center;
  min-height: 45px;
}

.security-note {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  margin-top: 30px;
  color: #8295ad;
  font-size: 11px;
}

.login-footer {
  margin-top: 55px;
  color: #64758c;
  font-size: 11px;
  line-height: 1.8;
  text-align: center;
}

@media (max-width: 600px) {
  .brand-panel {
    min-height: 480px;
  }

  .brand-content {
    padding: 50px 0 30px;
  }

  .login-panel {
    min-height: 550px;
  }

  .login-card {
    min-height: auto;
  }
}
</style>
