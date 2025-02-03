const apiKey = "f313a3c5dbcb93cb637fb9d6a5ff902f"; // Replace with your actual API key

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Get the temperature and city name
        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temperature").innerText = `${data.main.temp}°C`;

        // Get the weather icon (rainy, mist, drizzle, etc.)
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        document.getElementById("weatherIcon").src = iconUrl;
        document.getElementById("weatherIcon").style.display = "inline"; // Make sure the icon is visible

        // Get and display humidity and wind speed
        document.getElementById("humidity").innerText = `${data.main.humidity}%`;
        document.getElementById("windSpeed").innerText = `${data.wind.speed} km/h`;

        // Get the date and time from the API's "dt" value (Unix timestamp)
        const date = new Date(data.dt * 1000); // Convert Unix timestamp to milliseconds
        const options = {
            weekday: 'long', // "Monday"
            year: 'numeric', // "2025"
            month: 'long',   // "February"
            day: 'numeric',  // "3"
            hour: '2-digit', // "12"
            minute: '2-digit', // "30"
            second: '2-digit', // "30"
            hour12: true,    // 12-hour format with AM/PM
        };
        const formattedDate = date.toLocaleString('en-US', options); // Format to a readable string

        // Display the formatted date and time under the temperature
        document.getElementById("dateTime").innerText = formattedDate;

    } catch (error) {
        alert(error.message);
    }
}
