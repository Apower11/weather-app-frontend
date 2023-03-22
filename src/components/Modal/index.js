import { useEffect, useState } from 'preact/hooks';
import parseWeatherCode from '../Event/parseCode';
import config from '../../config';
import axios from 'axios';
import style from './style.css';

const Modal = ({ close, complete, timelineId, timelineDate }) => {
   const [time, setTime] = useState('');
   const [name, setName] = useState('');
   const [location, setLocation] = useState('');
   const [showErrorMessage, setShowErrorMessage] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   const jetch = async url => {
      const res = await fetch(url);
      return await res.json();
   };

   // Uses the current date and date of the timeline to determine which
   // specific api to use for getting the weather details.
   let theDate = new Date(timelineDate);
   let todaysDate = new Date(Date.now() - 604800000);
   todaysDate.setHours(0,0,0,0);

   let api = 'https://api.open-meteo.com/v1/forecast';

   if(theDate >= todaysDate){
      api = 'https://api.open-meteo.com/v1/forecast';
   } else {
      api = 'https://archive-api.open-meteo.com/v1/archive';
   }

   // Checks that all the inputs of the modal have been filled and
   // only allows the user to submit their inputs if all input fields
   // have been filled.

   const [filled, setFilled] = useState(false);

   useEffect(() => (
      setFilled(time !== '' && name !== '' && location !== '')
   ), [time, name, location]);

   // Submit function which gets the weather details for a specific time and
   // location and then submits those details as a Timestamp object to a
   // MongoDB database.
   const submit = async () => {
      getCoords(location).then(async coords => {
            jetch(`${api}?latitude=${coords.lat}&longitude=${coords.lng}&hourly=temperature_2m,weathercode&start_date=${timelineDate}&end_date=${timelineDate}`).then(async e => {
              await axios.post(config.api + '/timeline/createTimestamp', {
               timelineId: timelineId,
               time: time,
               name: name,
               location: location,
               latitude: coords.lat.toString(),
               longitude: coords.lng.toString(),
               temperature: (e.hourly.temperature_2m[parseInt(time.split(":")[0])]).toString(),
               weatherCode: e.hourly.weathercode[parseInt(time.split(":")[0])],
               conditions: parseWeatherCode(e.hourly.weathercode[parseInt(time.split(":")[0])], time).name
            }).then(res => {
               console.log(res.data);
               complete({timestamp: res.data.timestamp});
            }).catch(err => {
               console.log(err);
            })
         });
         close();
         }).catch(err => {
            setErrorMessage("The location you entered is invalid. Please try again by typing in a valid location address.");
            setShowErrorMessage(true);
         });
   };

   // Gets the latitude and lognitude of a location based on a given
   // name. This is known as Geocoding.
   const getCoords = async address => {
      const geocoder = new google.maps.Geocoder();
      const res = await geocoder.geocode({address});

      return {
         lat: res.results[0].geometry.location.lat(),
         lng: res.results[0].geometry.location.lng()
      };
   };

   return (
      <div class={style.modal}>
         <div class={style.container}>
            <div class={style.control}>
               <button class={style.cancel} type='button' onClick={close}>Cancel</button>
               <button class={style.add} type='button' onClick={submit} disabled={!filled}>Add</button>
            </div>
            {showErrorMessage ? <h4>{errorMessage}</h4> : null}
            <input type='time' placeholder='Name' value={time} onInput={e => setTime(e.target.value)} />
            <input type='text' placeholder='Name' value={name} onInput={e => setName(e.target.value)} />
            <input type='text' placeholder='Location' value={location} onInput={e => setLocation(e.target.value)} />
         </div>
      </div>
   );
};

export default Modal;