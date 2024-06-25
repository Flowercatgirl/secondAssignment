console.log('Connected!');

const apiKey = 'd5f1b5feddd32a1168799f9ddb5091a7';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const weatherIcon = document.querySelector('.weather-icon');

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const mainPicture = document.getElementById('main_pic');

async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        let data = await response.json();
        let newColor = document.getElementById('body-container')

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
            const local_date = new Date(utc_milliseconds).toUTCString();
            return local_date;
          }

        const cityTime = getDate(data.dt, data.timezone);
        const citySunrise_int = new Date((data.sys.sunrise + data.timezone) * 1000);
        const citySunrise = citySunrise_int.toString();
        const citySunset = new Date((data.sys.sunset + data.timezone) * 1000).toString();

        let c_sunrise = citySunrise.slice(16, 24);
        let c_sunset = citySunset.slice(16, 24);

        console.log(c_sunrise + '   '+c_sunset);
        console.log(cityTime);

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'assets/images/cloudy.png';    
            newColor.style.backgroundColor = '#599CBA';
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'assets/images/day_clear.png';
            newColor.style.backgroundColor = '#FFD364';
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = 'assets/images/rain.png';
            newColor.style.backgroundColor = '#0E91CA';
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = 'assets/images/day_rain.png';
            newColor.style.backgroundColor = '#0E91CA';
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = 'assets/images/mist.png';
            newColor.style.backgroundColor = '#8AB1C8';    
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
        
        
    } else { }

    //Remove the initial picture
    if (mainPicture){
        mainPicture.remove();
    }else{}

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


