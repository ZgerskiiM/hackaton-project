<script setup>
import Navigation from './Navigation.vue';
import { ref } from 'vue';

const date2 = ref(new Date()); // Инициализация переменной date2
</script>

<template>
    <Navigation />
    <h1>ДНЕВНИК</h1>
    <div class="content">
        <v-card id="card1">
            <h2>Календарь</h2>
            <v-date-picker
                v-model="date2"
                class="mr-4"
                hide-header
                max-height="300"
                bg-color="transparent"
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
            <v-card-title>Фокус дня</v-card-title>
            <v-card-subtitle>Сделать домашку</v-card-subtitle>
            <v-btn>Начать</v-btn>
        </v-card>
        <v-card id="card5">
            <v-card-title>Планы на день</v-card-title>
            <v-card-subtitle>Инструкция к выполнению</v-card-subtitle>
        </v-card>
    </div>
</template>

<style scoped>

h1 {
    margin-left: 150px;
    margin-top: 50px;
}

.content {
    margin-left: 150px;
    display: flex; /* Используем flexbox для выстраивания карточек в строку */
    flex-direction: row; /* Указываем направление: строка */
    justify-content: space-between; /* Распределяем карточки по доступному пространству */
    flex-wrap: wrap; /* Позволяет карточкам переноситься на новую строку при нехватке места */
}

#card1, #card2, #card3 {
    background-color: #e2e5e9;
    border-radius: 25px;
    width: 600px; /* Ширина каждой карточки */
    margin-top: 50px; /* Отступ сверху */
    display: flex;
    justify-content: center; /* Выравниваем содержимое карточек по центру */
    height: 350px; /* Высота карточек */
    flex-direction: column; /* Указываем направление содержимого карточки */
}

#card4 {
    margin-right:50px;
    margin-top:50px;
    width: 100%;
    height: 200px; /* Высота карточек */
    border-radius: 20px;
}

#card5 {
    width: 100%;
    height: 400px; /* Высота карточек */
    margin-right:50px;
    margin-top:50px;
    border-radius: 20px;
}

</style>
