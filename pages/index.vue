<template>
  <div class="flex flex-col items-center w-full select-none">
    <Playlists @playlist="playlistId = $event.id" />
    <Player :playlist-id="playlistId" />
  </div>
</template>

<script>
import Playlists from "@/components/Playlists"
import Player from "@/components/Player"

export default {
  name: 'IndexPage',
  components: {
    Playlists, Player
  },
  data() {
    return {
      playlistId: null
    }
  },
}
</script>

<style>
body {
  background-color: #EDF2F7;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #0F172A;
  }
}
</style>
