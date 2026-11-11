<template>
  <v-container fluid class="video-page pa-4 pa-md-8">
    <header class="video-header mb-8">
      <div class="d-flex align-center ga-3">
        <v-avatar rounded="lg" size="48" class="brand-icon">
          <v-icon color="white" size="29">mdi-school</v-icon>
        </v-avatar>
        <div>
          <div class="brand-name">UpSkill</div>
          <div class="brand-caption">YOUR DIGITAL LEARNING SPACE</div>
        </div>
      </div>
      <div class="d-flex align-center ga-3">
        <div class="header-status d-none d-sm-flex align-center ga-2">
          <span class="status-dot"></span> Learning Space
        </div>
        <v-btn class="dashboard-btn" variant="outlined" prepend-icon="mdi-arrow-left" to="/">
          Dashboard
        </v-btn>
      </div>
    </header>

    <section class="library-hero mb-8">
      <div class="hero-copy">
        <div class="eyebrow mb-4"><v-icon size="16">mdi-play-box-multiple</v-icon> YOUR LEARNING LIBRARY</div>
        <h1 class="hero-title">Learn something <span>new.</span></h1>
        <p class="hero-description">Explore practical lessons, discover new skills, and learn at your own pace.</p>
        <div class="hero-meta">
          <span><v-icon size="17">mdi-play-circle-outline</v-icon> Video lessons</span>
          <span><v-icon size="17">mdi-lightning-bolt-outline</v-icon> Learn anytime</span>
          <span><v-icon size="17">mdi-school-outline</v-icon> Keep growing</span>
        </div>
      </div>
      <div class="hero-art d-none d-md-flex">
        <div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div>
        <div class="hero-art-icon"><v-icon size="76">mdi-play-box-multiple</v-icon></div>
        <div class="hero-floating-tag"><v-icon color="cyan-lighten-2">mdi-lightning-bolt</v-icon> Keep Growing</div>
      </div>
    </section>

    <section class="library-tools mb-6">
      <div class="section-heading">
        <div><div class="eyebrow">FIND YOUR NEXT LESSON</div><h2 class="section-title">Explore the library</h2></div>
        <div class="library-count"><span class="count-number">{{ filteredVideos.length }}</span><span>VIDEOS</span></div>
      </div>
      <v-row class="mt-2">
        <v-col cols="12" md="8">
          <v-text-field v-model="search" placeholder="Search videos by title or description..." prepend-inner-icon="mdi-magnify" variant="outlined" rounded="lg" clearable hide-details class="dark-input" />
        </v-col>
        <v-col cols="12" md="4">
          <v-select v-model="selectedCategory" :items="categories" label="Filter category" prepend-inner-icon="mdi-filter-variant" variant="outlined" rounded="lg" hide-details class="dark-input" />
        </v-col>
      </v-row>
    </section>

    <v-row class="player-layout">
      <v-col cols="12" lg="8">
        <v-card rounded="xl" class="player-card h-100" elevation="0">
          <div class="player-topline">
            <div class="d-flex align-center ga-2"><span class="live-dot"></span><span class="player-label">NOW PLAYING</span></div>
            <span class="player-index">FEATURED LESSON</span>
          </div>
          <div class="video-container">
            <video :key="selectedVideo.id" ref="videoElement" class="video-js" controls playsinline />
            <div v-if="!isPlaying" class="video-thumbnail">
              <img :src="selectedVideo.poster" :alt="selectedVideo.title" class="thumbnail-image" />
              <div class="thumbnail-shade"></div>
              <div class="thumbnail-overlay">
                <v-btn icon size="x-large" class="thumbnail-play-button" aria-label="Play video" :disabled="!playerReady" :loading="!playerReady" @click="startVideo">
                  <v-icon size="42" color="white">mdi-play</v-icon>
                </v-btn>
              </div>
              <div class="thumbnail-caption"><span class="eyebrow">UPSKILL VIDEO LESSON</span><div>{{ selectedVideo.title }}</div></div>
            </div>
          </div>
          <v-card-text class="player-details pa-5 pa-md-6">
            <div class="d-flex align-center justify-space-between flex-wrap ga-3 mb-3">
              <v-chip class="category-chip" size="small" variant="tonal"><v-icon start size="14">mdi-tag-outline</v-icon>{{ selectedVideo.category }}</v-chip>
              <span class="detail-kicker"><v-icon size="15">mdi-book-open-variant</v-icon> LEARNING MATERIAL</span>
            </div>
            <h2 class="video-title">{{ selectedVideo.title }}</h2>
            <p class="video-description">{{ selectedVideo.description }}</p>
            <v-alert v-if="playerError" type="error" variant="tonal" rounded="lg" class="mt-4">{{ playerError }}</v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card rounded="xl" class="playlist-card pa-4 pa-md-5 h-100" elevation="0">
          <div class="playlist-heading mb-1">
            <div><div class="eyebrow">YOUR QUEUE</div><h2 class="section-title">Up Next</h2></div>
            <v-avatar size="42" class="playlist-icon"><v-icon color="cyan-lighten-2">mdi-playlist-play</v-icon></v-avatar>
          </div>
          <p class="playlist-subtitle mb-4">Choose another lesson and continue learning.</p>
          <div class="playlist-list" v-if="filteredVideos.length">
            <button v-for="(video, index) in filteredVideos" :key="video.id" type="button" class="playlist-item" :class="{ 'playlist-item-active': selectedVideo.id === video.id }" @click="selectVideo(video)">
              <div class="playlist-thumb"><img :src="video.poster" :alt="video.title" /><span class="playlist-play"><v-icon size="18">mdi-play</v-icon></span></div>
              <div class="playlist-info">
                <span class="playlist-number">LESSON {{ String(index + 1).padStart(2, '0') }}</span>
                <strong>{{ video.title }}</strong><span>{{ video.category }}</span>
              </div>
              <v-icon class="playlist-indicator" :color="selectedVideo.id === video.id ? 'cyan-lighten-2' : 'grey-darken-1'" size="20">{{ selectedVideo.id === video.id ? 'mdi-volume-high' : 'mdi-play-circle-outline' }}</v-icon>
            </button>
          </div>
          <v-alert v-else type="info" variant="tonal" rounded="lg">No videos found. Try another search or category.</v-alert>
          <div class="playlist-footer mt-5">
            <div class="d-flex justify-space-between align-center mb-2"><span>Available lessons</span><strong>{{ filteredVideos.length }}</strong></div>
            <div class="playlist-progress"><span :style="{ width: `${filteredVideos.length ? 100 : 0}%` }"></span></div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <section class="explore-section mt-10">
      <div class="d-flex align-center justify-space-between flex-wrap ga-3 mb-5">
        <div><div class="eyebrow">KEEP EXPLORING</div><h2 class="section-title">More to discover</h2><p class="section-subtitle">Pick a topic and build your skills one video at a time.</p></div>
        <div class="collection-total"><v-icon size="17">mdi-video-outline</v-icon>{{ filteredVideos.length }} lessons</div>
      </div>
      <v-row v-if="filteredVideos.length">
        <v-col v-for="video in filteredVideos" :key="video.id" cols="12" sm="6" md="4">
          <v-card rounded="xl" class="video-card h-100" elevation="0" @click="selectVideo(video)">
            <div class="video-card-image">
              <v-img :src="video.poster" height="190" cover>
                <div class="card-image-overlay"><v-avatar size="54" class="card-play-icon"><v-icon size="30" color="white">mdi-play</v-icon></v-avatar></div>
              </v-img>
              <span class="card-category">{{ video.category }}</span>
            </div>
            <v-card-text class="pa-4">
              <div class="card-kicker">UPSKILL LESSON</div>
              <h3 class="card-title">{{ video.title }}</h3>
              <p class="card-description">{{ video.description }}</p>
              <div class="card-action"><span>Watch lesson</span><v-icon size="18">mdi-arrow-up-right</v-icon></div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-alert v-else type="info" variant="tonal" rounded="lg">No videos match your search. Try a different keyword or category.</v-alert>
    </section>

    <footer class="video-footer mt-10">
      <div class="footer-brand"><v-icon size="19" color="cyan-lighten-2">mdi-school</v-icon><strong>UpSkill</strong></div>
      <span>© 2026 UpSkill. Learn. Improve. Achieve.</span>
      <span class="footer-tagline">YOUR NEXT SKILL STARTS HERE.</span>
    </footer>
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
    category: 'Color Grading',
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
    category: 'Audio Editing',
    description: 'Explore audio synchronization techniques for video editing.',
    poster: 'https://img.youtube.com/vi/blIxmvTBmBo/hqdefault.jpg'
  }
])

