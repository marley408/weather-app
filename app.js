window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature')
  let temperatureSpan = document.querySelector('.temperature span')

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/'

      const api = `${proxy}https://api.darksky.net/forecast/9d012eddd1b6fc337688dffcac4f1adb/${lat},${long}
      `;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data =>{
          console.log(data)
          const {temperature, summary, icon } = data.currently;
          // set DOM elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // formula for celsius 
          let celsius = (temperature - 32) * (5/9)

          // set Icon
          setIcons(icon, document.querySelector('.icon'));

          // change temp to celsius or farenheit 
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F'){
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temperature;

            }
          })
        })
    })

  }else{
    h1.textContent = 'this app requires location to be enabled'
  }

  function setIcons(icon, iconID){
    const skycons = new Skycons({color:'white'});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
})