console.log('Connected!');

const apiKey = 'd5f1b5feddd32a1168799f9ddb5091a7';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const weatherIcon = document.querySelector('.weather-icon');

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = 'assets/images/cloudy.png';
    } else if (data.weather[0].main == 'Clear') {
        weatherIcon.src = 'assets/images/day_clear.png';
    } else if (data.weather[0].main == 'Rain') {
        weatherIcon.src = 'assets/images/rain.png';
    } else if (data.weather[0].main == 'Drizzle') {
        weatherIcon.src = 'assets/images/day_rain.png';
    } else if (data.weather[0].main == 'Mist') {
        weatherIcon.src = 'assets/images/mist.png';
    }

    document.querySelector('.weather').style.display = 'block';
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener('keydown', function (e) {
    if (e.code === 'Enter') {  //check whether the pressed key is "Enter"
        checkWeather(searchBox.value);
    }
});


