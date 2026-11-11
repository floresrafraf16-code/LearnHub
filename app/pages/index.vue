
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useAuth()
</script>

<template>
  <v-container fluid class="dashboard-page pa-4 pa-md-8">

    <!-- BACKGROUND GLOW -->
    <div class="background-glow glow-one"></div>
    <div class="background-glow glow-two"></div>

    <div class="dashboard-content">

      <!-- NAVIGATION -->
      <v-card class="navbar mb-8" rounded="xl" elevation="0">
        <div class="nav-content">

          <div class="brand-logo">
            <v-avatar size="43" rounded="lg" class="logo-icon">
              <v-icon color="white" size="27">mdi-school</v-icon>
            </v-avatar>

            <span>UpSkill</span>
          </div>

          <div class="nav-right">
            <div class="nav-status">
              <span class="online-dot"></span>
              <span>Learning Space</span>
            </div>

            <v-btn
              class="logout-btn"
              variant="tonal"
              prepend-icon="mdi-logout"
              @click="logout"
            >
              Logout
            </v-btn>
          </div>

        </div>
      </v-card>

      <!-- WELCOME HERO -->
      <v-card class="hero-card mb-7" rounded="xl" elevation="0">
        <div class="hero-content">

          <div class="hero-text">
            <div class="hero-eyebrow">
              <v-icon size="16">mdi-view-dashboard-outline</v-icon>
              UPSKILL DASHBOARD
            </div>

            <h1>
              Welcome back,
              <span>{{ user?.name?.split(' ')[0] || 'Learner' }}!</span>
            </h1>

            <p>
              Every step forward is progress. Continue exploring,
              learning, and developing new skills at your own pace.
            </p>

            <v-btn
              class="hero-button mt-5"
              rounded="lg"
              prepend-icon="mdi-play"
              to="/videos"
            >
              Start Learning
            </v-btn>
          </div>

          <div class="hero-visual">
            <div class="visual-ring ring-one"></div>
            <div class="visual-ring ring-two"></div>

            <div class="visual-icon">
              <v-icon size="95" color="#62d2ff">
                mdi-school-outline
              </v-icon>
            </div>

            <div class="floating-tag">
              <v-icon color="#29d8bd" size="17">mdi-lightning-bolt</v-icon>
              Keep Growing
            </div>
          </div>

        </div>
      </v-card>

      <!-- SECTION HEADING -->
      <div class="section-heading mb-5">
        <div>
          <div class="section-eyebrow">YOUR ACCOUNT</div>
          <h2>Personal Overview</h2>
          <p>Manage your profile and access your learning space.</p>
        </div>
      </div>

      <!-- MAIN CARDS -->
      <v-row>

        <!-- GOOGLE PROFILE -->
        <v-col cols="12" md="5">
          <v-card class="glass-card profile-card pa-6 h-100" rounded="xl" elevation="0">

            <div class="card-heading">
              <div class="card-icon">
                <v-icon color="#60caff" size="24">
                  mdi-account-circle-outline
                </v-icon>
              </div>

              <div>
                <h3>Your Google Profile</h3>
                <p>Account information</p>
              </div>
            </div>

            <div class="profile-details mt-7">

              <v-avatar size="88" class="profile-avatar">
                <v-img
                  :src="user?.picture"
                  alt="Google Profile"
                />
              </v-avatar>

              <div class="profile-name">
                <h3>{{ user?.name }}</h3>
                <p>Google Account</p>

                <div class="verified-label">
                  <v-icon size="14" color="#29d8bd">
                    mdi-check-decagram
                  </v-icon>
                  Verified Profile
                </div>
              </div>

            </div>

            <v-divider class="profile-divider my-6" />

            <div class="info-item">
              <div class="info-icon">
                <v-icon color="#60caff">mdi-email-outline</v-icon>
              </div>

              <div class="info-content">
                <span>Email Address</span>
                <strong>{{ user?.email }}</strong>
              </div>
            </div>

            <div class="account-status mt-6">
              <v-icon color="#29d8bd" size="18">
                mdi-check-circle
              </v-icon>

              <span>Successfully Signed In</span>
            </div>

          </v-card>
        </v-col>

        <!-- LEARNING SPACE -->
        <v-col cols="12" md="7">
          <v-card class="glass-card learning-card pa-6 h-100" rounded="xl" elevation="0">

            <div class="card-heading">
              <div class="card-icon">
                <v-icon color="#60caff" size="24">
                  mdi-book-open-page-variant-outline
                </v-icon>
              </div>

              <div>
                <h3>Your Learning Space</h3>
                <p>Discover educational content and expand your knowledge.</p>
              </div>
            </div>

            <v-card class="video-feature mt-7" rounded="xl" elevation="0">

              <div class="video-feature-content">
                <div class="video-icon">
                  <v-icon size="38" color="#62d2ff">
                    mdi-play-circle-outline
                  </v-icon>
                </div>

                <div class="video-tag">
                  <span class="online-dot"></span>
                  VIDEO LEARNING
                </div>

                <h2>Learn something new.</h2>

                <p>
                  Explore educational videos and improve your
                  creative skills through our integrated Video.js player.
                </p>

                <v-btn
                  class="explore-button mt-4"
                  rounded="lg"
                  append-icon="mdi-arrow-right"
                  to="/videos"
                >
                  Explore Videos
                </v-btn>
              </div>

              <div class="video-decoration">
                <v-icon size="150">mdi-play-box-multiple-outline</v-icon>
              </div>

            </v-card>

            <div class="learning-note mt-5">
              <v-icon size="18" color="#60caff">
                mdi-information-outline
              </v-icon>

              <span>
                Your learning journey starts with one video at a time.
              </span>
            </div>

          </v-card>
        </v-col>

      </v-row>

      <!-- FOOTER -->
      <footer class="dashboard-footer">
        <div class="footer-brand">
          <span>UpSkill</span>
          <span class="footer-divider">|</span>
          Learn. Improve. Achieve.
        </div>

        <p>© 2026 UpSkill. All rights reserved.</p>
      </footer>

    </div>
  </v-container>
