<script setup>
import { ref } from 'vue';
import Navigation from './Navigation.vue';

const trackName = ref('Название трека');
const currentTime = ref(94); // 1:34 in seconds
const duration = ref(226); // 3:46 in seconds
const isPlaying = ref(false);

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function onSliderChange(value) {
  console.log('Slider changed:', value);
}

function onShuffle() {
  console.log('Shuffle clicked');
}

function onPrevious() {
  console.log('Previous clicked');
}

function onPlayPause() {
  isPlaying.value = !isPlaying.value;
  console.log('Play/Pause clicked');
}

function onNext() {
  console.log('Next clicked');
}

function onRepeat() {
  console.log('Repeat clicked');
}
</script>

<template>
    <Navigation />

    <v-card flat class="audio-player">
        <v-card-text>
            <div class="text-h6 mb-2">{{ trackName }}</div>
            <v-slider
                v-model="currentTime"
                :max="duration"
                hide-details
                @change="onSliderChange"
            >
                <template v-slot:prepend>
                    {{ formatTime(currentTime) }}
                </template>
                <template v-slot:append>
                    {{ formatTime(duration) }}
                </template>
            </v-slider>
        </v-card-text>
        <v-card-actions class="justify-start"> <!-- Изменено с justify-center на justify-start -->
            <v-btn icon @click="onShuffle">
                <v-icon>mdi-shuffle-variant</v-icon>
            </v-btn>
            <v-btn icon @click="onPrevious">
                <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
            <v-btn icon large @click="onPlayPause">
                <v-icon>{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
            </v-btn>
            <v-btn icon @click="onNext">
                <v-icon>mdi-skip-next</v-icon>
            </v-btn>
            <v-btn icon @click="onRepeat">
                <v-icon>mdi-repeat</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped>
.audio-player {
    position: absolute; /* Позиционирование */
    bottom: 20px; /* Вертикальное положение */
    left: 100px; /* Изменено с right на left, чтобы переместить влево */
    width: 1150px; /* Фиксированная ширина */
    border-radius: 30px;
    padding: 20px;
    background-color: transparent;
}

.audio-player .v-card-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Изменено для выравнивания элементов слева */
}

.audio-player .text-h6 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.audio-player .v-slider {
    width: 100%;
    margin: 0 20px;
}

.audio-player .v-card-actions {
    display: flex;
    justify-content: flex-start; /* Изменено для выравнивания кнопок слева */
    gap: 10px;
}
</style>
