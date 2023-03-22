import Event from '../Event';
import Modal from '../Modal';
import Timestamps from '../Timestamps';
import CalendarModal from '../CalendarModal';
import config from '../../config';
import axios from 'axios';
import { route } from 'preact-router';
import style from './style.css';
import { useAuth } from '../../shared/hooks/auth-hooks';
import { useState, useEffect } from 'preact/hooks';

const Timeline = ({timelineDate}) => {
   const {token, login, logout, user} = useAuth();
   const [value, setValue] = useState("");
   const [timelineId, setTimelineId] = useState("");
   const [events, setEvents] = useState([
      { name: "Home",         time: { h: 7,  m: 15 }, coords: { lat: 51.54, lng: -0.13 } },
      { name: "University",   time: { h: 9,  m: 0  }, coords: { lat: 51.54, lng: -0.13 } },
      { name: "Riyadh",       time: { h: 12, m: 5  }, coords: { lat: 24.71, lng: 46.67 } },
      { name: "Oslo",         time: { h: 12, m: 45 }, coords: { lat: 59.91, lng: 10.75 } },
      { name: "Seoul",        time: { h: 22, m: 45 }, coords: { lat: 37.56, lng: 126.97 } }
   ]);
   const [timestamps, setTimestamps] = useState([]);
   const [displayedTimestamps, setDisplayedTimestamps] = useState([]);
   const [year, setYear] = useState('0');
   const [month, setMonth] = useState('None');
   const [monthNumber, setMonthNumber] = useState('0');
   const [day, setDay] = useState('0');
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

   const getResponseData = async () => {
      let currentUserId = await user._id;
      let returnedTimeline = null;
      if(user._id != undefined){
         const response = await axios.get(`${config.api}timeline/getTimeline/${user._id}/${timelineDate}`);
         returnedTimeline = JSON.stringify(response.data.timeline);
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

   useEffect(() => {
      getResponseData();
   }, [value, timelineDate]);

   useEffect(() => {
      setValue("value");
      setDisplayedTimestamps(timestamps);
   }, [timestamps])

   const goToNextDay = () => {
      let dayNumber = parseInt(day);
      let currentDate = new Date( `${year}-${monthNumber}-${day}`);
      currentDate.setDate(currentDate.getDate() + 1);
      let correctDay = currentDate.getDate().toString().padStart(2, '0');
      let correctMonth = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0');
      let correctYear = currentDate.getFullYear();
      timelineDate = `${correctYear}-${correctMonth}-${correctDay}`;
      route('/timeline/' + `${correctYear}-${correctMonth}-${correctDay}`, true);
   }

   const goToPreviousDay = () => {
      let dayNumber = parseInt(day);
      let currentDate = new Date( `${year}-${monthNumber}-${day}`);
      currentDate.setDate(currentDate.getDate() - 1);
      let correctDay = currentDate.getDate().toString().padStart(2, '0');
      let correctMonth = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0');
      let correctYear = currentDate.getFullYear();
      route('/timeline/' + `${correctYear}-${correctMonth}-${correctDay}`, true);
   }

   const [modal, setModal] = useState(false);
   const [calendarModal, setCalendarModal] = useState(false);

   const addEvent = e => {
      const arr = [...timestamps, e._id];
      
      setTimestamps(arr);
      getResponseData();
   };

   return (
      <div class={style.timeline}>
         <div class={style.dateNavigator}>
            <div class={style.left} />
            <div class={style.container}>
               <button onClick={() => goToPreviousDay()} class="material-symbols-outlined">chevron_left</button>
               <button class={style.calender} onClick={() => setCalendarModal(true)}>{ day } { month } { year }</button>
               <button onClick={() => goToNextDay()} class="material-symbols-outlined">chevron_right</button>
            </div>
            <div class={style.right} />
         </div>
         
         <Timestamps class={style.container} timestamps={timestamps} />

         <div class={style.add}>
            <div class={style.left} />
            <button type='button' onClick={() => setModal(true)}>+</button>
            <div class={style.right} />
         </div>

         {modal && <Modal close={() => setModal(false)} complete={addEvent} timelineId={timelineId} timelineDate={timelineDate} /> }
         {calendarModal && <CalendarModal close={() => setCalendarModal(false)} complete={addEvent} /> }
      </div>
   );
};

export default Timeline;