</template>

<style scoped>
.dashboard-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #050914;
  color: white;
}

.dashboard-content {
  position: relative;
  z-index: 1;
  max-width: 1450px;
  margin: 0 auto;
}

.background-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.18;
  pointer-events: none;
}

.glow-one {
  width: 420px;
  height: 420px;
  background: #087cff;
  top: -150px;
  right: 5%;
}

.glow-two {
  width: 380px;
  height: 380px;
  background: #00c8e8;
  bottom: 5%;
  left: -180px;
}

/* NAVBAR */
.navbar {
  background: rgba(14, 25, 43, 0.85);
  border: 1px solid rgba(117, 175, 255, 0.16);
  backdrop-filter: blur(20px);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 22px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-size: 23px;
  font-weight: 800;
  letter-spacing: -1px;
}

.logo-icon {
  background: linear-gradient(135deg, #087cff, #00c8e8);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 25px;
}

.nav-status {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #a4b7ce;
  font-size: 12px;
}

.online-dot {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  background: #29d8bd;
  box-shadow: 0 0 10px #29d8bd;
}

.logout-btn {
  color: #ff8e9c;
  background: rgba(255, 82, 112, 0.10);
  border: 1px solid rgba(255, 82, 112, 0.18);
  text-transform: none;
}

/* HERO */
.hero-card {
  position: relative;
  overflow: hidden;
  min-height: 330px;
  background:
    radial-gradient(circle at 75% 40%, rgba(0, 151, 255, 0.28), transparent 35%),
    linear-gradient(115deg, #102b50, #091529 75%);
  border: 1px solid rgba(85, 180, 255, 0.22);
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 330px;
  padding: 42px 55px;
}

.hero-text {
  max-width: 650px;
  position: relative;
  z-index: 2;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #63caff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
}

.hero-text h1 {
  margin-top: 20px;
  color: white;
  font-size: clamp(34px, 4vw, 49px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -1.5px;
}

.hero-text h1 span {
  color: #61ceff;
}

.hero-text p {
  max-width: 580px;
  margin-top: 15px;
  color: #b0c3db;
  font-size: 14px;
  line-height: 1.8;
}

.hero-button,
.explore-button {
  color: white;
  background: linear-gradient(110deg, #087cff, #00a9d8);
  text-transform: none;
  font-weight: 700;
  box-shadow: 0 8px 25px rgba(0, 130, 255, 0.22);
  transition: 0.25s ease;
}

.hero-button:hover,
.explore-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0, 160, 255, 0.35);
}

.hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 240px;
  flex-shrink: 0;
}

.visual-ring {
  position: absolute;
  border: 1px solid rgba(85, 200, 255, 0.25);
  border-radius: 50%;
}

.ring-one {
  width: 200px;
  height: 200px;
}

.ring-two {
  width: 155px;
  height: 155px;
  border-color: rgba(85, 200, 255, 0.4);
}

.visual-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 125px;
  height: 125px;
  border-radius: 35px;
  background: rgba(48, 155, 255, 0.12);
  border: 1px solid rgba(85, 200, 255, 0.35);
  box-shadow: 0 0 55px rgba(0, 150, 255, 0.18);
}

