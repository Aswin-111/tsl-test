<template>
  <div id="audio-player-root" class="w-100 h-100">
    <!-- Hide the default audio player -->
    <audio style="display: none" ref="player" :id="playerid">
      <source :src="selectedLanguage ? audios[selectedLanguage] : audios['english']" type="audio/mpeg" />
    </audio>

    <div class="w-100 h-100 px-2 d-flex align-items-center" style="margin: auto">
      <div id="player-row" class="w-100 d-flex justify-content-center align-items-center">
        <div id="button-div" class="pr-3">
          <svg
            @click="toggleAudio()"
            v-show="!isPlaying"
            class="play-button text-gray-400"
            :class="{
              'text-orange-600': audioLoaded,
              'hover:text-orange-400': audioLoaded,
              'cursor-pointer': audioLoaded,
            }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            @click="toggleAudio()"
            v-show="isPlaying"
            class="play-button text-orange-400 hover:text-orange-400 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div id="progress-bar" class="w-100">
          <div class="range-div">
            <input
              v-model="playbackTime"
              type="range"
              min="0"
              :max="audioDuration"
              class=""
              id="position"
              name="position"
            />

            <div
              v-show="audioLoaded"
              class="flex w-full justify-between absolute top-0 bottom-0 right-0 left-0 px-2 pointer-events-none"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { eventBus } from "@/eventBus";
export default {
  name: "AudioPlayer",
  props: {
    selectedLanguage: String,
    audios: Object,
  },
  data() {
    return {
      playbackTime: 0,
      audioDuration: 100,
      audioLoaded: false,
      isPlaying: false,
      listenerActive: false,
    };
  },
  created(){
    this.$eventBus.$on("proceedClicked", () => this.startAudio());
  },
  watch: {
    selectedLanguage(newVal) {
      this.changeLanguage();
    },
  },
  methods: {
    startAudio() {
  const audio = this.$refs.player;
  if (audio && audio.paused !== undefined) {
    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
    }
  } else {
    console.error("Audio element is null or undefined.");
  }
},

changeLanguage() {
  const audio = this.$refs.player;
  if (audio) {
    audio.src = this.selectedLanguage ? this.audios[this.selectedLanguage] : "";
    audio.load();
  }
},

    initSlider() {
      const audio = this.$refs.player;
      if (audio) {
        this.audioDuration = Math.round(audio.duration);
      }
    },
    updateTimeValues() {
      this.elapsedTime = this.convertTime(audio.currentTime);
      this.totalTime = this.convertTime(audio.duration);
    },
    convertTime(seconds) {
      const format = (val) => `0${Math.floor(val)}`.slice(-2);
      const hours = seconds / 3600;
      const minutes = (seconds % 3600) / 60;
      return [minutes, seconds % 60].map(format).join(":");
    },
    totalTime() {
      const audio = this.$refs.player;
      if (audio) {
        const seconds = audio.duration;
        return this.convertTime(seconds);
      } else {
        return "00:00";
      }
    },
    elapsedTime() {
      const audio = this.$refs.player;
      if (audio) {
        const seconds = audio.currentTime;
        return this.convertTime(seconds);
      } else {
        return "00:00";
      }
    },
    playbackListener(e) {
      const audio = this.$refs.player;
      this.playbackTime = audio.currentTime;
      audio.addEventListener("ended", this.endListener);
      audio.addEventListener("pause", this.pauseListener);
    },
    pauseListener() {
      this.isPlaying = false;
      this.listenerActive = false;
      this.cleanupListeners();
    },
    endListener() {
      this.isPlaying = false;
      this.listenerActive = false;
      this.cleanupListeners();
    },
    cleanupListeners() {
      const audio = this.$refs.player;
      audio.removeEventListener("timeupdate", this.playbackListener);
      audio.removeEventListener("ended", this.endListener);
      audio.removeEventListener("pause", this.pauseListener);
    },
    toggleAudio() {
      const audio = this.$refs.player;
      if (audio.paused) {
        audio.play();
        this.isPlaying = true;
      } else {
        audio.pause();
        this.isPlaying = false;
      }
    },
   
  },
  mounted() {
    this.$nextTick(() => {
      const audio = this.$refs.player;
      audio.addEventListener("canplay", () => {
        this.initSlider();
        this.audioLoaded = true;
      });

      this.$watch("isPlaying", () => {
        if (this.isPlaying) {
          if (!this.listenerActive) {
            this.listenerActive = true;
            audio.addEventListener("timeupdate", this.playbackListener);
          }
        }
      });

      this.$watch("playbackTime", () => {
        const diff = Math.abs(this.playbackTime - audio.currentTime);
        if (diff > 0.01) {
          audio.currentTime = this.playbackTime;
        }
      });
    });
  },

  
};
</script>

<style>
/* Play/Pause Button */
.play-button {
  height: 40px;
  color: white;
}

input[type="range"] {
  position: relative;
  margin: auto;
  height: 0.3vw;
  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  width: 95%;
  cursor: pointer;
  outline: none;
  border-radius: 2px; /* iOS */
  background-color: violet !important;
}
input[type="range"]:focus {
  outline: none;
}
::-webkit-slider-runnable-track {
  background: #fff;
}

::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0;
  height: 40px;
  background: #fff;
  box-shadow: -100vw 0 0 100vw #576574;
  border: none;
}

::-moz-range-track {
  height: 40px;
  background: #ddd;
}

::-moz-range-thumb {
  background: #fff;
  height: 40px;
  width: 0;
  border: none;
  border-radius: 0 !important;
  box-shadow: -100vw 0 0 100vw dodgerblue;
  box-sizing: border-box;
}

::-ms-fill-lower {
  background: rgb(0, 72, 143);
}

::-ms-thumb {
  background: #fff;
  border: 2px solid #999;
  height: 40px;
  width: 20px;
  box-sizing: border-box;
}

::-ms-ticks-after {
  display: none;
}

::-ms-ticks-before {
  display: none;
}

::-ms-track {
  background: #ddd;
  color: transparent;
  height: 40px;
  border: none;
}

::-ms-tooltip {
  display: none;
}



@media only screen and (max-width: 600px) {

  input[type="range"] {
  position: relative;
  margin: auto;
  height: 1vw;
  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  width: 95%;
  cursor: pointer;
  outline: none;
  border-radius: 2px; /* iOS */
  background-color: violet !important;
}

}
</style>
