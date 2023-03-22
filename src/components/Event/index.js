import { useEffect, useState, useContext } from 'preact/hooks';
import { PreferencesContext } from '../../shared/context/preferences-context';
import parseWeatherCode from './parseCode';
import TimestampDetails from '../TimestampDetails';
import config from '../../config';
import axios from 'axios';
import style from './style.css';

// Takes a number that's defined as a string and turns it into a decimal
// number that's rounded to one decimal place.
const oneDecimal = temp => (
   parseFloat(temp).toFixed(1)
);

const Event = ({ data, timelineDate }) => {
   let time = '11:15';
   const [weather, setWeather] = useState({temp: "0.4", ...parseWeatherCode(0, time)});
   const [ready, setReady] = useState(false);
   const [value, setValue] = useState("");
   const [timestamp, setTimestamp] = useState({});
   const [timestampModal, setTimestampModal] = useState(false);

   const preferences = useContext(PreferencesContext);

   // Gets the details of the weather timestamp and stores them in the
   // timestamp state attribute.
   const getWeatherTimestamp = async () => {
      const response = await axios.get(`${config.api}/timeline/getTimestamp/${data}`);
      setTimestamp(response.data.timestamp);
      setWeather({temp: response.data.timestamp.temperature, ...parseWeatherCode(response.data.timestamp.weatherCode, response.data.timestamp.time)})
   }

   useEffect(() => {
      getWeatherTimestamp();
   }, [value, data])
   setReady(true);

   // Closes the timestamp modal which stores more details of timestamp.
   const closeTimestampModal = () => {
      setTimestampModal(false);
   }

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
                  <button onClick={() => setTimestampModal(!timestampModal)} class={style.more_details_button}>Details</button>
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