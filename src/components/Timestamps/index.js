import { useEffect, useState } from 'preact/hooks';
import Event from '../Event';
import axios from 'axios';

const Timestamps = ({ timestamps, timelineDate }) => {
    // Defines state attribute and setter for fullTimestamps.
    const [fullTimestamps, setFullTimestamps] = useState([]);

    // Takes all the ids passed in which are ids for certain timestamps and then
    // gets and stores all the details for all those different timestamps.
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