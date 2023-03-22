import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import style from './style.css';

const CalendarModal = ({ close, complete }) => {
   const [date, setDate] = useState('');
   const [filled, setFilled] = useState(false);

   // Checks if the date input has been filled if so it
   // sets the filled state attribute to true, otherwise
   // it is set to false.
   useEffect(() => (
      setFilled(date !== '' && location !== '')
   ), [date, location]);

   // Takes the user to the day they defined in the calendar
   // input.
   const submit = () => {
      route('/timeline/' + date, true);

      close();
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