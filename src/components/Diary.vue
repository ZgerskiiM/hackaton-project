<template>
    <Navigation />
    <h1>ДНЕВНИК</h1>
    <div class="content">
      <v-card id="card1">
        <v-card-title>Календарь</v-card-title>
        <v-date-picker
          v-model="date2"
          class="mr-4"
          hide-header
          max-height="300"
          bg-color="transparent"
          tile="0"
          width="450"

        ></v-date-picker>
      </v-card>

      <v-card id="card2">
        <v-card-title>Твое настроение</v-card-title>
        <v-card-subtitle>Данные были проанализированы за последние 30 дней</v-card-subtitle>
      </v-card>

      <v-card id="card3">
        <v-card-title>Напоминание</v-card-title>
        <v-card-subtitle>Сегодня день рождения у Дани!</v-card-subtitle>
      </v-card>

      <v-card id="card4">
        <div class="card-content">
          <v-card-title>Фокус дня</v-card-title>
          <v-card-subtitle>Сделать домашку</v-card-subtitle>
        </div>
        <v-btn>Начать</v-btn>
      </v-card>

      <v-card id="card5">
    <v-card-title>Планы на день</v-card-title>
    <v-card-subtitle>Инструкция к выполнению</v-card-subtitle>
    <div class="task-container">
        <v-list class="flex-grow-1">
    <v-list-item
        v-for="(task, index) in getTasksForCurrentDate()"
        :key="index"
        class="task-item" <!-- Добавьте этот класс -->
    >
        <v-list-item-content>
            <v-list-item-title class="d-flex align-center">
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
        <!-- Кнопка для добавления пустой задачи -->
        <v-btn @click="addTask" class="ml-2 add-task-button" color="primary">+</v-btn>
    </div>
</v-card>
    </div>
  </template>

  <script setup>
  import Navigation from './Navigation.vue';
  import { ref, watch } from 'vue';

  // Переменная для хранения выбранной даты
  const date2 = ref(new Date()); // инициализация переменной date2

  // Переменная для хранения задач
  const tasks = ref({});

  // Инициализация задач для текущей даты
  function initializeTasks() {
    const dateKey = date2.value.toISOString().split('T')[0]; // Формат YYYY-MM-DD
    if (!tasks.value[dateKey]) {
      tasks.value[dateKey] = []; // Создаем пустой массив задач для этой даты
    }
  }

  // Вызываем инициализацию задач при загрузке компонента
  initializeTasks();

  // Метод добавления пустой задачи
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
  </script>

<style scoped>

h1 {
    margin-left: 150px;
    margin-top: 50px;
}

.content {
    margin-left: 100px;
    display: flex; /* Используем flexbox для выстраивания карточек в строку */
    flex-direction: row; /* Указываем направление: строка */
    justify-content: space-around; /* Распределяем карточки по доступному пространству */
    flex-wrap: wrap; /* Позволяет карточкам переноситься на новую строку при нехватке места */
}

#card1, #card2, #card3 {
    background-color: #e2e5e9;
    border-radius: 25px;
    width: 500px; /* Ширина каждой карточки */
    height: 350px; /* Высота карточек */
    margin-top: 50px; /* Отступ сверху */
    display: flex;
    flex-direction: column; /* Указываем направление содержимого карточки */
    padding-left: 20px;
}

#card1 {
    align-items: center;

}

#card4 {
    margin-right: 50px;
    margin-left: 50px;
    margin-top: 50px;
    width: 100%;
    height: 150px; /* Высота карточки */
    border-radius: 20px;
    background-color: #DDEEFE;
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Выровнять элементы по левому краю */
    justify-content: space-around;
    padding-left: 20px; /* Установите отступ слева на 20px для выравнивания */
}

#card5 {
    width: 100%;
    height: 200px; /* Высота карточек */
    margin-right: 50px;
    margin-left: 50px;
    margin-top: 20px;
    border-radius: 20px;
    border: 2px solid #007BFF; /* Добавьте обводку */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Добавьте тень, если нужно */
    display: flex;
    flex-direction: column; /* Убедитесь, что содержимое располагается вертикально */
}

.task-container {
    display: flex;
    flex-direction: column; /* Убедитесь, что содержимое располагается вертикально */
    flex-grow: 1; /* Позволяет контейнеру занимать доступное пространство */
    overflow-y: auto; /* Включаем прокрутку по вертикали */
    max-height: 100px; /* Максимальная высота для прокрутки */
}

.task-item {
    border: 1px solid #007BFF; /* Цвет обводки */
    border-radius: 5px; /* Скругление углов */
    margin-bottom: 8px; /* Отступ между задачами */
    padding: 10px; /* Отступ внутри задачи */
}
</style>
