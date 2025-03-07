<template lang="pug">
  header(class="h-16 bg-gray-950 flex items-center justify-center")
    h1(class="text-white text-xl font-bold cursor-pointer" @click="showSound = !showSound") CaitVi
    template(v-if="showSound")
      i(class="el-icon-video-play text-white cursor-pointer ml-2 text-[18px]" @click="playSound")
      i(class="el-icon-video-pause text-white cursor-pointer ml-2 text-[18px]" @click="pauseSound")
      i(class="el-icon-refresh-right text-white cursor-pointer ml-2 text-[18px]" @click="stopSound")
</template>

<script>
export default {
  name: 'HeaderLayout',
  data() {
    return {
      audio: null,
      showSound: false,
    }
  },
  mounted() {
    const basePath = process.env.NODE_ENV === 'production' ? '/caitvi' : '';
    this.audio = new Audio(`${basePath}/sound/caitviep8.mp3`);
  },
  methods: {
   // 播放音效
   async playSound() {
     try {
       if (!this.audio) {
          const basePath = process.env.NODE_ENV === 'production' ? '/caitvi' : '';
          this.audio = new Audio(`${basePath}/sound/caitviep8.mp3`);
       }
       await this.audio.play();
     } catch (error) {
       console.error('播放音效失敗:', error);
     }
   },
   // 暫停音效
   pauseSound() {
     if (this.audio) {
       this.audio.pause();
     }
   },
   // 停止音效（暫停並重置進度）
   stopSound() {
     if (this.audio) {
       this.audio.pause();
       this.audio.currentTime = 0;
     }
   }
  },
  beforeUnmount() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}
</script>
<style scoped>
i:active {
  scale: 0.9;
}
</style>
