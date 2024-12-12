async function fetchWeatherData(){
    const city = document.getElementById('city').value.trim();
    const cityInput = document.getElementById('city');
    if (cityInput) { 
        const city = cityInput.value.trim(); 
  // ... rest of your code
    } else {
        console.error("City input element not found."); 
  // Handle the case where the input element doesn't exist
    }
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
    document.getElementById('temperature').textContent=`Temperature: ${current.temperature}\u00B0C`;
    document.getElementById('humidity').textContent=`Humidity: ${current.humidity}%`;
    document.getElementById('wind-speed').textContent=`Wind speed: ${current.wind_speed} km/h`;
    
    analyzeWeatherData(current.temperature,current.humidity,current.wind_speed);
    renderChart(current.temperature, current.humidity, current.wind_speed);
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

function renderChart(temperature, humidity, windSpeed) {
    const ctx = document.getElementById('weatherChart').getContext('2d');
  
    try {
      if (window.weatherChart) { 
        console.log("Destroying existing chart:", window.weatherChart); 
        
        if (window.weatherChart instanceof Chart) { 
            window.weatherChart.destroy(); 
        }
        else {
            console.warn("window.weatherChart is not a Chart.js instance. Skipping destruction.");
        }
      }
  
      window.weatherChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Temperature (°C)', 'Humidity (%)', 'Wind Speed (km/h)'],
          datasets: [{
            label: 'Weather Data',
            data: [temperature, humidity, windSpeed],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      });
    } catch (error) {
      console.error("Error creating or destroying chart:", error);
      // Handle the error gracefully (e.g., display an error message to the user)
      alert("An error occurred while rendering the chart. Please try again later.");
      return; 
    }
  
    console.log("window.weatherChart after:", window.weatherChart); 
  }