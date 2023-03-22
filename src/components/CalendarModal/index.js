import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import style from './style.css';

const CalendarModal = ({ close, complete }) => {
   const [date, setDate] = useState('');

   const [filled, setFilled] = useState(false);

   useEffect(() => (
      setFilled(date !== '' && location !== '')
   ), [date, location]);

   const submit = () => {

      route('/timeline/' + date, true);

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
               <button class={style.add} type='button' onClick={submit} disabled={!filled}>Choose</button>
            </div>
            <p>Select Date: </p>
            <input type='date' placeholder='Date' value={date} onInput={e => setDate(e.target.value)} />
         </div>
      </div>
   );
};

export default CalendarModal;