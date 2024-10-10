<script setup>
import { ref, onMounted } from "vue";
import Navigation from "./Navigation.vue";

const quotes = [
    {
        author: "Фёдор Достоевский",
        text: "Неправда, что жизнь стоит того, чтобы её прожить. Она стоит того, чтобы её понять.",
    },
    {
        author: "Лев Толстой",
        text: "Если хочешь быть счастливым, будь им.",
    },
    {
        author: "Александр Пушкин",
        text: "Всякое слово, данное человеку, имеет свою судьбу.",
    },
    {
        author: "Габриэль Гарсиа Маркес",
        text: "Ничто не заставляет человека так страдать, как его собственные мечты.",
    },
    {
        author: "Марк Твен",
        text: "Два самых важных дня в твоей жизни: день, когда ты родился, и день, когда ты узнал, зачем.",
    },
    {
        author: "Коко Шанель",
        text: "Чтобы быть незаменимой, нужно всегда быть разной.",
    },
    {
        author: "Оскар Уайльд",
        text: "Будьте собой, все остальные роли уже заняты.",
    },
    {
        author: "Антуан де Сент-Экзюпери",
        text: "Мы ответственны за тех, кого приручили.",
    },
    {
        author: "Эрих Мария Ремарк",
        text: "Счастье — это не дар, а результат наших усилий.",
    },
    {
        author: "Стивен Кинг",
        text: "Слова — это моя магия, и я люблю их.",
    },
];

const currentQuote = ref(quotes[Math.floor(Math.random() * quotes.length)]);
const showNextButton = ref(false);

const onBookClick = () => {
    console.log("Книга нажата");
};

const onArticleClick = () => {
    console.log("Статья нажата");
};


const nextQuote = () => {
    currentQuote.value = quotes[Math.floor(Math.random() * quotes.length)];
};


const handleNextClick = () => {
    nextQuote();
    showNextButton.value = false;
    setTimeout(() => {
        showNextButton.value = true;
    }, 5000);
};

onMounted(() => {
    setTimeout(() => {
        showNextButton.value = true;
    }, 5000);
});
</script>

<template>
    <Navigation />
    <h1 class="header-title">БУКСЫ</h1>
    <div class="quote-container">
        <div class="content">
            <div class="author">
                <h2>{{ currentQuote.author }}</h2>
            </div>
            <div class="quote">
                <span class="quote-start">“</span>
                <p>{{ currentQuote.text }}</p>
                <span class="quote-end">”</span>
            </div>
            <div class="button-container">
                <v-btn class="purple-btn" @click="onBookClick">Книга</v-btn>
                <v-btn class="outlined-btn" @click="onArticleClick">Статья</v-btn>
            </div>
        </div>
        <v-btn v-if="showNextButton" class="next-btn" @click="handleNextClick">
            Листать дальше
        </v-btn>
    </div>
</template>

<style scoped>
.quote-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    text-align: center;
    padding: 2vh;
}

.quote {
    position: relative;
    font-size: 2.5vh;
    font-style: italic;
    text-align: center;
}

.quote-start,
.quote-end {
    font-size: 5vh;
    position: absolute;
    color: #c6a7f8;
}

.quote-start {
    top: -3%;
    left: -3%;
}

.quote-end {
    bottom: -3%;
    right: -3%;
}

.content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.author {
    font-size: 2vh;
    margin-bottom: 2vh;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 2%;
    margin-bottom: 5%;
}

.purple-btn,
.outlined-btn,
.next-btn {
    height: 8vh;
    margin-top: 1vw;
    width: 10vw;
    border-radius: 10px;
    font-size: 2vh;
}

.purple-btn {
    background-color: #c6a7f8;
    color: white;
}

.outlined-btn {
    border: 2px solid black;
    color: black;
}

.next-btn {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #34495e;
    color: white;
    margin-top: 20px;
    margin-bottom: 5%;
    width: 12vw;
}

.header-title {
    position: absolute;
    top: 2%;
    left: 2%;
    font-size: 2.5vh;
    font-weight: 800;
    color: #000000;
    z-index: 10;
    margin-left: 4vw;
}
</style>
