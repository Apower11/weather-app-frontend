import { useEffect, useState } from 'preact/hooks';
import style from './style.css';

const Modal = ({ close, complete }) => {
   const [time, setTime] = useState('');
   const [name, setName] = useState('');
   const [location, setLocation] = useState('');

   const [filled, setFilled] = useState(false);

   useEffect(() => (
      setFilled(time !== '' && name !== '' && location !== '')
   ), [time, name, location]);

   const submit = () => {
      const [h, m] = time.split(':');

      getCoords(location).then(coords => (
         complete({
            time: { h: parseInt(h), m: parseInt(m) },
            name,
            coords: { lat: coords.lat, lng: coords.lng }
         })
      ));

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