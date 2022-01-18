/* Global Variables */
const apiKey = 'e9d97167a9c8c13686e07a2b3c822dcb';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='

// Create a new date instance dynamically with JS
let d = new Date();
const optionsDate = {
  year: 'numeric', month: 'long', day: 'numeric'
};
const newDate = new Intl.DateTimeFormat('en-US', optionsDate).format(d);

let processRequest =(event)=> {
  const zipCode =  document.querySelector('#zip').value;
  const yourFeelings =  document.querySelector('#feelings').value;

  getWeather(baseURL, zipCode, apiKey)
  .then((data)=>{
    // Add data
    postData('/add', {date:newDate, temp: data.main.temp, content:yourFeelings} );
  })
  .then(
    ()=>{
      updateUI()
    }
  )
}

const updateUI = async () => {
  const request = await fetch('/all');

  try{
    const allData = await request.json();
    document.querySelector('#date').innerHTML = `Date: ${allData.Date}`;
    document.querySelector('#temp').innerHTML = `Temperature: ${allData.Temp}` ;
    document.querySelector('#content').innerHTML = `I am feeling: ${allData.Content}`;
    document.querySelector('#zip').value = "";
    document.querySelector('#feelings').value = "";
  }catch(error){
    console.log("error", error);
  }
}

const getWeather = async (baseURL, zipCode, apiKey) => {
    const response = await fetch(baseURL+zipCode+'&appid='+apiKey);
    try{
      const data = await response.json();
      return data;  
    } catch(error){
      console.log("error", error);
    }
}

const postData = async (url = "", data = {})=>{
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    });

    try {
      const newData = await response.json();
      return newData;
    } catch(error) {
      console.log("error", error);
    }
}

document.querySelector('#generate').addEventListener('click', processRequest);