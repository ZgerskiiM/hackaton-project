<script setup>
import Navigation from './Navigation.vue';

</script>

<template>
<Navigation/>
<div class="card">

<img>

<v-card id="card1">
    <v-card-title>Мы всегда рады обратной связи, пишите нам и мы ответим как можно быстрее!</v-card-title>
    <v-input></v-input>
    <v-input></v-input>
</v-card>
</div>

</template>

<style scoped>

#card1 {
    background-color: black;
    flex: 0 0 48%;
    border-radius: 30px;
    height: 200px;
    color: white;
    margin-top: 50px;
    width: 40vw;
    

}

.card {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-content: left;
    justify-content:flex-end;
}

</style>
