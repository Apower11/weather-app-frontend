import { useEffect, useState, useContext } from 'preact/hooks';
import { usePreferences } from '../../shared/hooks/preferences-hook';
import { PreferencesContext } from '../../shared/context/preferences-context';
import parseWeatherCode from './parseCode';
import TimestampDetails from '../TimestampDetails';
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

const Event = ({ data, timelineDate }) => {
   let time = '11:15';
   const { changeToCelsius, changeToFahrenheit, temperatureMeasurement } = usePreferences();
   const [weather, setWeather] = useState({temp: data.temperature, ...parseWeatherCode(0, time)});
   const [ready, setReady] = useState(false);
   const [value, setValue] = useState("");
   const [timestamp, setTimestamp] = useState({});
   const [timestampModal, setTimestampModal] = useState(false);

   const preferences = useContext(PreferencesContext);

   const getWeatherTimestamp = async () => {
      const response = await axios.get(`https://weatherapp-group34-backend-api.herokuapp.com/timeline/getTimestamp/${data}`);
      setTimestamp(response.data.timestamp);
      setWeather({temp: response.data.timestamp.temperature, ...parseWeatherCode(response.data.timestamp.weatherCode, response.data.timestamp.time)})
   }

   console.log(temperatureMeasurement);

   useEffect(() => {
      getWeatherTimestamp();
      console.log(temperatureMeasurement);
   }, [value, data])
   setReady(true);

   const closeTimestampModal = () => {
      setTimestampModal(false);
   }



   

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
         {timestampModal ? <TimestampDetails close={closeTimestampModal} timelineDate={timelineDate} timestamp={timestamp} /> : undefined}
         <div class={style.left}>
            <div class={style.wrapper}>
               <div>
                  <span class={style.time}>{timestamp.time}</span>
                  <span class={style.name}>{timestamp.name}</span>
                  <button onClick={() => setTimestampModal(!timestampModal)} class={style.more_details_button}>More Details</button>
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
                     <span class={style.num}>{oneDecimal(preferences.temperatureMeasurement == 'celsius' ? timestamp.temperature : (timestamp.temperature * 9/5) + 32)}</span>
                     <span class={style.degrees}>{preferences.temperatureMeasurement == 'celsius' ? "°C" : "°F"}</span>
                  </span>
                  <span class={style.condition}>{timestamp.conditions}</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Event;