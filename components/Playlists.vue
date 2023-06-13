<template>
  <div class="flex flex-col items-center my-4">
    <span class="text-4xl font-bold dark:text-blue-light mb-10">Playlists</span>
    <div class="flex flex-wrap justify-center items-center gap-4 my-3">
      <div v-for="playlist in playlists" class="flex flex-col border dark:border-0 border-gray-input rounded-2xl shadow-md bg-white dark:bg-darker cursor-pointer" @click="$emit('playlist', playlist)">
        <img class="rounded-t-2xl" :src="playlist.thumbnails.medium.url"  :alt="playlist.name"/>
        <span class="my-2 text-center text-2xl dark:text-blue-light">{{playlist.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Playlists',
  data() {
    return {
      key: this.$config.key,
      channel: this.$config.channel,
      playlists: [],
    }
  },
  async mounted() {
    try {
      const response = await this.$axios.get(`/youtube/playlists?part=snippet&maxResults=20&channelId=${this.channel}&key=${this.key}`)
      this.playlists = response.data.items.map(playlist => ({
        id: playlist.id,
        name: playlist.snippet.title,
        thumbnails: playlist.snippet.thumbnails,
      }))
    } catch (e) {
      if (e.response?.data?.error?.message)
        console.log("ERROR:", e.response.data.error.message)
      else throw e
    }
  },
}
</script>
