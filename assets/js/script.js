console.log('Connected!');

const apiKey = 'd5f1b5feddd32a1168799f9ddb5091a7';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const weatherIcon = document.querySelector('.weather-icon');

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const mainPicture = document.getElementById('main_pic');
const errorPicture = document.getElementById('error_page');

async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
        mainPicture.style.display = 'none';
        errorPicture.style.display = 'flex';
        errorPicture.style.justifyContent = 'center';
    } else {
        let data = await response.json();
        let container = document.getElementById('body-container')

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        // This function gets City current time, using API response
        function getDate(dt, timezone) {
            /* First convert dt and timezone to integers.
            dt represents the number of seconds since January 1st, 1970 UTC 
            and timezone indicates by how many seconds the timezone in City is different from UTC
            Adding these two integers gives the number of seconds from January 1st, 1970 to current time in City. 
            To convert this into a date, we must use new Date(...). 
            In JS, new Date() accepts only utc in milliseconds so we must convert utc_seconds to milliseconds.
            new Date(utc_milliseconds) gives the current time in City in my local timezone 
            which is different from the timezone in City.
            new Date(utc_milliseconds).toUTCString() changes the timezone accordingly. */
            const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
            const utc_milliseconds = utc_seconds * 1000;
            const local_date = new Date(utc_milliseconds);
            return local_date;
          }

        const cityTime = getDate(data.dt, data.timezone);

        const citySunrise = getDate(data.sys.sunrise, data.timezone);
        const citySunset = getDate(data.sys.sunset, data.timezone);

        const isDaytime = cityTime > citySunrise && cityTime < citySunset;

        console.log(`Sunrise: ${(citySunrise).toUTCString().slice(17, 25)}  Sunset: ${(citySunset).toUTCString().slice(17, 25)}`);
        console.log(`Current Time in ${data.name}: ${(cityTime).toUTCString().slice(17, 25)}`);
        console.log(`Is Daytime: ${isDaytime}`);

        if (isDaytime) {
            switch (data.weather[0].main) {
                case 'Clouds':
                    weatherIcon.src = 'assets/images/cloudy.png';
                    container.style.backgroundColor = '#599CBA';
                    break;
                case 'Clear':
                    weatherIcon.src = 'assets/images/day_clear.png';
                    container.style.backgroundColor = '#FFD364';
                    break;
                case 'Rain':
                    weatherIcon.src = 'assets/images/rain.png';
                    container.style.backgroundColor = '#2C3E50';
                    break;
                case 'Drizzle':
                    weatherIcon.src = 'assets/images/day_rain.png';
                    container.style.backgroundColor = '#0E91CA';
                    break;
                case 'Mist':
                    weatherIcon.src = 'assets/images/mist.png';
                    container.style.backgroundColor = '#8AB1C8';
                    break;
            }
        } else {
            switch (data.weather[0].main) {
                case 'Clouds':
                    weatherIcon.src = 'assets/images/night_half_moon_partial_cloud.png';
                    container.style.backgroundColor = '#2C3E50';
                    break;
                case 'Clear':
                    weatherIcon.src = 'assets/images/night_half_moon_clear.png';
                    container.style.backgroundColor = '#2C3E50';
                    break;
                case 'Rain':
                    weatherIcon.src = 'assets/images/rain.png';
                    container.style.backgroundColor = '#2C3E50';
                    break;
                case 'Drizzle':
                    weatherIcon.src = 'assets/images/night_half_moon_rain.png';
                    container.style.backgroundColor = '#2C3E50';
                    break;
                case 'Mist':
                    weatherIcon.src = 'assets/images/mist.png';
                    container.style.backgroundColor = '#2C3E50';
                    break;
            }
        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }

}

function getInput() {
    /* Remove empty spaces before and after string(trim), 
    numbers and special characters (regex) before passing the input value to API */
    const cityName = ((searchBox.value).replace(/[0-9.,*+^<>?!$#$%&{}()|[\]\\]/g, '')).trim();

    /*Check if input is not empty and if it is not then pass the value to API, 
    if it is empty do nothing */
    if (cityName.length > 0) {
        checkWeather(cityName);

        if (window.getComputedStyle(mainPicture).display != 'none'){
            //hide mainPicture on submitting user input
            mainPicture.style.display = 'none';
            
        }else if(window.getComputedStyle(errorPicture).display != 'none'){
            //hide errorPicture on submitting a valid city input
            errorPicture.style.display = 'none';

        }else{}
        
    } else {}

    // Clear input field
    searchBox.value = '';
}

// add the Event Listener to the button click
searchBtn.addEventListener('click', () => {
    getInput();
});

// add the Event Listener to the Enter key press within an input field
searchBox.addEventListener('keydown', function (e) {
    if (e.code === 'Enter') {  //check whether the pressed key is "Enter"
        getInput();
    }
});


