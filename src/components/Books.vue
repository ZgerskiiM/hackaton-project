<script setup>
import { ref, onMounted } from 'vue';
import Navigation from './Navigation.vue';


const quotes = [
  {
    author: 'Фёдор Достоевский',
    text: 'Неправда, что жизнь стоит того, чтобы её прожить. Она стоит того, чтобы её понять.',
  },
  {
    author: 'Лев Толстой',
    text: 'Если хочешь быть счастливым, будь им.',
  },
  {
    author: 'Александр Пушкин',
    text: 'Всякое слово, данное человеку, имеет свою судьбу.',
  },
  {
    author: 'Габриэль Гарсиа Маркес',
    text: 'Ничто не заставляет человека так страдать, как его собственные мечты.',
  },
  {
    author: 'Марк Твен',
    text: 'Два самых важных дня в твоей жизни: день, когда ты родился, и день, когда ты узнал, зачем.',
  },
  {
    author: 'Коко Шанель',
    text: 'Чтобы быть незаменимой, нужно всегда быть разной.',
  },
  {
    author: 'Оскар Уайльд',
    text: 'Будьте собой, все остальные роли уже заняты.',
  },
  {
    author: 'Антуан де Сент-Экзюпери',
    text: 'Мы ответственны за тех, кого приручили.',
  },
  {
    author: 'Эрих Мария Ремарк',
    text: 'Счастье — это не дар, а результат наших усилий.',
  },
  {
    author: 'Стивен Кинг',
    text: 'Слова — это моя магия, и я люблю их.',
  },
];

const currentQuote = ref(quotes[Math.floor(Math.random() * quotes.length)]);
const showNextButton = ref(false);

const onBookClick = () => {
  console.log('Книга нажата');
};

const onArticleClick = () => {
  console.log('Статья нажата');
};

// Метод для выбора следующей цитаты
const nextQuote = () => {
  currentQuote.value = quotes[Math.floor(Math.random() * quotes.length)];
};

// Обработчик нажатия кнопки "Листать дальше"
const handleNextClick = () => {
  nextQuote(); // Изменяем цитату
  showNextButton.value = false; // Скрываем кнопку
  setTimeout(() => {
    showNextButton.value = true; // Показываем кнопку снова через 5 секунд
  }, 5000); // 5 секунд
};

onMounted(() => {
  setTimeout(() => {
    showNextButton.value = true;
  }, 5000); // 5 секунд
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
      <v-btn
        v-if="showNextButton"
        class="next-btn"
        @click="handleNextClick"
      >
        Листать дальше
      </v-btn>
    </div>
  </template>

<style scoped>
.quote-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Выравниваем содержимое по центру */
  justify-content: space-between; /* Разделяем пространство между элементами */
  height: 100vh; /* Занимает всю высоту экрана */
  text-align: center;
  padding: 2vh; /* Отступ адаптирован для высоты экрана */
}

.quote {
  position: relative; /* Для абсолютного позиционирования кавычек */
  font-size: 2.5vh; /* Размер шрифта для цитаты адаптирован под высоту экрана */
  font-style: italic; /* Курсив для цитаты */
  text-align: center; /* Центрируем текст цитаты */
}

.quote-start,
.quote-end {
  font-size: 5vh; /* Размер кавычек адаптирован под высоту экрана */
  position: absolute; /* Абсолютное позиционирование */
  color: #C6A7F8; /* Цвет кавычек (можно изменить) */
}

.quote-start {
  top: -3%; /* Позиция сверху адаптирована */
  left: -3%; /* Позиция слева адаптирована */
}

.quote-end {
  bottom: -3%; /* Позиция снизу адаптирована */
  right: -3%; /* Позиция справа адаптирована */
}

.content {
  flex-grow: 1; /* Позволяет содержимому занимать оставшееся пространство */
  display: flex;
  flex-direction: column;
  align-items: center; /* Центрируем содержимое по горизонтали */
  justify-content: center; /* Центрируем содержимое по вертикали */
}

.author {
  font-size: 2vh; /* Размер шрифта адаптирован под высоту экрана */
  margin-bottom: 2vh; /* Отступ между автором и цитатой адаптирован под высоту экрана */
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 2%; /* Отступ между кнопками адаптирован */
  margin-bottom: 5%; /* Отступ между кнопками и следующей кнопкой */
}

.purple-btn,
.outlined-btn,
.next-btn {
  height: 8vh; /* Высота кнопки адаптирована под высоту экрана */
  margin-top: 1vw;
  width: 10vw; /* Ширина кнопки адаптирована под ширину экрана */
  border-radius: 10px; /* Скругление углов кнопки */
  font-size: 2vh; /* Размер текста кнопки адаптирован под высоту экрана */
}

.purple-btn {
  background-color: #C6A7F8; /* Фиолетовый цвет */
  color: white; /* Цвет текста */
}

.outlined-btn {
  border: 2px solid black; /* Черная обводка */
  color: black; /* Цвет текста */
}

.next-btn {
  position: absolute; /* Устанавливаем абсолютное позиционирование */
  bottom: 5%; /* Отступ от нижней части контейнера адаптирован */
  left: 50%; /* Центруем по горизонтали */
  transform: translateX(-50%); /* Сдвигаем влево на 50% от ширины кнопки, чтобы центрировать */
  background-color: #34495e; /* Цвет фона кнопки "Листать дальше" */
  color: white; /* Цвет текста */
  margin-top: 20px; /* Отступ сверху */
  margin-bottom: 5%; /* Отступ снизу */
  width: 12vw; /* Ширина кнопки адаптирована под ширину экрана */

}

.header-title {
  position: absolute; /* Абсолютное позиционирование */
  top: 2%; /* Отступ от верхней части адаптирован */
  left: 2%; /* Отступ от левой части адаптирован */
  font-size: 4vh; /* Размер шрифта заголовка адаптирован под высоту экрана */
  font-weight: bold; /* Жирный шрифт */
  color: #34495e; /* Цвет текста заголовка */
  z-index: 10; /* Убедитесь, что заголовок находится выше других элементов */
  margin-left: 7vw;
}
</style>
