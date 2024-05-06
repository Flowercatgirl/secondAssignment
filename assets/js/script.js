console.log('Connected!');

const apiKey ='d5f1b5feddd32a1168799f9ddb5091a7';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=vilnius';

async function checkWeather(){
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';
}

checkWeather();