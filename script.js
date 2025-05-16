// const container = document.querySelector('.container');
// const search = document.querySelector('.search-box button');
// const weatherBox = document.querySelector('.weather-box');
// const weatherDetails = document.querySelector('.weather-details');
// const error404 = document.querySelector('.not-found');
// const forecastContainer = document.querySelector('.forecast-container');
// const searchInput = document.querySelector('.search-box input');
// const dateElement = document.querySelector('.description .date');

// // Using the provided API key for OpenWeatherMap
// const apiKey = 'fcc8de7015bbb202209bbf0261babf4c';

// // Set current date
// function setCurrentDate() {
//     const now = new Date();
//     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     dateElement.textContent = now.toLocaleDateString('en-US', options);
// }

// // Load default city on page load
// window.addEventListener('load', () => {
//     setCurrentDate();
//     getWeatherData('New York');
    
//     // Add loading animation
//     document.body.classList.add('loaded');
    
//     // Add staggered animations to weather details
//     const detailCards = document.querySelectorAll('.detail-card');
//     detailCards.forEach((card, index) => {
//         card.style.animationDelay = `${0.2 + (index * 0.1)}s`;
//     });
    
//     // Add staggered animations to forecast days
//     const forecastDays = document.querySelectorAll('.forecast-day');
//     forecastDays.forEach((day, index) => {
//         day.style.animationDelay = `${0.4 + (index * 0.1)}s`;
//     });
// });

// // Search button click event
// search.addEventListener('click', () => {
//     performSearch();
// });

// // Enter key press event
// searchInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') {
//         performSearch();
//     }
// });

// // Function to handle search
// function performSearch() {
//     const city = searchInput.value.trim();
//     if (city === '') return;
    
//     // Add searching animation
//     container.classList.add('searching');
    
//     // Show loading state
//     document.querySelector('.weather-box').style.opacity = '0.6';
//     document.querySelector('.weather-details').style.opacity = '0.6';
//     document.querySelector('.forecast-container').style.opacity = '0.6';
    
//     getWeatherData(city);
// }

// // Function to get weather data using OpenWeatherMap API
// function getWeatherData(city) {
//     // Current weather API endpoint for OpenWeatherMap
//     const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
//     // 5-day forecast API endpoint for OpenWeatherMap
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    
//     // Fetch current weather data
//     fetch(currentWeatherUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('City not found');
//             }
//             return response.json();
//         })
//         .then(json => {
//             // Remove searching animation
//             container.classList.remove('searching');
            
//             // Hide error message
//             error404.style.display = 'none';
//             error404.classList.remove('fadeIn');
            
//             // Extract weather data
//             const image = document.querySelector('.weather-icon img');
//             const temperature = document.querySelector('.temperature .num');
//             const description = document.querySelector('.description .condition');
//             const location = document.querySelector('.description .location span');
//             const humidity = document.querySelector('.humidity span');
//             const wind = document.querySelector('.wind span');
//             const feelsLike = document.querySelector('.feels-like span');
//             const pressure = document.querySelector('.pressure span');
            
//             // Get weather icon code from OpenWeatherMap
//             const weatherIconCode = json.weather[0].icon;
            
//             // Update UI with current weather data
//             image.src = `https://openweathermap.org/img/wn/${weatherIconCode}@4x.png`;
//             temperature.innerHTML = `${Math.round(json.main.temp)}`;
//             description.innerHTML = `${json.weather[0].description.charAt(0).toUpperCase() + json.weather[0].description.slice(1)}`;
//             location.innerHTML = `${json.name}, ${json.sys.country}`;
//             humidity.innerHTML = `${json.main.humidity}%`;
//             wind.innerHTML = `${Math.round(json.wind.speed * 3.6)} Km/h`; // Convert m/s to km/h
//             feelsLike.innerHTML = `${Math.round(json.main.feels_like)}°C`;
//             pressure.innerHTML = `${json.main.pressure} hPa`;
            
//             // Reset opacity
//             document.querySelector('.weather-box').style.opacity = '1';
//             document.querySelector('.weather-details').style.opacity = '1';
//             document.querySelector('.forecast-container').style.opacity = '1';
            
//             // Add animation classes
//             weatherBox.classList.add('animate');
//             weatherDetails.classList.add('animate');
            
