import Event from '../Event';
import Modal from '../Modal';
import Timestamps from '../Timestamps';
import CalendarModal from '../CalendarModal';
import config from '../../config';
import axios from 'axios';
import { route } from 'preact-router';
import style from './style.css';
import { useAuth } from '../../shared/hooks/auth-hooks';
import { usePreferences } from '../../shared/hooks/preferences-hook';
import { useState, useEffect } from 'preact/hooks';

const Timeline = ({timelineDate}) => {
   // Gets the details of the logged in user, along with their login token
   // and the login and logout functions from the useAuth() hook.
   const {token, login, logout, user} = useAuth();

   // Defines state attributes and setters
   const [value, setValue] = useState("");
   const [timelineId, setTimelineId] = useState("");
   const [timestamps, setTimestamps] = useState([]);
   const [year, setYear] = useState('0');
   const [month, setMonth] = useState('None');
   const [monthNumber, setMonthNumber] = useState('0');
   const [day, setDay] = useState('0');
   const [modal, setModal] = useState(false);
   const [calendarModal, setCalendarModal] = useState(false);

   // Gets the name of a month by the number passed in.
   const getMonthFromNumber = (monthNumber) => {
      let returnedMonth = '';
      switch(monthNumber){
         case '01':
            returnedMonth = 'January';
            break;
         case '02':
            returnedMonth = 'February';
            break;
         case '03':
            returnedMonth = 'March';
            break;
         case '04':
            returnedMonth = 'April';
            break;
         case '05':
            returnedMonth = 'May';
            break;
         case '06':
            returnedMonth = 'June';
            break;
         case '07':
            returnedMonth = 'July';
            break;
         case '08':
            returnedMonth = 'August';
            break;
         case '09':
            returnedMonth = 'September';
            break;
         case '10':
            returnedMonth = 'October';
            break;
         case '11':
            returnedMonth = 'November';
            break;
         case '12':
            returnedMonth = 'December';
            break;
         default:
            returnedMonth = 'None';
      }
      return returnedMonth;
   }

   // Sets the timeline date if it's not defined and also stores the day, month
   // and year of the timeline date in the appropriate state variables.
   if(timelineDate){
      setYear(timelineDate.split('-')[0]);
      setMonthNumber(timelineDate.split('-')[1]);
      setDay(timelineDate.split('-')[2]);
      let currentMonth = getMonthFromNumber(timelineDate.split('-')[1]);
      setMonth(currentMonth);
   } else {
      let todaysDate = new Date();
      let correctDay = todaysDate.getDate().toString().padStart(2, '0');
      let correctMonthNumber = (todaysDate.getUTCMonth() + 1).toString().padStart(2, '0');
      let correctYear = todaysDate.getFullYear();
      let correctMonth = getMonthFromNumber(correctMonthNumber);
      setDay(correctDay);
      setYear(correctYear);
      setMonthNumber(correctMonthNumber);
      setMonth(correctMonth);
      timelineDate = `${correctYear}-${correctMonthNumber}-${correctDay}`;
   }

   // Creates a timeline for the logged in user on the current date the user is on
   // if it doesn't exist, otherwise it just gets the existing timeline. Then it gets the ids
   // for all the timestamps of that timeline.
   const getResponseData = async () => {
      let currentUserId = await user._id;
      if(user._id != undefined){
         const response = await axios.get(`${config.api}timeline/getTimeline/${user._id}/${timelineDate}`);
         if(response.data.timeline == undefined){
            await axios.post(config.api + 'timeline/createTimeline', {
               date: timelineDate,
               userLoggedIn: currentUserId
            }).then(res => {
               setTimestamps([]);
               setTimelineId(res.data.timeline._id);
            }).catch(err => {
               console.log(err);
            })
         } else {
            setTimestamps(response.data.timestamps);
            setTimelineId(response.data.timeline._id);
         }
      }
   }

   // Gets the necessary data for the timeline once this component renders.
   useEffect(() => {
      getResponseData();
   }, [value, timelineDate]);

   useEffect(() => {
      setValue("value");
   }, [timestamps])

   // Takes the user to the day after the date of the current timeline, and then
   // loads the timeline for that day.
   const goToNextDay = () => {
      let currentDate = new Date( `${year}-${monthNumber}-${day}`);
      currentDate.setDate(currentDate.getDate() + 1);
      let correctDay = currentDate.getDate().toString().padStart(2, '0');
      let correctMonth = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0');
      let correctYear = currentDate.getFullYear();
      timelineDate = `${correctYear}-${correctMonth}-${correctDay}`;
      route('/timeline/' + `${correctYear}-${correctMonth}-${correctDay}`, true);
   }

   // Takes the user to the day before the date of the current timeline, and then
   // loads the timeline for that day.
   const goToPreviousDay = () => {
      let currentDate = new Date( `${year}-${monthNumber}-${day}`);
      currentDate.setDate(currentDate.getDate() - 1);
      let correctDay = currentDate.getDate().toString().padStart(2, '0');
      let correctMonth = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0');
      let correctYear = currentDate.getFullYear();
      route('/timeline/' + `${correctYear}-${correctMonth}-${correctDay}`, true);
   }

   // Adds the timestamp (or event) to the timestamps of the current timeline.
   const addEvent = e => {
      const arr = [...timestamps, e._id];
      
      setTimestamps(arr);
      getResponseData();
   };

   if (timestamps.length == 0) {
      return (
         <div class={style.timeline}>
            <div class={style.connected}>
               <div class={style.date}>
                  <button onClick={() => goToPreviousDay()} class="material-symbols-outlined">chevron_left</button>
                  <button class={style.calender} onClick={() => setCalendarModal(true)}>{day} {month} {year}</button>
                  <button onClick={() => goToNextDay()} class="material-symbols-outlined">chevron_right</button>
               </div>
            </div>

            <div class={style.connected}>
               <span class={style.tutorial}>Create a new timeline below!</span>
            </div>

            <div class={style.connected}>
               <button class={style.add} type='button' onClick={() => setModal(true)}>+</button>
            </div>

            {modal && <Modal close={() => setModal(false)} complete={addEvent} timelineId={timelineId} timelineDate={timelineDate} />}
            {calendarModal && <CalendarModal close={() => setCalendarModal(false)} complete={addEvent} />}
         </div>
      );
   }

   return (
      <div class={style.timeline}>
         <div class={style.connected}>
            <div class={style.left} />
            <div class={style.date + ' ' + style.offset}>
               <button onClick={() => goToPreviousDay()} class="material-symbols-outlined">chevron_left</button>
               <button class={style.calender} onClick={() => setCalendarModal(true)}>{ day } { month } { year }</button>
               <button onClick={() => goToNextDay()} class="material-symbols-outlined">chevron_right</button>
            </div>
            <div class={style.right} />
         </div>
         
         <Timestamps class={style.container} timestamps={timestamps} timelineDate={timelineDate} />

         <div class={style.connected}>
            <div class={style.left} />
            <button class={style.add + ' ' + style.offset} type='button' onClick={() => setModal(true)}>+</button>
            <div class={style.right} />
         </div>

         {modal && <Modal close={() => setModal(false)} complete={addEvent} timelineId={timelineId} timelineDate={timelineDate} /> }
         {calendarModal && <CalendarModal close={() => setCalendarModal(false)} complete={addEvent} /> }
      </div>
   );
};

export default Timeline;