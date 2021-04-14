const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=6dd37f39bd2872d65f5ff9fbd3920adf';
const units = '&units=metric'
let city;
let url;

const chosePicture = (id) => {
    if( id >= 200 && id < 300) return "img/thunderstorm.png";
    else if( id >= 300 && id < 400) return "img/drizzle.png";
    else if( id >= 500 && id < 600) return "img/rain.png";
    else if( id >= 600 && id < 700) return "img/ice.png";
    else if( id >= 700 && id < 800) return "img/fog.png";
    else if( id === 800) return "img/sun.png";
    else if( id > 800 && id < 900) return "img/cloud.png";
    else return "img/unknown.png";
};

const getWeather = () => {
    city = (!input.value) ? "Lublin" : input.value;
    url = apiLink + city + apiKey + units;

    axios.get(url)
        .then(res => {
            warning.textContent = '';
            input.value = '';
            weather.textContent = res.data.weather[0].main;
            temperature.textContent = Math.floor(res.data.main.temp) + '°C';
            humidity.textContent = res.data.main.humidity + '%';
            cityName.textContent = res.data.name;
            photo.setAttribute('src', chosePicture(res.data.weather[0].id));
        })
        .catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta.')
};

getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', function(){
    if(event.keyCode === 13)
        getWeather();
})