//             // Show weather information with animation
//             weatherBox.style.display = 'flex';
//             weatherDetails.style.display = 'grid';
            
//             // Change background based on weather condition
//             updateBackground(json.weather[0].description.toLowerCase(), isDay(json.sys.sunrise, json.sys.sunset, json.dt));
            
//             // Update weather icon animation based on condition
//             updateWeatherAnimation(json.weather[0].description.toLowerCase(), isDay(json.sys.sunrise, json.sys.sunset, json.dt));
//         })
//         .catch(error => {
//             console.error('Error fetching weather data:', error);
            
//             // Remove searching animation
//             container.classList.remove('searching');
            
//             // Show error message
//             weatherBox.style.display = 'none';
//             weatherDetails.style.display = 'none';
//             forecastContainer.style.display = 'none';
//             error404.style.display = 'block';
//             error404.classList.add('fadeIn');
            
//             // Reset opacity
//             document.querySelector('.weather-box').style.opacity = '1';
//             document.querySelector('.weather-details').style.opacity = '1';
//             document.querySelector('.forecast-container').style.opacity = '1';
//         });
    
//     // Fetch forecast data
//     fetch(forecastUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Forecast data not available');
//             }
//             return response.json();
//         })
//         .then(json => {
//             // Get unique days from the 5-day forecast (OpenWeatherMap returns data in 3-hour intervals)
//             const forecastDays = document.querySelectorAll('.forecast-day');
//             const uniqueDays = getUniqueDays(json.list);
            
//             // Update each forecast day
//             for (let i = 0; i < forecastDays.length; i++) {
//                 if (uniqueDays[i]) {
//                     const data = uniqueDays[i];
//                     const day = new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
//                     const iconCode = data.weather[0].icon;
//                     const temp = Math.round(data.main.temp);
                    
//                     forecastDays[i].querySelector('.day').textContent = day;
//                     forecastDays[i].querySelector('img').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
//                     forecastDays[i].querySelector('.temp').textContent = `${temp}°C`;
                    
//                     // Add staggered animation
//                     forecastDays[i].style.animationDelay = `${0.2 + (i * 0.1)}s`;
//                     forecastDays[i].classList.add('animate');
//                 }
//             }
            
//             forecastContainer.style.display = 'block';
//             forecastContainer.classList.add('animate');
//         })
//         .catch(error => {
//             console.error('Error fetching forecast data:', error);
//             forecastContainer.style.display = 'none';
//         });
// }

// // Helper function to check if it's day or night
// function isDay(sunrise, sunset, current) {
//     return current >= sunrise && current < sunset;
// }

// // Helper function to get unique days from forecast data
// function getUniqueDays(forecastList) {
//     const uniqueDays = [];
//     const dayMap = new Map();
    
//     forecastList.forEach(item => {
//         const date = new Date(item.dt * 1000);
//         const day = date.getDate();
        
//         // Only take one forecast per day (at noon if possible)
//         if (!dayMap.has(day)) {
//             dayMap.set(day, item);
//             uniqueDays.push(item);
//         } else {
//             // Try to get the forecast for around noon
//             const existingHour = new Date(dayMap.get(day).dt * 1000).getHours();
//             const currentHour = date.getHours();
            
//             if (Math.abs(currentHour - 12) < Math.abs(existingHour - 12)) {
//                 dayMap.set(day, item);
//                 const index = uniqueDays.findIndex(d => new Date(d.dt * 1000).getDate() === day);
//                 uniqueDays[index] = item;
//             }
//         }
//     });
    
//     return uniqueDays.slice(0, 5); // Return only the first 5 days
// }

// // Function to update background based on weather condition and time of day
// function updateBackground(condition, isDay) {
//     let gradient;
    
