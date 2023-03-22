import { useEffect, useState } from 'preact/hooks';
import Event from '../Event';
import axios from 'axios';
// import parseWeatherCode from '../Event/parseCode';
// import axios from 'axios';
// import style from './style.css';

const Timestamps = ({ timestamps, timelineDate }) => {
    const [fullTimestamps, setFullTimestamps] = useState([]);
    const [value, setValue] = useState("");

    const getTimestamps = () => {
        timestamps.map(async timestamp => {
            const response = await axios.get(`https://weatherapp-group34-backend-api.herokuapp.com/timeline/getTimestamp/${timestamp}`);
            let newFullTimestamps = [...fullTimestamps, response.data.timestamp];
            setFullTimestamps(newFullTimestamps);
        })
    }

    useEffect(() => {
        getTimestamps();
    }, [timestamps]);

   return (
    timestamps.map((item, index) => (
        <Event timelineDate={timelineDate} data={item}/>
     ))
   );
};

export default Timestamps;