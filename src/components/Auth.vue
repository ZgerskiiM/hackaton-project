<template>
    <div class="app-container">
      <!-- Навигация -->
      <Navigation />

      <!-- Основной контент -->
      <div class="content">
        <div class="user-form">
          <div v-if="!isNameEntered">
            <label for="name">Введите ваше имя:</label>
            <input id="name" v-model="name" @keyup.enter="submitName" />
            <button @click="submitName">Далее</button>
          </div>

          <div v-else-if="!isAgeEntered">
            <label>Выберите ваш возраст:</label>
            <div class="age-buttons">
              <button v-for="(range, index) in ageRanges" :key="index" @click="selectAgeRange(range)">
                {{ range }}
              </button>
            </div>
          </div>

          <div v-else>
            <p>Привет, {{ name }}!</p>
            <p>Ваш возраст: {{ selectedAgeRange }}.</p>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import Navigation from './Navigation.vue';  // Подключаем компонент навигации

  const name = ref('');
  const isNameEntered = ref(false);
  const isAgeEntered = ref(false);
  const selectedAgeRange = ref('');
  const ageRanges = ['0-18 лет', '19-30 лет', '31-45 лет', '46-60 лет', '61+ лет'];

  const submitName = () => {
    if (name.value.trim()) {
      isNameEntered.value = true;
    }
  };

  const selectAgeRange = (range) => {
    selectedAgeRange.value = range;
    isAgeEntered.value = true;
  };
  </script>

  <style scoped>
  .app-container {
    display: flex;
    height: 100vh; /* Высота на весь экран */

  }

  .content {
    flex: 1; /* Контент занимает все оставшееся пространство */
    padding: 20px;

  }

  .user-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #000;
    border-radius: 8px;
    text-align: center;
  }

  label {
    display: block;
    margin-bottom: 8px;
  }

  input {
    margin-bottom: 16px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    margin: 5px;
    padding: 8px 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #38a773;
  }

  .age-buttons {
    display: flex;
    flex-direction: column;
  }

  .age-buttons button {
    margin: 8px 0;
  }
  </style>
