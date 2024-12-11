async function fetchWeatherData(){
    const city = document.getElementById('city').ariaValueMax.trim();
    if(!city){
        alert('Please enter a city name.');
        return;
    }

    try{
        const response = await fetch(
           `http://api.weatherstack.com/current?access_key=f63f9139bfa8b4825079cbd69984b9d8&query=${city}` 
        );
        const data = await response.json();

        if(data.error){
            alert('City not found!');
            return;
        }

        displayWeatherData(data);

    }
    catch(error){
        console.error('Error fetching weather data:',error);
        alert('Failed to fetch weather data.');
    }
}

function displayWeatherData(data){
    const{location,current} = data;

    document.getElementById('city-name').textContent=`City: ${location.name}`;
    document.getElementById('temperature').textContent=`Temperature: ${current.temperature}&deg;C`;
    document.getElementById('humidity').textContent=`Humidity: ${current.humidity}%`;
    document.getElementById('wind-speed').textContent=`Wind speed: ${current.wind_speed} km/h`;
    
    analyzeWeatherData(current.temperature,current.humidity,current.wind_speed);
}

function analyzeWeatherData(temperature,humidity,windSpeed){
    let analysis = 'Weather Analysis: ';
    if(temperature>30){
        analysis+='It is very hot!';
    }
    else if(temperature<10){
        analysis+='It is very cold!';
    }
    else{
        analysis+='The weather is moderate.';
    }

    document.getElementById('analysis').textContent=analysis;
}