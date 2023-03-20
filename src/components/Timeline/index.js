import Event from '../Event';
import Modal from '../Modal';
import style from './style.css';
import { useState } from 'preact/hooks';

const Timeline = () => {
   const [events, setEvents] = useState([
      { name: "Home",         time: { h: 7,  m: 15 }, coords: { lat: 51.54, lng: -0.13 } },
      { name: "University",   time: { h: 9,  m: 0  }, coords: { lat: 51.54, lng: -0.13 } },
      { name: "Riyadh",       time: { h: 12, m: 5  }, coords: { lat: 24.71, lng: 46.67 } },
      { name: "Oslo",         time: { h: 12, m: 45 }, coords: { lat: 59.91, lng: 10.75 } },
      { name: "Seoul",        time: { h: 22, m: 45 }, coords: { lat: 37.56, lng: 126.97 } }
   ]);

   const [modal, setModal] = useState(false);

   const addEvent = e => {
      const arr = [...events, {
         name: e.name,
         time: e.time,
         coords: e.coords
      }];

      arr.sort((a, b) => {
         if (a.time.h === b.time.h)
            return a.time.m - b.time.m;
         return a.time.h - b.time.h;
      });
      
      setEvents(arr);

   };

   return (
      <div class={style.timeline}>
         <div class={style.container}>
            { events.map(e => (
               <Event data={e}/>
            )) }
         </div>

         <div class={style.add}>
            <div class={style.left}>
               <button type='button' onClick={() => setModal(true)}>+</button>
            </div>
            <div class={style.right}></div>
         </div>

         {modal && <Modal close={() => setModal(false)} complete={addEvent} /> }
      </div>
   );
};

export default Timeline;