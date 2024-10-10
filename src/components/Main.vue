<template>
  <div class="app-container">
    <Navigation />
    <div class="main-content">
      <div class="header">
  <div class="header-left">
    <h1 class="page-title">ОБЗОР</h1>
  </div>
  <div class="header-right">
      <v-icon size="36" class="icon-centered">mdi-magnify</v-icon>
    <v-card class="header-card user-name elevation=0">
      <v-card-title id="first-title">
        <div class="header-element"></div>
        Марк
      </v-card-title>
    </v-card>
    <v-card class="header-card user-points">
      <div class="header-element">
        <v-icon size="36" class="icon-centered">mdi-gold</v-icon>
      </div>
      <v-card-title>30б</v-card-title>
    </v-card>
  </div>
</div>
      <div class="content">
        <v-card flat class="audio-player">
          <v-card-text>
            <img src="D:\image256.png"></img>
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
  <v-card-text>
    <div class="d-flex align-center">
      <v-date-picker
        v-model="date2"
        class="mr-4 mt-0"
        hide-header
        max-height="500"
        bg-color="transparent"
      ></v-date-picker>
      <v-list class="flex-grow-1">
        <v-list-item v-for="(task, index) in getTasksForCurrentDate()" :key="index">
          <v-list-item-content>
            <v-list-item-title class="d-flex align-center">
              <div class="task-input-container"> <!-- Добавим контейнер для выравнивания -->
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
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- Кнопка для добавления пустой задачи -->
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
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn @click="startConcentration" color="success">Начать</v-btn>
            <v-btn @click="stopConcentration" color="error">Стоп</v-btn>
            <v-btn @click="editTime" color="primary">Изменить</v-btn>
          </v-card-actions>
        </v-card>

        <v-card flat class="shorts">
          <v-card-title><h2>Буксы</h2></v-card-title>
          <v-card-subtitle>Почитай любимое или узнай новое</v-card-subtitle>
        </v-card>

        <v-card flat class="achievement">
          <v-card-title><h2>Лучший читатель</h2></v-card-title>
          <v-card-subtitle>Посмотри как менялось твое настроение за последние 30 дней</v-card-subtitle>
          <v-card-actions>
            <v-btn id="achiv-btn">Посмотреть</v-btn> <!-- Добавленная кнопка -->
          </v-card-actions>
        </v-card>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import Navigation from './Navigation.vue';
