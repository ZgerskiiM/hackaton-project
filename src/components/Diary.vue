<template>
  <Navigation />
  <h1>ДНЕВНИК</h1>
  <div class="content">
    <v-card id="card1">
      <v-card-title>Календарь</v-card-title>
      <v-date-picker v-model="date2" class="mr-4" hide-header max-height="300" bg-color="transparent" tile="0"
        width="450"></v-date-picker>
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
      <div class="d-flex align-center">
        <v-list class="flex-grow-1">
          <v-list-item v-for="(task, index) in getTasksForCurrentDate()" :key="index">
            <v-list-item-content>
              <v-list-item-title class="d-flex align-center">
                <div class="task-input-container">
                  <input type="text" v-model="task.text" class="task-input" @blur="stopEditing(task)"
                    @keypress.enter="stopEditing(task)" />
                  <v-checkbox v-model="task.completed" class="custom-checkbox"></v-checkbox>
                </div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-btn @click="addTask" class="ml-2" color="primary" style="height: 100%">+</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import Navigation from "./Navigation.vue";
import { ref, watch } from "vue";

const date = ref(new Date(new Date().setHours(0, 0, 0, 0)));
const tasks = ref({});

function initializeTasks() {
  const dateKey = date.value.toISOString().split("T")[0];
  if (!tasks.value[dateKey]) {
    tasks.value[dateKey] = [];
  }
}

initializeTasks();

function addTask() {
  const dateKey = date.value.toISOString().split("T")[0];
  if (!tasks.value[dateKey]) {
    tasks.value[dateKey] = [];
  }

  tasks.value[dateKey].push({ text: "", completed: false });
}


watch(date, (newDate) => {
  const dateKey = newDate.toISOString().split("T")[0];
  if (!tasks.value[dateKey]) {
    tasks.value[dateKey] = [];
  }
});


function getTasksForCurrentDate() {
  const dateKey = date.value.toISOString().split("T")[0];
  return tasks.value[dateKey] || [];
}

function stopEditing(task) {

}
</script>

<style scoped>
h1 {
  margin-left: 150px;
  margin-top: 50px;
}

.content {
  margin-left: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

.todo-list {
  width: 50vw;
  height: 37vh;
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

.todo-list .v-date-picker {
  flex-shrink: 0;
}

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
  display: flex;
  align-items: center;
  width: 100%;
}

.task-input {
  flex-grow: 1;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 10px;
}

.custom-checkbox {
  height: 50px;
  display: flex;
  align-items: center;
}

.v-list-item {
  background-color: #ffffff;
  margin-top: 10px;
  border-radius: 10px !important;
  padding: 7px;
  width: 80%;
  height: 50px;
}

.v-list {
  background-color: transparent;
}

#card1,
#card2,
#card3 {
  background-color: #e2e5e9;
  border-radius: 25px;
  width: 27vw;
  height: 350px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
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
  height: 150px;
  border-radius: 20px;
  background-color: #ddeefe;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding-left: 20px;
}

#card5 {
  width: 100%;
  height: 40vh;
  margin-right: 50px;
  margin-left: 50px;
  margin-top: 50px;
  border-radius: 20px;
  border: 2px solid #007bff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.task-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  max-height: 100px;
}

.task-item {
  border: 1px solid #007bff;
  border-radius: 5px;
  margin-bottom: 8px;
  padding: 10px;
}

.task-input {
  flex-grow: 1;
  margin-right: 7px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 4px;
  height: 34px;
}
</style>
