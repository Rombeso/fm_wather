import { FAVORITES, NOW, DETAILS } from './constants.js'
// const parse = FAVORITES('node-html-parser');

// Отрисовка Дисплея
const URL = {
    SERVER_URL: 'https://api.openweathermap.org/data/2.5/weather',
    API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
};

const SEARCH_LOCATION = document.querySelector('input');
const SEARCH_IMG = document.querySelector('.search_img');
const BUTTONS = document.querySelectorAll('.button-nav');
const NAV = document.querySelector('NAV');
const DISPLAY = document.querySelectorAll('.display')

// Берем любимые города
let favoriteCities = JSON.parse(localStorage.getItem('storage'));
console.log(favoriteCities);
if (favoriteCities === null) {
    favoriteCities = [];
};

// Конвертация времени
function convertTime(unixTime) {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.slice(-2);
};

// Отрисовка правой части при загрузки страницы
const randerFavoritCities = () => {
    let currentCity = localStorage.getItem('currentCity');
    !currentCity ? currentCity = 'Moscow' : '';
    getWather(currentCity)
    favoriteCities.map(item => {
        let newLi = document.createElement("li");
        let remImg = document.createElement("img");
        remImg.className = `remove ${item}`
        newLi.className = 'location-li';
        newLi.innerHTML = item;
        remImg.setAttribute('src', "./../img/delete.png")
        FAVORITES.LIST.append(newLi);
        FAVORITES.LIST.append(remImg);
    })
};

window.addEventListener('load', randerFavoritCities)

// По нажатию Enter отправка данных из Input на отрисовку для Дисплей
SEARCH_LOCATION.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && SEARCH_LOCATION.value) {
        getWather(SEARCH_LOCATION.value);
        SEARCH_LOCATION.value = '';
        localStorage.setItem('currentCity', SEARCH_LOCATION.value)
    }
});

SEARCH_IMG.addEventListener('click', (e) => {
    if (SEARCH_LOCATION.value) {
        getWather(SEARCH_LOCATION.value);
        SEARCH_LOCATION.value = '';
        localStorage.setItem('currentCity', SEARCH_LOCATION.value)
    }
}
);

// Получение данных с сервера
const getWather = (cityName) => {
    const url = `${URL.SERVER_URL}?q=${cityName}&units=metric&appid=${URL.API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(randerWeather)
};

// Отрисовка левой части
function randerWeather(data) {
    console.log(data);
    const response = data.cod
    console.log(response);
    if (response === 200) {
        NOW.LOCATION.textContent = data.name;
        NOW.TEMPERATURE.textContent = Math.round(data.main.temp) + '°';
        DETAILS.LOCATION.textContent = data.name;
        DETAILS.TEMPERATURE.textContent = `Temperature: ${Math.round(data.main.temp)}` + '\xB0';
        DETAILS.FEELSLIKE.textContent = `Feels like: ${Math.round(data.main.feels_like)}` + '\xB0';
        DETAILS.WEATHER.textContent = `Weather: ${data.weather[0].description}`;
        DETAILS.SUNRISE.textContent = `Sunrise: ${convertTime(data.sys.sunrise)}`;
        DETAILS.SUNSET.textContent = `Sunset: ${convertTime(data.sys.sunset)}`;
        NOW.WEATHER_ICON.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`
        return
    } else {
        alert(data.cod + ' - ' + data.message)
    };
};

// Добавление любимого города в правый блок
const addFavourites = () => {
    const isNotValid = Array.from(document.querySelectorAll('.location-li')).find(i => i.textContent === NOW.LOCATION.textContent);
    if (isNotValid) return
    console.log(favoriteCities);
    favoriteCities.push(NOW.LOCATION.textContent);
    console.log(favoriteCities);
    localStorage.setItem('storage', JSON.stringify(favoriteCities));
    // STOREGE.saveFavoriteCities(favoriteCities);
    let newLi = document.createElement("li");
    let remImg = document.createElement("img");
    remImg.className = `remove ${NOW.LOCATION.textContent}`;
    remImg.setAttribute('src', "img/delete.png");
    newLi.className = 'location-li';
    newLi.innerHTML = NOW.LOCATION.textContent;
    FAVORITES.LIST.append(newLi);
    FAVORITES.LIST.append(remImg);
};

NOW.FAVORITE_IMG.onclick = addFavourites;

// При клике на любимый город из правого списка, выводим его на отрисовку в диспелей
const addFavouritesInDisplay = (e) => {
    let liLocation = e.target.textContent
    getWather(liLocation)
    localStorage.setItem('currentCity', liLocation)
};

// Удаление из избраного
const removeFavorites = (e) => {
    // Удаляем чаилд эл-ты
    while (FAVORITES.LIST.firstChild) {
        FAVORITES.LIST.removeChild(FAVORITES.LIST.lastChild)
    }

    let liLocation = e.target.classList[1]
    let keyId = favoriteCities.indexOf(liLocation);
    favoriteCities.splice(keyId, 1);
    localStorage.setItem('storage', JSON.stringify(favoriteCities));
    randerFavoritCities()
};

FAVORITES.LIST.addEventListener('click', (e) => {
    if (e.target.localName === "li") {
        addFavouritesInDisplay(e)
    } else if (e.target.localName === "img") {
        removeFavorites(e)
    }
}
);

function removeClassName(array, className) {
    array.forEach(function (item) {
        item.classList.remove(className);
    })
};

function switchScreen(index) {

    console.log(index);
    removeClassName(BUTTONS, 'active-btn');
    removeClassName(DISPLAY, 'active-dis');
    BUTTONS[index].classList.add('active-btn');
    DISPLAY[index].classList.add('active-dis');

};

NAV.addEventListener("click", function (e) {
    switchScreen(Array.from(BUTTONS).indexOf(e.target));
});
