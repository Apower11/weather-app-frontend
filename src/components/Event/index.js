import { useEffect, useState } from 'preact/hooks';
import parseWeatherCode from './parseCode';
import axios from 'axios';
import style from './style.css';

const api = 'https://api.open-meteo.com/v1/forecast';

// fetch and json
const jetch = async url => {
   const res = await fetch(url);
   return await res.json();
};

const formatTime = time => (
   time.h.toString().padStart(2, '0') + ":" + time.m.toString().padStart(2, '0')
);

const oneDecimal = temp => (
   parseFloat(temp).toFixed(1)
);

const Event = ({ data }) => {
   let time = '11:15';
   const [weather, setWeather] = useState({temp: "11.1", ...parseWeatherCode(0, time)});
   const [ready, setReady] = useState(false);
   const [value, setValue] = useState("");
   const [timestamp, setTimestamp] = useState({});

   const getWeatherTimestamp = async () => {
      const response = await axios.get(`https://weatherapp-group34-backend-api.herokuapp.com/timeline/getTimestamp/${data}`);
      setTimestamp(response.data.timestamp);
      setWeather({temp: response.data.timestamp.temperature, ...parseWeatherCode(response.data.timestamp.weatherCode, response.data.timestamp.time)})
   }

   useEffect(() => {
      getWeatherTimestamp();
   }, [value, data])
   setReady(true);



   

   // useEffect(() => {
   //    jetch(`${api}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode`)
   //       .then(e => {
   //          setWeather({
   //             temp: e.hourly.temperature_2m[time.h],
   //             ...parseWeatherCode(e.hourly.weathercode[time.h], time)
   //          });

   //          setReady(true);
   //       });
   // }, [time, latitude, longitude]);

   if (!ready)
      return; // placeholder

   return (
      <div class={style.event}>
         <div class={style.left}>
            <div class={style.wrapper}>
               <div>
                  <span class={style.time}>{timestamp.time}</span>
                  <span class={style.name}>{timestamp.name}</span>
               </div>
            </div>
         </div>

         <div class={style.right + ' ' + weather.style}>
            <div class={style.wrapper}>
               <div>
                  <div class={style.icon}>
                     <span class='material-symbols-outlined'>{weather.icon}</span>
                  </div>
               </div>
               <div class={style.temp}>
                  <span>
                     <span class={style.num}>{oneDecimal(timestamp.temperature)}</span>
                     <span class={style.degrees}>&#176;C</span>
                  </span>
                  <span class={style.condition}>{timestamp.conditions}</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Event;