const search = ref('')
const selectedCategory = ref('All Categories')
const selectedVideo = ref<LearningVideo>(videos.value[0]!)

const videoElement = ref<HTMLVideoElement | null>(null)
const playerError = ref('')
const isPlaying = ref(false)
const playerReady = ref(false)

let player: any = null
let playbackTimeout: ReturnType<typeof setTimeout> | null = null

const categories = computed(() => [
  'All Categories',
  ...new Set(videos.value.map(video => video.category))
])

const filteredVideos = computed(() => {
  return videos.value.filter(video => {
    const term = search.value.toLowerCase()

    const matchesSearch =
      video.title.toLowerCase().includes(term) ||
      video.description.toLowerCase().includes(term)

    const matchesCategory =
      selectedCategory.value === 'All Categories' ||
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

  // No window.scrollTo here.
  // The page will stay at its current scroll position when changing videos.

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
.video-page{min-height:100vh;color:#f5f8ff;background:radial-gradient(ellipse at 8% 0%,rgba(17,104,177,.19),transparent 34%),radial-gradient(ellipse at 95% 30%,rgba(0,190,220,.09),transparent 28%),#050a16}
.video-header{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 22px;border:1px solid #1d3554;border-radius:22px;background:rgba(13,23,42,.92)}
.brand-icon{background:linear-gradient(135deg,#087bff,#00c5e8);box-shadow:0 8px 24px rgba(0,161,255,.2)}
.brand-name{color:#fff;font-size:22px;font-weight:850;letter-spacing:-.7px}.brand-caption,.eyebrow{color:#52cfff;font-size:10px;font-weight:800;letter-spacing:2px}
.header-status{color:#a8bbd3;font-size:13px}.status-dot,.live-dot{width:8px;height:8px;border-radius:50%;background:#28e0c0;box-shadow:0 0 12px rgba(40,224,192,.8)}
.dashboard-btn{color:#b8dfff!important;border-color:#285071!important;border-radius:10px}
.library-hero{position:relative;min-height:290px;display:flex;align-items:center;justify-content:space-between;overflow:hidden;padding:42px 52px;border:1px solid #21466c;border-radius:26px;background:linear-gradient(112deg,#10294b 0%,#0b3155 58%,#071a31 100%)}
.hero-copy{position:relative;z-index:2;max-width:690px}.hero-title{color:#fff;font-size:clamp(38px,5vw,62px);font-weight:900;line-height:1.08;letter-spacing:-2.6px}.hero-title span{color:#55caff}
.hero-description{max-width:580px;margin-top:18px;color:#c0d4ec;font-size:15px;line-height:1.8}.hero-meta{display:flex;flex-wrap:wrap;gap:22px;margin-top:26px;color:#d7e8fb;font-size:12px}.hero-meta span{display:flex;align-items:center;gap:7px}.hero-meta :deep(.v-icon){color:#51cfff}
.hero-art{position:relative;width:250px;height:220px;align-items:center;justify-content:center;margin-right:35px;color:#57ceff}.hero-orbit{position:absolute;border:1px solid rgba(64,190,255,.24);border-radius:50%}.orbit-one{width:210px;height:210px}.orbit-two{width:160px;height:160px}
.hero-art-icon{width:128px;height:128px;display:grid;place-items:center;border:1px solid #28618a;border-radius:34px;background:rgba(16,65,105,.75);box-shadow:0 0 55px rgba(0,174,255,.15)}
.hero-floating-tag{position:absolute;right:-25px;bottom:18px;display:flex;align-items:center;gap:9px;padding:12px 16px;border:1px solid #245274;border-radius:13px;background:#0b1b30;color:#e7f5ff;font-size:12px}
.section-heading,.playlist-heading{display:flex;align-items:center;justify-content:space-between;gap:16px}.section-title{margin-top:7px;color:#f6f8ff;font-size:25px;font-weight:850;letter-spacing:-.6px}
.section-subtitle,.playlist-subtitle{margin-top:7px;color:#8ea4c0;font-size:13px}.library-count,.collection-total{display:flex;align-items:center;gap:8px;color:#9bb1ca;font-size:11px;font-weight:800;letter-spacing:1px}.count-number{color:#59d0ff;font-size:24px;letter-spacing:0}
.dark-input :deep(.v-field){color:#e9f3ff;background:#0d1729;border-radius:13px}.dark-input :deep(.v-field__outline){color:#29415e}.dark-input :deep(.v-label),.dark-input :deep(input),.dark-input :deep(.v-select__selection-text){color:#d9e7f7}.dark-input :deep(.v-icon){color:#55caff}
.player-card,.playlist-card,.video-card{overflow:hidden;border:1px solid #203653;background:#0d1729!important;color:#f5f8ff}
.player-topline{display:flex;justify-content:space-between;align-items:center;padding:17px 20px;border-bottom:1px solid #1c304a}.player-label,.player-index{color:#a8bdd5;font-size:10px;font-weight:800;letter-spacing:1.5px}.player-index{color:#4fcaff}
.video-container{position:relative;width:100%;aspect-ratio:16/9;background:#000;overflow:hidden}.video-container :deep(.video-js){position:absolute;inset:0;width:100%!important;height:100%!important;padding-top:0!important;overflow:hidden}
.video-container :deep(iframe.vjs-tech){position:absolute!important;top:0!important;left:0!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;transform:none!important}
.video-container :deep(.vjs-big-play-button){display:none!important}.video-container :deep(.vjs-tech){object-fit:contain}
.video-thumbnail{position:absolute;inset:0;z-index:10;width:100%;height:100%;overflow:hidden;background:#000}.thumbnail-image{display:block;width:100%;height:100%;object-fit:cover;object-position:center}
.thumbnail-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,8,18,.88),transparent 62%)}.thumbnail-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.08)}
.thumbnail-play-button{width:76px!important;height:76px!important;border:2px solid rgba(255,255,255,.85);background:linear-gradient(135deg,#0787ff,#00bdda)!important;box-shadow:0 0 35px rgba(0,174,255,.4);transition:transform .2s ease}.thumbnail-play-button:hover{transform:scale(1.1)}
.thumbnail-caption{position:absolute;left:25px;bottom:22px;color:#fff;font-size:clamp(16px,2vw,23px);font-weight:800}.thumbnail-caption .eyebrow{display:block;margin-bottom:7px;font-size:9px}
.player-details{background:#0d1729}.category-chip{color:#66d5ff!important;background:rgba(0,171,232,.12)!important;border:1px solid rgba(75,194,255,.22)}
.detail-kicker{display:flex;align-items:center;gap:6px;color:#7189a6;font-size:10px;font-weight:700;letter-spacing:1px}.video-title{color:#f7f9ff;font-size:24px;font-weight:850;letter-spacing:-.5px}.video-description{margin-top:9px;color:#9aadc5;font-size:14px;line-height:1.7}
.playlist-icon{border:1px solid #245273;background:#102943}.playlist-list{display:flex;flex-direction:column;gap:9px}
.playlist-item{width:100%;display:flex;align-items:center;gap:11px;padding:10px;border:1px solid transparent;border-radius:13px;background:#111f34;color:#eaf3ff;text-align:left;cursor:pointer;transition:.2s ease}
.playlist-item:hover{border-color:#28577a;background:#142943}.playlist-item-active{border-color:#168fca;background:linear-gradient(100deg,rgba(0,145,220,.2),#12243a)}
.playlist-thumb{position:relative;flex:0 0 92px;height:62px;overflow:hidden;border-radius:8px;background:#050a16}.playlist-thumb img{width:100%;height:100%;object-fit:cover}
.playlist-play{position:absolute;inset:0;display:grid;place-items:center;color:#fff;background:rgba(0,0,0,.22)}.playlist-info{min-width:0;flex:1;display:flex;flex-direction:column;gap:4px}
.playlist-number,.card-kicker{color:#52cfff;font-size:9px;font-weight:800;letter-spacing:1.2px}.playlist-info strong{overflow:hidden;color:#edf5ff;font-size:12px;line-height:1.35;text-overflow:ellipsis}
.playlist-info>span:last-child{color:#8299b5;font-size:10px}.playlist-indicator{flex:0 0 auto}.playlist-footer{padding-top:15px;border-top:1px solid #20334c;color:#8ea4bd;font-size:12px}.playlist-footer strong{color:#5bcfff}
.playlist-progress{height:5px;overflow:hidden;border-radius:99px;background:#1d3049}.playlist-progress span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#087bff,#36d4e8)}
.collection-total{padding:10px 13px;border:1px solid #203c59;border-radius:10px;background:#0d1729;color:#b4c8df;letter-spacing:0}
.video-card{cursor:pointer;transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease}.video-card:hover{transform:translateY(-5px);border-color:#2875a4;box-shadow:0 14px 35px rgba(0,0,0,.22)!important}
.video-card-image{position:relative}.card-image-overlay{display:flex;align-items:center;justify-content:center;width:100%;height:190px;background:rgba(1,8,18,.18);transition:background .2s ease}.video-card:hover .card-image-overlay{background:rgba(1,8,18,.38)}
.card-play-icon{border:1px solid rgba(255,255,255,.65);background:linear-gradient(135deg,#0787ff,#00bdda);box-shadow:0 0 25px rgba(0,174,255,.32)}
.card-category{position:absolute;left:13px;bottom:13px;padding:6px 10px;border:1px solid rgba(96,207,255,.28);border-radius:7px;background:rgba(4,17,33,.86);color:#72d8ff;font-size:10px;font-weight:700}
.card-title{margin-top:8px;color:#f3f7ff;font-size:16px;font-weight:800;line-height:1.4}.card-description{min-height:42px;margin-top:8px;color:#91a6c0;font-size:12px;line-height:1.7}
.card-action{display:flex;align-items:center;justify-content:space-between;margin-top:18px;padding-top:13px;border-top:1px solid #20334b;color:#57ceff;font-size:12px;font-weight:750}
.video-footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;padding:22px 4px 8px;border-top:1px solid #1d3049;color:#7188a5;font-size:11px}
.footer-brand{display:flex;align-items:center;gap:8px;color:#eaf4ff;font-size:15px}.footer-tagline{color:#4fcaff;font-size:9px;font-weight:800;letter-spacing:1.5px}
@media(max-width:600px){.video-page{padding:16px!important}.video-header{padding:11px 13px;border-radius:16px}.brand-name{font-size:19px}.brand-caption{font-size:8px;letter-spacing:1px}.dashboard-btn{min-width:0!important;padding-inline:10px!important}.library-hero{min-height:auto;padding:30px 24px;border-radius:20px}.hero-title{font-size:38px;letter-spacing:-1.5px}.hero-description{font-size:13px}.hero-meta{gap:12px}.hero-meta span{font-size:10px}.section-title{font-size:22px}.player-topline{padding:14px}.thumbnail-caption{left:15px;bottom:14px}.video-title{font-size:20px}.video-footer{justify-content:center;text-align:center}}
</style>