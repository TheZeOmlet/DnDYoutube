<template>
  <div class="flex flex-col items-center my-4">
    <div v-if="playlistId" class="flex flex-col items-center">
      <span class="text-4xl font-bold dark:text-blue-light">Player</span>
      <div class="flex gap-6 my-4">
        <div class="w-20 h-20 flex items-center justify-center rounded-full dark:text-blue-light text-darker bg-black dark:bg-darker cursor-pointer" @click="prevVideo()">
          <font-awesome-icon class="text-4xl" :icon="getIcons.faBackwardStep" />
        </div>
        <div class="w-20 h-20 flex items-center justify-center rounded-full dark:text-blue-light text-darker bg-black dark:bg-darker cursor-pointer" @click="stopVideo()">
          <font-awesome-icon class="text-4xl" :icon="getIcons.faStop" />
        </div>
        <div class="w-20 h-20 flex items-center justify-center rounded-full dark:text-blue-light text-darker bg-black dark:bg-darker cursor-pointer" @click="playPauseVideo()">
          <font-awesome-icon class="text-2xl" :icon="getIcons.faPlay" />
          <font-awesome-icon class="text-2xl" :icon="getIcons.faPause" />
        </div>
        <div class="w-20 h-20 flex items-center justify-center rounded-full dark:text-blue-light text-darker bg-black dark:bg-darker cursor-pointer" @click="nextVideo()">
          <font-awesome-icon class="text-4xl" :icon="getIcons.faForwardStep" />
        </div>
      </div>
    </div>
    <div class="flex gap-4">
      <div v-if="playlistId" class="w-20 h-20 flex items-center justify-center rounded-full dark:text-blue-light text-darker bg-black dark:bg-darker cursor-pointer" @click="showVideo = !showVideo">
        <font-awesome-icon class="text-2xl" :icon="showVideo? getIcons.faMinimize : getIcons.faMaximize" />
      </div>
      <div v-if="playlistId" class="w-20 h-20 flex items-center justify-center rounded-full dark:text-blue-light text-darker bg-black dark:bg-darker cursor-pointer" @click="reload()">
        <font-awesome-icon class="text-2xl" :icon="getIcons.faRotateRight" />
      </div>
    </div>
    <div :class="{'hidden': !showVideo}" class="my-4 max-sm:w-24">
      <div id="player" />
    </div>
  </div>
</template>

<script>
import YouTubePlayer from 'youtube-player';
import {faStop, faPlay, faPause, faForwardStep, faBackwardStep, faMaximize, faMinimize, faRotateRight} from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'Player',
  data() {
    return {
      key: this.$config.key,
      player: null,
      showVideo: false
    }
  },
  props: {
    playlistId: { type: String, required: false, default: null }
  },
  mounted() {
    this.player = YouTubePlayer('player')
  },
  computed: {
    getIcons() {
      return { faStop, faPlay, faPause, faForwardStep, faBackwardStep, faMaximize, faMinimize, faRotateRight }
    }
  },
  watch: {
    async playlistId() {
      await this.loadPlaylist()
    }
  },
  methods: {
    async playPauseVideo() {
      const state = await this.player.getPlayerState()
      if (state === 1)
        this.player.pauseVideo()
      else this.player.playVideo()
    },
    stopVideo() {
      this.player.stopVideo()
    },
    prevVideo() {
      this.player.previousVideo()
    },
    nextVideo() {
      this.player.nextVideo()
    },
    async reload() {
      if(this.player) this.player.destroy()
      this.player = YouTubePlayer('player')
      await this.loadPlaylist()
    },
    async loadPlaylist() {
      try {
        const response = await this.$axios.get(`/youtube/playlistItems?part=snippet&maxResults=1000&playlistId=${this.playlistId}&key=${this.key}`)
        const videoIds = response.data.items.map((item) => item.snippet.resourceId.videoId)
        await this.player.loadPlaylist(videoIds, Math.floor(Math.random() * videoIds.length))
        setTimeout(() => {console.log("SHUFFLED"); this.player.setShuffle(true); this.player.setLoop(true)}, 2000)
      } catch (e) {
        if (e.response?.data?.error?.message)
          console.error("ERROR:", e.response.data.error.message)
        else throw e
      }
    }
  }
}
</script>