import TaskList from '/src/components/TaskList.vue'; // Импортируем компонент задач


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
// Метод добавления пустой задачи
function addTask() {
  const dateKey = date2.value.toISOString().split('T')[0]; // Формат YYYY-MM-DD
  if (!tasks.value[dateKey]) {
    tasks.value[dateKey] = [];
  }
  // Добавляем новую задачу с пустым текстом
  tasks.value[dateKey].push({ text: '', completed: false });
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
/* General styles */
.app-container {
  display: flex;
  height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 50px;
  padding-top:10px;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* Header styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 0;
  margin: 0 0 0 20px;

}

.header-left { margin-left: 70px; }
.header-right {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-right: 18px;


}

.header-icon { font-size: 20px; }
.header-card {
  padding: 3px 7px;
  border-radius: 10px;
  background-color: #f0f0f0;
}

.user-name { font-weight: bold; }
.user-points {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Content styles */
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 15px;
  padding: 15px;
  width: 100%;
  max-width: 950px;
  margin: 0 0 0 85px;
}

.page-title {
  padding: 0;
  margin: 0;
}

v-card {
  box-sizing: border-box;
  padding: 15px;
  background-color: #d8dadc;
}

.todo-list, .articles, .achievement {
  flex: 0 0 100%;
  border-radius: 20px;
}

.articles, .achievement {
  height: 140px;
}

.statistics, .shorts {
  flex: 0 0 48%;
  border-radius: 20px;
  height: 140px;
  background-color: #d5dae1;
}

.v-card-title {
  font-size: 14px;
  font-weight: 400;
}

.v-card-subtitle { font-size: 12px; }

/* Todo list styles */
.todo-list {
  height: 350px;
  background-color: #d6edd9;
}

.todo-list .v-card-text {
  display: flex;
  flex-direction: column;
}

.todo-list .d-flex {
  display: flex;
  flex-direction: row;
}

.todo-list .v-date-picker { flex-shrink: 0; }

.todo-list .v-list {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.task-input-container {
  display: flex; /* Используем flexbox для выравнивания */
  align-items: center; /* Центрируем элементы по вертикали */
  width: 100%; /* Занимаем всю ширину */
}

.task-input {
  flex-grow: 1; /* Позволяет инпуту занимать оставшееся пространство */
  height: 50px; /* Установите высоту инпута */
  border: 1px solid #ccc; /* Обводка инпута */
  border-radius: 10px; /* Скругление углов инпута */
  margin-right: 10px; /* Отступ между инпутом и чекбоксом */
}

.custom-checkbox {
  height: 50px; /* Установите высоту чекбокса */
  display: flex; /* Чтобы чекбокс выравнивался по центру */
  align-items: center; /* Центрируем чекбокс по вертикали */
}

.v-list-item {
  background-color: #ffffff;
  margin-top: 10px;
  border-radius: 10px !important;
  padding: 7px;
  width: 80%;
  height: 50px;
}

.shorts { margin-left: 18px; background-color: #DCD0EF; }
.v-list { background-color: transparent; }

/* Audio player styles */
.audio-player {
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 850px;
  border-radius: 20px;
  padding: 15px;
  background-color: transparent;
}

.audio-player .v-card-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.audio-player .text-h6 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 7px;
}
.audio-player .v-slider {
  width: 100%;
  margin: 0 15px;
}

.audio-player .v-card-actions {
  display: flex;
  justify-content: center;
  gap: 7px;
}

/* Image styles */
img {
  width: 650px;
  height: 650px;
  padding-bottom: 40px;
}

.statistics {
  background-color: #DDEEFE;
}

/* Specific component styles */
.articles { background-color: #DCD0EF; }
.achievement { background-color: #F6F0D8; }

h1 {
  font-size: 32px;
  font-weight: 800;
}

#achiv-btn {
  background-color: #E9D16A;
  color: white;
  border-radius: 10px;
}

.header-card {
  padding: 10px; /* Отступ внутри карточки */
  height: 60px; /* Задайте одинаковую высоту для всех карточек */
  width: 7vw;
  display: flex; /* Используем flexbox */
  justify-content: center; /* Центрируем содержимое по горизонтали */
  align-items: center; /* Центрируем содержимое по вертикали */
  border-radius: 10px; /* Скругление углов карточки */
  background-color: #f0f0f0; /* Цвет фона карточки */
}

.icon-centered {
  display: flex; /* Включаем flexbox для иконки */
  justify-content: center; /* Центрируем иконку */
  align-items: center; /* Центрируем иконку по вертикали */
}

#first-title {
  width: 160px;
  display: flex;
  justify-content: space-around;
  align-items:center;
}

.header-element {
  height: 40px;
  width: 40px;
  background-color: #ffffff;
  border-radius: 7px;
}

/* Scrollbar styles */
::-webkit-scrollbar {
  margin-left: 15px;
  width: 3px;
}

::-webkit-scrollbar-thumb { background-color: rgb(0, 0, 0); }
::-webkit-scrollbar-track { background-color: rgb(255, 255, 255); }

/* Utility classes */
.line-through { text-decoration: line-through; }

/* Checkbox styles */
.custom-checkbox {
  margin-right: 7px;
}

.custom-checkbox input[type="checkbox"]:checked + .v-input--selection-controls__input,
.custom-checkbox .v-input--selection-controls__input,
.custom-checkbox .v-input--selection-controls__input:checked {
  background-color: transparent;
}

.custom-checkbox input[type="checkbox"]:checked + .v-input--selection-controls__input {
  border: 2px solid #2196F3;
}

.custom-checkbox .v-input--selection-controls__input {
  border: 2px solid #ccc;
}

/* Task input styles */
.task-input {
  flex-grow: 1;
  margin-right: 7px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 4px;
  height: 34px;
}

* {
}
</style>
