<template>
  <div class="app-container">
    <Navigation />
    <div class="main-content">
      <div class="header">
        <div class="header-left">
          <h1 class="page-title">ОБЗОР</h1>
        </div>
        <div class="header-right">
          <v-icon
          size="50">mdi-magnify</v-icon>
          <v-card  class="header-card user-name elevation=0">
            <v-card-title id="first-title">
              <div class="header-element"></div>
              Марк</v-card-title>
          </v-card>
          <v-card class="header-card user-points">
            <div class="header-element">
              <v-icon>
                mdi-gold
              </v-icon>
            </div>
            <v-card-title>30б</v-card-title>
          </v-card>
        </div>
      </div>
      <div class="content">
        <v-card flat class="audio-player">
          <v-card-text>
            <img href="C:\Users\User\Downloads\Telegram Desktop\image255.svg"></img>
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
          <v-card-actions class="justify-center">
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

        <v-card flat class="todo-list">
  <v-card-title><h2>To-do list</h2></v-card-title>
  <v-card-subtitle>Ваши планы на день</v-card-subtitle>
  <v-card-text>
    <div class="d-flex align-center">
      <v-date-picker
        v-model="date2"
        class="mr-4"
        hide-header
        max-height="300"
        bg-color="transparent"
      ></v-date-picker>
      <v-list class="flex-grow-1">
        <v-list-item v-for="(task, index) in getTasksForCurrentDate()" :key="index">
          <v-list-item-content>
            <v-list-item-title class="d-flex justify-between align-center">
              <input
                type="text"
                v-model="task.text"
                class="task-input"
                @blur="stopEditing(task)"
                @keypress.enter="stopEditing(task)"
              />
              <v-checkbox
                v-model="task.completed"
                class="custom-checkbox"
              ></v-checkbox>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- Поле для ввода новой задачи -->
      <input
        type="text"
        v-model="newTaskText"
        placeholder="Новая задача"
        class="task-input ml-2"
      />
      <v-btn @click="addTask" class="ml-2" color="primary" style="height: 100%;">+</v-btn>
    </div>
  </v-card-text>
</v-card>

        <v-card flat class="articles">
          <v-card-title><h2>Прочитайте 80 статей</h2></v-card-title>
          <v-card-subtitle>Посмотри как менялось твое настроение за последние 30 дней</v-card-subtitle>
          <v-card-item>
            <v-progress-linear
              buffer-value="55"
              height="12"
              max="80"
              min="0"
              rounded="xm"
            ></v-progress-linear>
          </v-card-item>
        </v-card>

        <v-card flat class="statistics">
          <v-card-title>
            <h2>Концентрация</h2>
          </v-card-title>
          <v-card-subtitle>
            <v-row align="center">
              <v-col>
                <span>{{ formattedTime }}</span>
              </v-col>
              <v-col>
                <v-btn @click="editTime" color="primary">Изменить</v-btn>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn @click="startConcentration" color="success">Начать</v-btn>
            <v-btn @click="stopConcentration" color="error">Стоп</v-btn>
          </v-card-actions>
        </v-card>

        <v-card flat class="shorts">
          <v-card-title><h2>Буксы</h2></v-card-title>
          <v-card-subtitle>Почитай любимое или узнай новое</v-card-subtitle>
        </v-card>

        <v-card flat class="achievement">
          <v-card-title><h2>Лучший читатель</h2></v-card-title>
          <v-card-subtitle>Посмотри как менялось твое настроение за последние 30 дней</v-card-subtitle>
        </v-card>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import Navigation from './Navigation.vue';

// Инициализация переменных
const date2 = ref(new Date(new Date().setHours(0, 0, 0, 0)));
const tasks = ref({}); // Объект для хранения задач по датам

// Инициализация задач для текущей даты
function initializeTasks() {
  const dateKey = date2.value.toISOString().split('T')[0]; // Формат YYYY-MM-DD
  if (!tasks.value[dateKey]) {
    tasks.value[dateKey] = []; // Создаем пустой массив задач для этой даты
  }
}

// Вызываем инициализацию задач при загрузке компонента
initializeTasks();

// Переменная для хранения текста новой задачи
const newTaskText = ref('');

// Метод добавления задачи
function addTask() {
  const dateKey = date2.value.toISOString().split('T')[0]; // Формат YYYY-MM-DD
  if (newTaskText.value.trim() !== '') {
    tasks.value[dateKey].push({ text: newTaskText.value, completed: false });
    newTaskText.value = ''; // Очистить поле ввода после добавления
  }
}

// Метод для обновления задач при изменении даты
watch(date2, (newDate) => {
  const dateKey = newDate.toISOString().split('T')[0];
  if (!tasks.value[dateKey]) {
    tasks.value[dateKey] = []; // Создать пустой массив, если задачи для данной даты отсутствуют
  }
});

// Получение задач для текущей даты
function getTasksForCurrentDate() {
  const dateKey = date2.value.toISOString().split('T')[0];
  return tasks.value[dateKey] || []; // Возвращаем задачи для текущей даты или пустой массив
}

// Audio player setup
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

