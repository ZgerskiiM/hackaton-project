<template>
  <div class="app-container">
    <Navigation />
    <div class="content">
      <v-card class="feedback-card">
        <v-card-title>
          Мы всегда будем рады обратной связи, <br>пишите нам и мы ответим<br>как можно скорее!
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="email" label="Ваша почта" placeholder="пример@gmail.com" type="email" required
            class="input-field"></v-text-field>
          <v-textarea v-model="question" label="Что хотите узнать у нас?" placeholder="Введите ваш вопрос..." required
            class="input-field" rows="1"></v-textarea>
        </v-card-text>
        <v-card-actions>
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
import Navigation from './Navigation.vue';


const email = ref('');
const question = ref('');


const submitFeedback = () => {
  if (email.value && question.value) {

    console.log(`Обратная связь отправлена на: ${email.value}`);
    console.log(`Вопрос: ${question.value}`);
    email.value = '';
    question.value = '';
  } else {
    alert('Пожалуйста, заполните все поля.');
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2vh;
}

.content {
  display: flex;
  justify-content: center;
  width: 40%;
}

.feedback-card {
  max-width: 90vw;
  width: 100%;
  height: auto;
  border-radius: 2vh;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 2vh;
}

.input-field {
  margin-bottom: 2vh;
  width: 100%;
  height: 5vh;
  border-radius: 10px;
}

.submit-btn {
  width: 100%;
  height: 5vh;
  border-radius: 10px;
  background-color: green;
  color: white;
  font-size: 2vh;
}
</style>