//     if (isDay) {
//         if (condition.includes('clear') || condition.includes('sunny')) {
//             gradient = 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)';
//         } else if (condition.includes('cloud')) {
//             gradient = 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)';
//         } else if (condition.includes('rain') || condition.includes('drizzle')) {
//             gradient = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
//         } else if (condition.includes('snow') || condition.includes('sleet') || condition.includes('ice')) {
//             gradient = 'linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)';
//         } else if (condition.includes('thunder') || condition.includes('storm')) {
//             gradient = 'linear-gradient(135deg, #09203f 0%, #537895 100%)';
//         } else if (condition.includes('fog') || condition.includes('mist')) {
//             gradient = 'linear-gradient(135deg, #d7d2cc 0%, #304352 100%)';
//         } else {
//             gradient = 'linear-gradient(135deg, #4361ee 0%, #3f37c9 100%)';
//         }
//     } else {
//         // Night time gradients
//         if (condition.includes('clear')) {
//             gradient = 'linear-gradient(135deg, #0c1445 0%, #2a2a72 100%)';
//         } else if (condition.includes('cloud')) {
//             gradient = 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)';
//         } else if (condition.includes('rain') || condition.includes('drizzle')) {
//             gradient = 'linear-gradient(135deg, #373b44 0%, #4286f4 100%)';
//         } else if (condition.includes('snow') || condition.includes('sleet') || condition.includes('ice')) {
//             gradient = 'linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)';
//         } else if (condition.includes('thunder') || condition.includes('storm')) {
//             gradient = 'linear-gradient(135deg, #141e30 0%, #243b55 100%)';
//         } else if (condition.includes('fog') || condition.includes('mist')) {
//             gradient = 'linear-gradient(135deg, #2c3e50 0%, #bdc3c7 100%)';
//         } else {
//             gradient = 'linear-gradient(135deg, #0f2027 0%, #203a43 100%)';
//         }
//     }
    
//     // Apply gradient with smooth transition
//     document.body.style.background = gradient;
// }

// // Function to update weather icon animation based on condition
// function updateWeatherAnimation(condition, isDay) {
//     const sunRays = document.querySelector('.sun-rays');
//     const cloud1 = document.querySelector('.cloud1');
//     const cloud2 = document.querySelector('.cloud2');
    
//     // Reset animations
//     sunRays.style.display = 'none';
//     cloud1.style.display = 'none';
//     cloud2.style.display = 'none';
    
//     if (condition.includes('clear') || condition.includes('sunny')) {
//         sunRays.style.display = 'block';
//         sunRays.style.background = isDay ? 
//             'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0) 70%)' :
//             'radial-gradient(circle, rgba(100, 149, 237, 0.2) 0%, rgba(100, 149, 237, 0) 70%)';
//     } else if (condition.includes('cloud')) {
//         cloud1.style.display = 'block';
//         cloud2.style.display = 'block';
        
//         if (condition.includes('few') || condition.includes('scattered')) {
//             sunRays.style.display = 'block';
//             sunRays.style.opacity = '0.5';
//         }
//     } else if (condition.includes('rain') || condition.includes('drizzle')) {
//         cloud1.style.display = 'block';
//         cloud2.style.display = 'block';
//         cloud1.style.background = 'rgba(200, 200, 200, 0.8)';
//         cloud2.style.background = 'rgba(180, 180, 180, 0.8)';
//     } else if (condition.includes('thunder') || condition.includes('storm')) {
//         cloud1.style.display = 'block';
//         cloud2.style.display = 'block';
//         cloud1.style.background = 'rgba(100, 100, 100, 0.9)';
//         cloud2.style.background = 'rgba(80, 80, 80, 0.9)';
//     } else {
//         cloud1.style.display = 'block';
//         cloud2.style.display = 'block';
//     }
// }

// // Add fade-in animation
// document.body.style.opacity = '0';
// window.onload = function() {
//     document.body.style.transition = 'opacity 1s ease, background 1.5s ease';
//     document.body.style.opacity = '1';
// };

// // Add some interactivity to the forecast days
// const forecastDays = document.querySelectorAll('.forecast-day');
// forecastDays.forEach(day => {
//     day.addEventListener('mouseenter', () => {
//         day.style.transform = 'translateY(-8px)';
//         day.style.background = 'rgba(255, 255, 255, 0.2)';
//     });
    
//     day.addEventListener('mouseleave', () => {
//         day.style.transform = 'translateY(0)';
//         day.style.background = 'transparent';
//     });
// });

// // Add CSS class for search animation
// document.head.insertAdjacentHTML('beforeend', `
// <style>
// @keyframes searching {
//     0% { transform: translateY(0); }
//     50% { transform: translateY(-5px); }
//     100% { transform: translateY(0); }
// }
// .searching .search-box button {
//     animation: searching 1s infinite;
//     background: var(--accent-color);
// }
// </style>
// `);