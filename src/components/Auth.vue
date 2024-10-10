<template>
  <v-app>
    <div class="auth-container">
      <v-card flat v-if="!started" class="auth-card" max-width="900">
        <div class="text-center">
          <h1>Добро пожаловать в GEN!</h1>
          <h2>Gen - это приложение поколения Z, где вы найдете всё, что нужно для полноценного развития и успеха в жизни
          </h2>
          <v-btn outlined color="green" @click="start" class="start-btn">
            Начать
          </v-btn>
        </div>
      </v-card>
      <v-card v-else class="form-card" max-width="600">
        <v-card-title class="headline">
          Заполни анкету, чтобы мы лучше узнали друг друга
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Твои имя и фамилия" v-model="form.name" outlined required></v-text-field>

            <v-text-field label="Дата рождения" v-model="form.birthdate" outlined required></v-text-field>

            <div class="interests-container">
              <p>Интересы:</p>
              <div class="checkbox-group">
                <v-checkbox v-for="(interest, index) in interests" :key="index" v-model="form.selectedInterests"
                  :label="interest.label" :value="interest.value" class="interest-checkbox"></v-checkbox>
              </div>
            </div>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="green" @click="goToMain">
            Перейти к главной
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const started = ref(false);
const form = ref({
  name: '',
  birthdate: '',
  selectedInterests: []
});
const interests = ref([
  { label: 'Музыка', value: 'music' },
  { label: 'Спорт', value: 'sports' },
  { label: 'Программирование', value: 'programming' },
  { label: 'Путешествия', value: 'travel' },
  { label: 'Мода', value: 'fashion' }
]);


function start() {
  started.value = true;
}


function goToMain() {
  router.push({ name: 'Main' });
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.v-card {
  background-color: rgb(255, 255, 255);
}

.auth-card,
.form-card {
  padding: 20px;
  width: 100%;
  max-width: 900px;
}

h1 {
  font-size: 64px;
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;
}

h2 {
  margin-top: 5vh;
  font-size: 24px;
}

.text-center {
  text-align: center;
}

.start-btn {
  margin-top: 10vh;
  border-radius: 10px;
  color: white;
  background-color: rgb(86, 211, 86);
}

.interests-container {
  margin-top: 20px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.interest-checkbox {
  margin: 0;
  flex: 1 0 30%;
  display: flex;
  align-items: center;
}

.interest-checkbox .v-input {
  margin: 0;
}
</style>
