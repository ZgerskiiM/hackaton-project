// src/stores/taskStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref({});

  function addTask(dateKey, taskText) {
    if (!tasks.value[dateKey]) {
      tasks.value[dateKey] = [];
    }
    tasks.value[dateKey].push({ text: taskText, completed: false });
  }

  function getTasksForDate(dateKey) {
    return tasks.value[dateKey] || [];
  }

  function updateTask(dateKey, index, updatedTask) {
    if (tasks.value[dateKey]) {
      tasks.value[dateKey][index] = updatedTask;
    }
  }

  function removeTask(dateKey, index) {
    if (tasks.value[dateKey]) {
      tasks.value[dateKey].splice(index, 1);
    }
  }

  return {
    tasks,
    addTask,
    getTasksForDate,
    updateTask,
    removeTask,
  };
});
