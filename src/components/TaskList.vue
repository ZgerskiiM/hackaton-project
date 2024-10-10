<template>
    <v-card flat class="todo-list">
      <v-card-title><h2>To-do list</h2></v-card-title>
      <v-card-text>
        <div class="d-flex align-center">
          <v-date-picker
            v-model="selectedDate"
            class="mr-4 mt-0"
            hide-header
            max-height="500"
            bg-color="transparent"
          ></v-date-picker>
          <v-list class="flex-grow-1">
            <v-list-item v-for="(task, index) in tasksForSelectedDate" :key="index">
              <v-list-item-content>
                <v-list-item-title class="d-flex align-center">
                  <input
                    type="text"
                    v-model="task.text"
                    class="task-input"
                    @blur="updateTask(index, task)"
                    @keypress.enter="updateTask(index, task)"
                  />
                  <v-checkbox
                    v-model="task.completed"
                    class="custom-checkbox"
                  ></v-checkbox>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <input
              type="text"
              v-model="newTaskText"
              placeholder="Новая задача"
              class="task-input ml-2"
            />
            <v-btn @click="addTask" class="ml-2" color="primary" style="height: 100%;">+</v-btn>
          </v-list>
        </div>
      </v-card-text>
    </v-card>
  </template>

  <script setup>
  import { ref, computed } from 'vue';
  import { useTaskStore } from '/src/store/taskStore.js';

  // Используем стор задач
  const taskStore = useTaskStore();

  const selectedDate = ref(new Date().toISOString().split('T')[0]); // Текущая дата
  const newTaskText = ref('');

  // Получаем задачи для выбранной даты
  const tasksForSelectedDate = computed(() => {
    return taskStore.getTasksForDate(selectedDate.value);
  });

  // Добавление новой задачи
  function addTask() {
    if (newTaskText.value.trim() !== '') {
      taskStore.addTask(selectedDate.value, newTaskText.value);
      newTaskText.value = ''; // Очистить поле ввода после добавления
    }
  }

  // Обновление задачи
  function updateTask(index, task) {
    taskStore.updateTask(selectedDate.value, index, task);
  }
  </script>

<style scoped>
.todo-list {
  background-color: #d6edd9;
  height: 350px;
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

.v-list-item {
  background-color: #ffffff;
  margin-top: 10px;
  border-radius: 10px !important;
  padding: 7px;
}

.task-input {
  flex-grow: 1;
  margin-right: 10px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
}

.custom-checkbox {
  margin-left: 10px;
}

.ml-2 {
  margin-left: 10px;
}
</style>
