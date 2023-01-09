// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=6b100ba8cb20fdced9102c68437a3721&units=imperial';

//Create Array For Months to turn the number [index] of months to names
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = months[d.getMonth()] + '.' + d.getDate() + '.' + d.getFullYear();

const generatBtn = document.querySelector('#generate');
// Event listener to add function to existing HTML DOM element
generatBtn.addEventListener('click', () => {
    // get values of inputs
    const zip = document.getElementById('zip').value,
        feelings = document.getElementById('feelings').value;

    // Call getWeatherData function to perform the action
    getWeatherData('http://api.openweathermap.org/data/2.5/weather?zip=' + zip, apiKey)
        .then((data) => postWeatherData('/add', { date: newDate, temp: data.main.temp, content: feelings }))
        .then(() => retrieveData())
});

/* Function to GET Web API Data*/
const getWeatherData = async (zip, apiKey) => {
    const request = await fetch(zip + apiKey);
    try {
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

/* Function to POST data */
const postWeatherData = async (url = "", data = {}) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })
    });

    try {
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

/* Function to GET Project Data */
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const response = await request.json()
        console.log(response)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(response.temp) + 'degrees';
        document.getElementById('content').innerHTML = response.content;
        document.getElementById('date').innerHTML = response.date;
    }
    catch (error) {
        // appropriately handle the error
        console.log("error", error);
    }
}