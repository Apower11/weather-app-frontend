import { useNavigate, useParams } from 'react-router-dom';
import './style.css';

const Timeline = () => {
   const params = useParams();
   const navigate = useNavigate();

   const onChange = offset => {
      navigate('/timeline/' + (+params.id + +offset)); // '+' to cast to int
   };

   return (
      <section id='timeline'>
         <h1>Timeline {params.id}</h1>

         <button onClick={ () => onChange(-1) }>prev</button>
         <button onClick={ () => onChange(+1) }>next</button>
      </section>
   )
};

export default Timeline;