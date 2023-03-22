import { useEffect, useState } from 'preact/hooks';
import parseWeatherCode from '../Event/parseCode';
import axios from 'axios';
import style from './style.css';

const Modal = ({ close, complete, timelineId, timelineDate }) => {
   const [time, setTime] = useState('');
   const [name, setName] = useState('');
   const [location, setLocation] = useState('');

   let theDate = new Date(timelineDate);
   let todaysDate = new Date(Date.now() - 604800000);
   // todaysDate = Date.now();
   todaysDate.setHours(0,0,0,0);

   console.log("Today's Date: " + todaysDate);
   console.log("The Date: " + theDate);

   let api = 'https://api.open-meteo.com/v1/forecast';

   if(theDate >= todaysDate){
      api = 'https://api.open-meteo.com/v1/forecast';
   } else {
      api = 'https://archive-api.open-meteo.com/v1/archive';
   }

   console.log(api);

   const [filled, setFilled] = useState(false);

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

   useEffect(() => (
      setFilled(time !== '' && name !== '' && location !== '')
   ), [time, name, location]);

   const submit = async () => {
      const [h, m] = time.split(':');
      console.log("Data 1: " + timelineId);

      getCoords(location).then(async coords => {
         console.log(`${api}?latitude=${coords.lat}&longitude=${coords.lng}&hourly=temperature_2m,weathercode&start_date=${timelineDate}&end_date=${timelineDate}`);
         jetch(`${api}?latitude=${coords.lat}&longitude=${coords.lng}&hourly=temperature_2m,weathercode&start_date=${timelineDate}&end_date=${timelineDate}`)
         .then(async e => {
              console.log(e);
              console.log(e.hourly.temperature_2m[2]);
              console.log(parseInt(time.split(":")[0]).toString());
              console.log(e.hourly.temperature_2m[parseInt(time.split(":")[0])]);
              console.log(parseWeatherCode(e.hourly.weathercode[parseInt(time.split(":")[0])], time));
              await axios.post('https://weatherapp-group34-backend-api.herokuapp.com/timeline/createTimestamp', {
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
         });
      // complete({});
      close();
   };

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

            <input type='time' placeholder='Name' value={time} onInput={e => setTime(e.target.value)} />
            <input type='text' placeholder='Name' value={name} onInput={e => setName(e.target.value)} />
            <input type='text' placeholder='Location' value={location} onInput={e => setLocation(e.target.value)} />
         </div>
      </div>
   );
};

export default Modal;