.floating-tag {
  position: absolute;
  bottom: 8px;
  right: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 17px;
  border-radius: 12px;
  background: rgba(13, 29, 49, 0.95);
  border: 1px solid rgba(85, 200, 255, 0.25);
  color: #d6eaff;
  font-size: 11px;
}

/* SECTION HEADING */
.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-eyebrow {
  color: #60caff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
}

.section-heading h2 {
  margin-top: 5px;
  color: white;
  font-size: 24px;
  font-weight: 800;
}

.section-heading p {
  margin-top: 5px;
  color: #879bb4;
  font-size: 13px;
}

/* GLASS CARDS */
.glass-card {
  min-height: 430px;
  height: 100%;
  background: rgba(14, 25, 43, 0.86);
  border: 1px solid rgba(117, 175, 255, 0.17);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(18px);
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.glass-card:hover {
  border-color: rgba(85, 200, 255, 0.35);
  transform: translateY(-3px);
}

.card-heading {
  display: flex;
  align-items: center;
  gap: 14px;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(43, 154, 255, 0.12);
  border: 1px solid rgba(85, 200, 255, 0.2);
}

.card-heading h3 {
  color: white;
  font-size: 17px;
  font-weight: 700;
}

.card-heading p {
  margin-top: 3px;
  color: #879bb4;
  font-size: 12px;
}

/* PROFILE */
.profile-details {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile-avatar {
  border: 3px solid rgba(85, 200, 255, 0.65);
  box-shadow: 0 0 25px rgba(0, 150, 255, 0.15);
}

.profile-name h3 {
  color: white;
  font-size: 17px;
  font-weight: 700;
}

.profile-name p {
  margin-top: 4px;
  color: #8da1bb;
  font-size: 12px;
}

.verified-label {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 9px;
  color: #29d8bd;
  font-size: 11px;
}

.profile-divider {
  border-color: rgba(255, 255, 255, 0.1);
}

.info-item {
  display: flex;
  align-items: center;
  gap: 13px;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(43, 154, 255, 0.12);
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.info-content span {
  color: #879bb4;
  font-size: 11px;
}

.info-content strong {
  color: #e5effc;
  font-size: 13px;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.account-status {
  display: flex;
  align-items: center;
  gap: 9px;
  width: fit-content;
  padding: 10px 14px;
  border-radius: 10px;
  background: rgba(41, 216, 189, 0.09);
  border: 1px solid rgba(41, 216, 189, 0.2);
  color: #65e3cb;
  font-size: 11px;
}

/* VIDEO LEARNING */
.video-feature {
  position: relative;
  min-height: 255px;
  overflow: hidden;
  background:
    radial-gradient(circle at 85% 40%, rgba(0, 160, 255, 0.24), transparent 40%),
    linear-gradient(135deg, #122c4d, #0a172b);
  border: 1px solid rgba(85, 200, 255, 0.2);
}

.video-feature-content {
  position: relative;
  z-index: 2;
  max-width: 430px;
  padding: 25px;
}

.video-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 16px;
  background: rgba(43, 154, 255, 0.13);
  border: 1px solid rgba(85, 200, 255, 0.25);
}

.video-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  color: #63caff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.video-feature h2 {
  margin-top: 10px;
  color: white;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.video-feature p {
  margin-top: 10px;
  color: #a8bad1;
  font-size: 12px;
  line-height: 1.8;
}

.video-decoration {
  position: absolute;
  right: 15px;
  bottom: 12px;
  color: rgba(83, 185, 255, 0.09);
  transform: rotate(-12deg);
}

.learning-note {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #8297b1;
  font-size: 11px;
}

/* FOOTER */
.dashboard-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-top: 35px;
  padding: 20px 5px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #70849e;
  font-size: 11px;
}

.footer-brand span:first-child {
  color: #a8dfff;
  font-weight: 800;
}

.footer-divider {
  margin: 0 8px;
  color: #43546c;
}

.dashboard-footer p {
  text-align: right;
}

/* RESPONSIVE */
@media (max-width: 700px) {
  .nav-content {
    padding: 13px 15px;
  }

  .nav-right {
    gap: 10px;
  }

  .nav-status {
    display: none;
  }

  .hero-content {
    padding: 35px 25px;
  }

  .hero-visual {
    display: none;
  }

  .hero-text h1 {
    font-size: 35px;
  }

  .glass-card {
    min-height: auto;
  }

  .dashboard-footer {
    flex-direction: column;
    text-align: center;
  }

  .dashboard-footer p {
    text-align: center;
  }
}
</style>
