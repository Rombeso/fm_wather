// Отрисовка Дисплея
const getWather = (cityName) => {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    let inp = document.querySelector('input').value;
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&units=metric&appid=${apiKey}`;

    console.log(cityName);

    fetch(url)
        .then(response => response.json())
        .catch(err => alert(err))
        .then(data => showWeather(data))
        .catch(err => { alert(err), alert('City not found!') })

    function showWeather(data) {
        console.log(data);
        document.querySelector('.city-1').textContent = data.name;
        document.querySelector('.temp-1').textContent = Math.round(data.main.temp);
        // document.querySelector('.wind').textContent = "Ветер: " + data.wind.speed;
        // document.querySelector('.humidity').textContent = "Влажность: " + data.main.humidity;
        // document.querySelector('.pressure').textContent = "Давление: " + data.main.pressure;
        document.querySelector('.img-1').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`
        // }

    };

}
// По нажатию Enter отправка данных из Input на отрисовку для Дисплей
document.querySelector('input').addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        let inp = document.querySelector('input').value;
        getWather(inp);
        document.querySelector('input').value = '';
    }
});

// Добавление любимого города в правый блок
const addFavourites = () => {
    let ul = document.querySelector('.location-ul');
    let li = document.querySelectorAll('.location-ul li');
    console.log(li);
    let liLength = li.length;
    let cityName = document.querySelector('.city-1').textContent;
    console.log(cityName);
    let newLi = document.createElement("li");
    console.log(newLi);
    newLi.className = `li-${liLength}`;
    newLi.innerHTML = cityName;
    ul.append(newLi)
}

document.querySelector('.love-1-img').onclick = addFavourites;

// При клике на любимый город из правого списка, выводим его на отрисовку в диспелей
document.querySelector('.location-ul').onclick = addFavouritesInDisplay = (e) => {
    console.log(e.target.className)
    let liClass = e.target.className
    let liLocation = document.querySelector(`.${liClass}`).textContent
    console.log(liLocation);
    getWather(liLocation)

};