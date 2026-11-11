
<template>
  <v-container fluid class="video-page pa-4 pa-md-6">
    <!-- HEADER -->
    <v-row align="center" class="mb-5">
      <v-col>
        <div class="d-flex align-center ga-3">
          <v-avatar color="primary" rounded="lg" size="52">
            <v-icon color="white" size="32">mdi-school</v-icon>
          </v-avatar>
          <div>
            <h2 class="text-h5 font-weight-bold">UpSkill</h2>
            <p class="text-body-2 text-medium-emphasis">
              Video Learning Center
            </p>
          </div>
        </div>
      </v-col>

      <v-col cols="auto">
        <v-btn
          color="primary"
          variant="tonal"
          prepend-icon="mdi-arrow-left"
          @click="navigateTo('/')"
        >
          Dashboard
        </v-btn>
      </v-col>
    </v-row>

    <!-- HERO -->
    <v-card color="primary" rounded="xl" class="pa-5 pa-md-8 mb-6">
      <div class="text-overline">LEARN SOMETHING NEW</div>
      <h1 class="text-h4 font-weight-bold my-3">Video Library</h1>
      <p class="text-body-1">
        Explore educational videos and expand your knowledge
        at your own pace.
      </p>
    </v-card>

    <!-- SEARCH AND FILTER -->
    <v-row class="mb-2">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="search"
          label="Search videos"
          placeholder="Search by title or description..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          rounded="lg"
          clearable
          hide-details
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Filter Category"
          prepend-inner-icon="mdi-filter"
          variant="outlined"
          rounded="lg"
          hide-details
        />
      </v-col>
    </v-row>

    <!-- MAIN VIDEO AND PLAYLIST -->
    <v-row>
      <v-col cols="12" lg="8">
        <v-card rounded="xl" elevation="3" class="overflow-hidden">
          <div class="video-container">
            <video
              :key="selectedVideo.id"
              ref="videoElement"
              class="video-js"
              controls
              playsinline
            />

            <!-- CUSTOM THUMBNAIL -->
            <div v-if="!isPlaying" class="video-thumbnail">
              <img
                :src="selectedVideo.poster"
                :alt="selectedVideo.title"
                class="thumbnail-image"
              />

              <div class="thumbnail-overlay">
                <v-btn
                  icon
                  size="x-large"
                  color="white"
                  class="thumbnail-play-button"
                  aria-label="Play video"
                  :disabled="!playerReady"
                  :loading="!playerReady"
                  @click="startVideo"
                >
                  <v-icon size="48" color="white">
                    mdi-play
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </div>

          <v-card-text class="pa-5">
            <v-chip
              color="primary"
              variant="tonal"
              size="small"
              class="mb-3"
            >
              {{ selectedVideo.category }}
            </v-chip>

            <h2 class="text-h5 font-weight-bold mb-2">
              {{ selectedVideo.title }}
            </h2>

            <p class="text-body-2 text-medium-emphasis">
              {{ selectedVideo.description }}
            </p>

            <v-alert
              v-if="playerError"
              type="error"
              variant="tonal"
              rounded="lg"
              class="mt-4"
            >
              {{ playerError }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- PLAYLIST -->
      <v-col cols="12" lg="4">
        <v-card rounded="xl" elevation="3" class="pa-4">
          <div class="d-flex align-center ga-2 mb-3">
            <v-icon color="primary">mdi-play-box-multiple</v-icon>
            <h3 class="text-h6 font-weight-bold">Up Next</h3>
          </div>

          <p class="text-body-2 text-medium-emphasis mb-4">
            Select a video to start learning.
          </p>

          <v-list
            v-if="filteredVideos.length"
            class="pa-0"
            bg-color="transparent"
          >
            <v-list-item
              v-for="video in filteredVideos"
              :key="video.id"
              :active="selectedVideo.id === video.id"
              color="primary"
              rounded="lg"
              class="mb-2"
              @click="selectVideo(video)"
            >
              <template #prepend>
                <v-img
                  :src="video.poster"
                  width="100"
                  height="65"
                  cover
                  rounded="lg"
                  class="mr-2"
                />
              </template>

              <v-list-item-title class="font-weight-bold text-wrap">
                {{ video.title }}
              </v-list-item-title>

              <v-list-item-subtitle>
                {{ video.category }}
              </v-list-item-subtitle>

              <template #append>
                <v-icon
                  v-if="selectedVideo.id === video.id"
                  color="primary"
                >
                  mdi-play-circle
                </v-icon>
                <v-icon v-else size="small">
                  mdi-play-circle-outline
                </v-icon>
              </template>
            </v-list-item>
          </v-list>

          <v-alert v-else type="info" variant="tonal" rounded="lg">
            No videos found.
          </v-alert>

          <v-divider class="my-4" />

          <div class="d-flex justify-space-between text-caption">
            <span class="text-medium-emphasis">Total Videos</span>
            <strong>{{ filteredVideos.length }}</strong>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- EXPLORE VIDEOS -->
    <div class="mt-8">
      <div class="d-flex align-center justify-space-between flex-wrap mb-4">
        <div>
          <h2 class="text-h5 font-weight-bold">Explore Videos</h2>
          <p class="text-body-2 text-medium-emphasis">
            Discover more learning materials.
          </p>
        </div>

        <v-chip color="primary" variant="tonal">
          {{ filteredVideos.length }} Videos
        </v-chip>
      </div>

      <v-row v-if="filteredVideos.length">
        <v-col
          v-for="video in filteredVideos"
          :key="video.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            rounded="xl"
            elevation="2"
            class="h-100 video-card"
            @click="selectVideo(video)"
          >
            <v-img :src="video.poster" height="190" cover>
              <div class="d-flex align-center justify-center fill-height">
                <v-avatar color="white" size="55">
                  <v-icon color="primary" size="36">
                    mdi-play
                  </v-icon>
                </v-avatar>
              </div>
            </v-img>

            <v-card-text class="pa-4">
              <v-chip
                color="primary"
                size="x-small"
                variant="tonal"
                class="mb-2"
              >
                {{ video.category }}
              </v-chip>

              <h3 class="text-subtitle-1 font-weight-bold mb-2">
                {{ video.title }}
              </h3>

              <p class="text-body-2 text-medium-emphasis">
                {{ video.description }}
              </p>

              <div class="d-flex justify-end mt-4">
                <v-btn
                  color="primary"
                  variant="tonal"
                  size="small"
                  append-icon="mdi-play"
                  @click.stop="selectVideo(video)"
                >
                  Watch
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-alert v-else type="info" variant="tonal">
        No videos match your search.
      </v-alert>
    </div>

    <!-- FOOTER -->
    <v-divider class="my-8" />

    <div class="text-center text-caption text-medium-emphasis pb-4">
      © 2026 UpSkill | Learn. Improve. Achieve.
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import 'video.js/dist/video-js.css'

definePageMeta({
  middleware: 'auth'
})

interface LearningVideo {
  id: string
  title: string
  category: string
  description: string
  poster: string
}

const videos = ref<LearningVideo[]>([
  {
    id: 'SBDLuiPm83g',
    title: 'AMPANGET ng EDIT Mo',
    category: 'Video Editing',
    description: 'Learn video editing techniques and improve your editing skills.',
    poster: 'https://img.youtube.com/vi/SBDLuiPm83g/hqdefault.jpg'
  },
  {
    id: '8P8cw-Hu8cQ',
    title: 'ANG SAGWA NG COLOR GRADE MO!',
    category: 'Video Editing',
    description: 'Explore color grading techniques for better video quality.',
    poster: 'https://img.youtube.com/vi/8P8cw-Hu8cQ/hqdefault.jpg'
  },
  {
    id: '_n_SeqQtdas',
    title: 'PANGMALAKASANG CUTS',
    category: 'Video Editing',
    description: 'Learn video cutting and editing techniques.',
    poster: 'https://img.youtube.com/vi/_n_SeqQtdas/hqdefault.jpg'
  },
  {
    id: 'jJzuL3PhHv8',
    title: 'ANO ANG MAS MALUPET?',
    category: 'Video Editing',
    description: 'Explore creative editing tools and techniques.',
    poster: 'https://img.youtube.com/vi/jJzuL3PhHv8/hqdefault.jpg'
  },
  {
    id: '3yr_9gcGvl0',
    title: 'MEDIA OFFLINE',
    category: 'Video Editing',
    description: 'Learn more about video editing and media workflows.',
    poster: 'https://img.youtube.com/vi/3yr_9gcGvl0/hqdefault.jpg'
  },
  {
    id: 'blIxmvTBmBo',
    title: 'I-SYNC MO AUDIO MO',
    category: 'Video Editing',
    description: 'Explore audio synchronization techniques for video editing.',
    poster: 'https://img.youtube.com/vi/blIxmvTBmBo/hqdefault.jpg'
  }
])

const search = ref('')
const selectedCategory = ref('All')
const selectedVideo = ref<LearningVideo>(videos.value[0]!)

const videoElement = ref<HTMLVideoElement | null>(null)
const playerError = ref('')
const isPlaying = ref(false)
const playerReady = ref(false)

let player: any = null
let playbackTimeout: ReturnType<typeof setTimeout> | null = null

const categories = computed(() => [
  'All',
  ...new Set(videos.value.map(video => video.category))
])

const filteredVideos = computed(() => {
  return videos.value.filter(video => {
    const term = search.value.toLowerCase()

    const matchesSearch =
      video.title.toLowerCase().includes(term) ||
      video.description.toLowerCase().includes(term)

    const matchesCategory =
      selectedCategory.value === 'All' ||
      video.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

function clearPlaybackTimeout() {
  if (playbackTimeout) {
    clearTimeout(playbackTimeout)
    playbackTimeout = null
  }
}

function disposePlayer() {
  clearPlaybackTimeout()
  playerReady.value = false

  if (player && !player.isDisposed()) {
    player.dispose()
  }

  player = null
}


async function initializePlayer() {
  playerReady.value = false
  playerError.value = ''
  isPlaying.value = false

  try {
    await nextTick()

    const element = videoElement.value

    if (!element) {
      throw new Error('Video element is not available.')
    }

    // Validate YouTube video ID before initializing Video.js.
    const videoId = selectedVideo.value.id

    const isValidVideoId = /^[a-zA-Z0-9_-]{11}$/.test(videoId)

    if (!isValidVideoId) {
      playerError.value =
        'Invalid video ID. Please select another video.'

      return
    }

    const videojsModule = await import('video.js')
    const videojs = videojsModule.default

    ;(window as any).videojs = videojs

    // @ts-expect-error videojs-youtube has no TypeScript declarations
    await import('videojs-youtube')

    if (!element.isConnected || videoElement.value !== element) {
      return
    }

    const currentPlayer = videojs(element, {
      controls: true,
      autoplay: false,
      responsive: true,
      fluid: false,
      width: '100%',
      height: '100%',
      aspectRatio: '16:9',
      preload: 'none',
      bigPlayButton: false,

      techOrder: ['youtube'],

      sources: [
        {
          src: `https://www.youtube.com/watch?v=${videoId}`,
          type: 'video/youtube'
        }
      ],

      youtube: {
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        ytControls: 0
      }
    })

    player = currentPlayer

    currentPlayer.on('error', () => {
      if (player === currentPlayer) {
        clearPlaybackTimeout()

        playerError.value =
          'Unable to load this video. Please try another video.'

        isPlaying.value = false
      }
    })

    currentPlayer.on('playing', () => {
      if (player === currentPlayer) {
        clearPlaybackTimeout()
        playerError.value = ''
        isPlaying.value = true
      }
    })

    currentPlayer.ready(() => {
      if (player === currentPlayer && !currentPlayer.isDisposed()) {
        playerReady.value = true
      }
    })

  } catch (error) {
    console.error('Video.js initialization error:', error)

    playerError.value =
      'The video player could not be initialized. Please check your browser and try again.'
  }
}


function startVideo() {
  if (!player || !playerReady.value || player.isDisposed()) return

  isPlaying.value = true
  playerError.value = ''

  clearPlaybackTimeout()

  const currentPlayer = player

  // Fallback for YouTube errors that do not trigger Video.js error events.
  playbackTimeout = setTimeout(() => {
    if (
      player === currentPlayer &&
      !currentPlayer.isDisposed() &&
      currentPlayer.paused()
    ) {
      playerError.value =
        'Unable to load or play this video. Please check your connection or try another video.'

      isPlaying.value = false
      playbackTimeout = null
    }
  }, 15000)

  const playPromise = currentPlayer.play()

  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch((error: unknown) => {
      console.warn('Playback could not start:', error)

      clearPlaybackTimeout()

      playerError.value =
        'Unable to start playback. Please try again.'

      isPlaying.value = false
    })
  }
}

async function selectVideo(video: LearningVideo) {
  if (selectedVideo.value.id === video.id) return

  disposePlayer()

  playerError.value = ''
  isPlaying.value = false
  playerReady.value = false

  selectedVideo.value = video

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  await nextTick()
  await initializePlayer()
}

function seekBy(seconds: number) {
  if (!player || !playerReady.value || player.isDisposed()) return

  const currentTime = player.currentTime()
  const duration = player.duration()

  if (typeof currentTime !== 'number' || !Number.isFinite(currentTime)) {
    return
  }

  const newTime = Number.isFinite(duration)
    ? Math.max(0, Math.min(currentTime + seconds, duration))
    : Math.max(0, currentTime + seconds)

  player.currentTime(newTime)
}

function togglePlayback() {
  if (!player || !playerReady.value || player.isDisposed()) return

  if (player.paused()) {
    player.play()?.catch((error: unknown) => {
      console.warn('Playback could not start:', error)
      playerError.value = 'Unable to start playback. Please try again.'
    })
  } else {
    player.pause()
  }
}

function toggleFullscreen() {
  if (!player || !playerReady.value || player.isDisposed()) return

  if (player.isFullscreen()) {
    player.exitFullscreen()
  } else {
    player.requestFullscreen()
  }
}

function handleKeyboardControls(event: KeyboardEvent) {
  if (!player || !playerReady.value || player.isDisposed()) return

  const target = event.target as HTMLElement | null

  if (
    target?.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName || '')
  ) return

  if (event.ctrlKey || event.altKey || event.metaKey) return

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      seekBy(-10)
      break

    case 'ArrowRight':
      event.preventDefault()
      seekBy(10)
      break

    case ' ':
      event.preventDefault()
      togglePlayback()
      break

    case 'f':
    case 'F':
      event.preventDefault()
      toggleFullscreen()
      break

    case 'm':
    case 'M':
      event.preventDefault()
      player.muted(!player.muted())
      break
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeyboardControls)
  await initializePlayer()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboardControls)
  disposePlayer()
})
</script>

<style scoped>
.video-page {
  min-height: 100vh;
  background: #f4f6fa;
}

.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  overflow: hidden;
}

.video-container :deep(.video-js) {
  position: absolute;
  inset: 0;
  width: 100% !important;
  height: 100% !important;
  padding-top: 0 !important;
  overflow: hidden;
}

.video-container :deep(iframe.vjs-tech) {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  transform: none !important;
}

.video-container :deep(.vjs-big-play-button) {
  display: none !important;
}

.video-container :deep(.vjs-tech) {
  object-fit: contain;
}

.video-thumbnail {
  position: absolute;
  inset: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
}

.thumbnail-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.thumbnail-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.08);
}

.thumbnail-play-button {
  width: 76px !important;
  height: 76px !important;
  background: rgba(0, 0, 0, 0.65) !important;
  border: 2px solid rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease, background 0.2s ease;
}

.thumbnail-play-button:hover {
  transform: scale(1.1);
  background: rgba(0, 0, 0, 0.85) !important;
}

.video-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.video-card:hover {
  transform: translateY(-4px);
}
</style>
