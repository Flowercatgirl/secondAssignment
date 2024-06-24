console.log('Connected!');

const apiKey = 'd5f1b5feddd32a1168799f9ddb5091a7';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const weatherIcon = document.querySelector('.weather-icon');

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        let data = await response.json();

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
        document.querySelector('.error').style.display = 'none';
    }

}

function getInput() {
    //Remove empty spaces before passing the input value to API
    cityName = (searchBox.value).trim();
    /*Check if input is not empty and if it is not then pass the value to API, 
    if it is empty do nothing */
    if (cityName.length > 0) {
        checkWeather(cityName);
        // Clear input field
        searchBox.value = '';
    } else { }

}

searchBtn.addEventListener('click', () => {
    getInput();
});

searchBox.addEventListener('keydown', function (e) {
    if (e.code === 'Enter') {  //check whether the pressed key is "Enter"
        getInput();
    }
});


