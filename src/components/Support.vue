<template>
    <div class="app-container">
      <Navigation />

      <div class="content">
        <v-card class="feedback-card">
          <v-card-title>
            Мы всегда будем рады обратной связи, <br>пишите нам и мы ответим<br>как можно скорее!
          </v-card-title>
          <v-card-text>
            <!-- Поле ввода электронной почты -->
            <v-text-field
              v-model="email"
              label="Ваша почта"
              placeholder="пример@gmail.com"
              type="email"
              required
              class="input-field"
            ></v-text-field>

            <!-- Поле для ввода вопроса -->
            <v-textarea
              v-model="question"
              label="Что хотите узнать у нас?"
              placeholder="Введите ваш вопрос..."
              required
              class="input-field"
              rows="1"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <!-- Кнопка отправки -->
            <v-btn @click="submitFeedback" class="submit-btn">
              Отправить
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import Navigation from './Navigation.vue'; // Импортируем компонент навигации

  // Переменные для хранения введенной электронной почты и вопроса
  const email = ref('');
  const question = ref('');

  // Метод для обработки отправки обратной связи
  const submitFeedback = () => {
    if (email.value && question.value) {
      // Здесь вы можете добавить логику для обработки обратной связи
      console.log(`Обратная связь отправлена на: ${email.value}`);
      console.log(`Вопрос: ${question.value}`);
      email.value = ''; // Очистить поле после отправки
      question.value = ''; // Очистить поле после отправки
    } else {
      alert('Пожалуйста, заполните все поля.');
    }
  };
  </script>

  <style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Центрируем содержимое по горизонтали */
  justify-content: center; /* Центрируем содержимое по вертикали */
  height: 100vh; /* Высота экрана */
  padding: 2vh; /* Отступ адаптирован под высоту экрана */
}

.content {
  display: flex;
  justify-content: center; /* Центрируем карточку по горизонтали */
  width: 40%; /* Полная ширина контейнера */
}

.feedback-card {
  max-width: 90vw; /* Увеличиваем максимальную ширину карточки для адаптивности */
  width: 100%; /* Полная ширина карточки */
  height: auto; /* Автоматическая высота для уменьшения */
  border-radius: 2vh; /* Скругление углов карточки */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Тень для карточки */
  padding: 2vh; /* Отступ внутри карточки адаптирован под высоту экрана */
}

.input-field {
  margin-bottom: 2vh; /* Отступ между инпутами адаптирован под высоту экрана */
  width: 100%; /* Ширина инпутов 100% */
  height: 5vh; /* Высота инпутов адаптирована под высоту экрана */
  border-radius: 10px; /* Скругление углов инпутов */
}

.submit-btn {
  width: 100%; /* Кнопка занимает 100% ширины карточки */
  height: 5vh; /* Высота кнопки адаптирована под высоту экрана */
  border-radius: 10px; /* Скругление углов кнопки */
  background-color: green; /* Цвет кнопки */
  color: white; /* Цвет текста кнопки */
  font-size: 2vh; /* Размер шрифта кнопки адаптирован под высоту экрана */
}
  </style>
