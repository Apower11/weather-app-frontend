import { useEffect, useState } from 'preact/hooks';
import parseWeatherCode from './parseCode';
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

const Event = ({ data: { name, time, coords } }) => {
   const [weather, setWeather] = useState({});
   const [ready, setReady] = useState(false);

   useEffect(() => {
      jetch(`${api}?latitude=${coords.lat}&longitude=${coords.lng}&hourly=temperature_2m,weathercode`)
         .then(e => {
            setWeather({
               temp: e.hourly.temperature_2m[time.h],
               ...parseWeatherCode(e.hourly.weathercode[time.h], time)
            });

            setReady(true);
         });
   }, [time, coords]);

   if (!ready)
      return; // placeholder

   return (
      <div class={style.event}>
         <div class={style.left}>
            <div class={style.wrapper}>
               <div>
                  <span class={style.time}>{formatTime(time)}</span>
                  <span class={style.name}>{name}</span>
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
                     <span class={style.num}>{oneDecimal(weather.temp)}</span>
                     <span class={style.degrees}>&#176;C</span>
                  </span>
                  <span class={style.condition}>{weather.name}</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Event;