import { useEffect, useState, useContext } from 'preact/hooks';
import parseWeatherCode from '../Event/parseCode';
import { PreferencesContext } from '../../shared/context/preferences-context';
import { usePreferences } from '../../shared/hooks/preferences-hook';
import axios from 'axios';
import style from './style.css';

const Modal = ({ timestamp, close, timelineDate }) => {
   // Takes a number that's defined as a string and turns it into a decimal
   // number that's rounded to one decimal place.
   const oneDecimal = temp => (
      parseFloat(temp).toFixed(1)
   );

   // Gets the preferences context along with it's attributes
   // and their values.
   const preferences = useContext(PreferencesContext);

   return (
      <div class={style.modal}>
         <div class={style.container}>
            <div class={style.control}>
               <button class={style.cancel} type='button' onClick={close}>Close</button>
            </div>
            <span>Date: {timelineDate.split("-")[2]}/{timelineDate.split("-")[1]}/{timelineDate.split("-")[0]}</span>
            <span>Time: {timestamp.time}</span>
            <span>Name: {timestamp.name}</span>
            <span>Location: {timestamp.location}</span>
            <span>Latitude: {timestamp.latitude}</span>
            <span>Longitude: {timestamp.longitude}</span>
            <span>Temperature: {oneDecimal(preferences.temperatureMeasurement == 'celsius' ? timestamp.temperature : (timestamp.temperature * 9/5) + 32)}{preferences.temperatureMeasurement == 'celsius' ? "°C" : "°F"}</span>
            <span>Conditions: {timestamp.conditions}</span>
         </div>
      </div>
   );
};

export default Modal;