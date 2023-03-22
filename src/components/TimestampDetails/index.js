import { useEffect, useState, useContext } from 'preact/hooks';
import parseWeatherCode from '../Event/parseCode';
import { PreferencesContext } from '../../shared/context/preferences-context';
import { usePreferences } from '../../shared/hooks/preferences-hook';
import axios from 'axios';
import style from './style.css';

const Modal = ({ timestamp, close, timelineDate }) => {

    const oneDecimal = temp => (
        parseFloat(temp).toFixed(1)
    );

   const [filled, setFilled] = useState(false);

   const preferences = useContext(PreferencesContext);

   const submit = async () => {
      console.log(246);
      close();
   };

   return (
      <div class={style.modal}>
         <div class={style.container}>
            <div class={style.control}>
               <button class={style.cancel} type='button' onClick={close}>Close</button>
            </div>
            <h4>Date: {timelineDate.split("-")[2]}/{timelineDate.split("-")[1]}/{timelineDate.split("-")[0]}</h4>
            <h4>Time: {timestamp.time}</h4>
            <h4>Name: {timestamp.name}</h4>
            <h4>Location: {timestamp.location}</h4>
            <h4>Latitude: {timestamp.latitude}</h4>
            <h4>Longitude: {timestamp.longitude}</h4>
            <h4>Temperature: {oneDecimal(preferences.temperatureMeasurement == 'celsius' ? timestamp.temperature : (timestamp.temperature * 9/5) + 32)}{preferences.temperatureMeasurement == 'celsius' ? "°C" : "°F"}</h4>
            <h4>Conditions: {timestamp.conditions}</h4>
         </div>
      </div>
   );
};

export default Modal;