const totalMinutes = ref(115); // Общее начальное время в минутах
const isRunning = ref(false); // Флаг для отслеживания состояния таймера
const elapsedTime = ref(0); // Время, прошедшее с начала (в секундах)

// Форматирование времени для отображения
const formattedTime = computed(() => {
  const totalSeconds = totalMinutes.value * 60 - elapsedTime.value; // Общее время в секундах
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours} час ${minutes} минут ${seconds} секунд`;
});

// Метод для изменения времени
function editTime() {
  const newTime = prompt("Введите новое время в минутах:", totalMinutes.value);
  if (newTime !== null && !isNaN(newTime)) {
    totalMinutes.value = parseInt(newTime);
    elapsedTime.value = 0; // Сброс времени при изменении
  }
}

// Метод для начала концентрации
function startConcentration() {
  if (!isRunning.value) {
    isRunning.value = true;
    elapsedTime.value = 0; // Сброс времени перед началом
    const interval = setInterval(() => {
      if (isRunning.value) {
        elapsedTime.value++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }
}

// Остановка таймера (если нужно)
function stopConcentration() {
  isRunning.value = false;
}

</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  border: 30px solid black;
  position: relative;
  border-radius: 30px; /* Inner border radius */
  overflow: hidden; /* Ensures the content respects the border radius */
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  margin-top: 50px;
}

.header-left {
  margin-left: 100px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 25px;
}

.header-icon {
  font-size: 24px;
}

.header-card {
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #f0f0f0;
}

.user-name {
  font-weight: bold;
}

.user-points {
  display: flex;
  align-items: center;
  gap: 5px;
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0;
  margin-left: 100px;
}

.page-title {
  padding: 0;
  margin: 0;
}

v-card {
  box-sizing: border-box;
  padding: 20px;
  background-color: #d8dadc;
}

.todo-list,
.articles,
.achievement {
  flex: 0 0 100%;
  border-radius: 30px;
}

.achievement {
  background-color: #d5dae1

}

.articles,
.achievement {
  height: 200px;
}

.statistics,
.shorts {
  flex: 0 0 48%;
  border-radius: 30px;
  flex-shrink: 0;
  height: 200px;
  background-color: #d5dae1
}

.v-card-title {
  font-size: 24px;
  font-weight: 400;
}

.v-card-subtitle {
  font-size: 16px;
}

.todo-list {
  height: 430px;
  background-color: #d6edd9
}

.todo-list .v-card-text {
  display: flex;
  flex-direction: column;
}

.todo-list .d-flex {
  display: flex;
  flex-direction: row;
}

.todo-list .v-date-picker {
  flex-shrink: 0;
}

.todo-list .v-list {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 300px;
}

.v-list-item {
  background-color: #ffffff;
  margin-top: 10px;
  border-radius: 15px !important ;/* Добавляем скругление */
  padding: 10px; /* Опционально: добавляем отступы */
}

.shorts {
  margin-left:25px;
}

.v-list {
  background-color: transparent;
}

/* Styles for the audio player */
.audio-player {
  position: absolute; /* Make the player position absolute */
  bottom: 20px; /* Adjust this value to match the vertical position of the v-card */
  right: 20px; /* Adjust this value to match the horizontal position of the v-card */
  width: 1150px; /* Set a fixed width */
  border-radius: 30px;
  padding: 20px;
  background-color: transparent;
}

.audio-player .v-card-text {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  justify-content: center;
  gap: 10px;
}

img {
  width: 1150px;
  height:850px;
  padding-bottom: 50px;
}

.articles {
  background-color: #e5def0;
}

h1 {
  font-size: 42px;
  font-weight: 800;
}

#first-title {
  width: 200px;
  display: flex;
  justify-content: space-between;
}

.header-element {
  height: 50px;
  width: 50px;
  background-color: #ffffff;
  border-radius: 10px;
}

::-webkit-scrollbar {
    margin-left: 20px;
    width: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0);
}

::-webkit-scrollbar-track {
    background-color: rgb(255, 255, 255);
}

.line-through {
  text-decoration: line-through;
}

.custom-checkbox {
  margin-right: 10px; /* Отступ между чекбоксом и текстом */
}

/* Стили для чекбокса, чтобы он не закрашивался */
.custom-checkbox input[type="checkbox"]:checked + .v-input--selection-controls__input {
  background-color: transparent; /* Убираем закрашивание */
  border: 2px solid #2196F3; /* Цвет рамки при выборе */
}

.custom-checkbox .v-input--selection-controls__input {
  background-color: transparent; /* Убираем закрашивание при невыборе */
  border: 2px solid #ccc; /* Цвет рамки при невыборе */
}

.custom-checkbox .v-input--selection-controls__input:checked {
  background-color: transparent; /* Убираем закрашивание при выборе */
}

.task-input {
  flex-grow: 1; /* Позволяет полю ввода занимать все доступное пространство */
  margin-right: 10px; /* Отступ между текстом и чекбоксом */
  border: 1px solid #ccc; /* Граница поля ввода */
  border-radius: 4px; /* Скругление углов */
  padding: 5px; /* Отступ внутри поля */
  height: 40px; /* Высота поля ввода */
}

</style>
