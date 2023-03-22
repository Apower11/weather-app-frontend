import { useEffect, useState, useContext } from 'preact/hooks';
import { useAuth } from '../../shared/hooks/auth-hooks';
import { AuthContext } from '../../shared/context/auth-context';
import style from './style.css';

const Sidebar = ({ close, complete }) => {
   const [time, setTime] = useState('');
   const [name, setName] = useState('');
   
   const [location, setLocation] = useState('');

   const {token, login, logout, user} = useAuth();

   const auth = useContext(AuthContext);

   const [filled, setFilled] = useState(false);

   useEffect(() => (
      setFilled(time !== '' && name !== '' && location !== '')
   ), [time, name, location]);

   const submit = () => {
      auth.logout();
      close();
   };

   const closeModal = () => {
    close();
   }

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
            <div>
               <div class={style.control}>
                  {/* <button class={style.cancel} type='button' onClick={close}>Cancel</button> */}
                  <button class={style.add} type='button' onClick={closeModal}><span class="material-symbols-outlined">close</span></button>
               </div>

               {token ? <button class={style.submitButton} onClick={submit}>Logout</button> : undefined}
            </div>

            <div>
               <a href='https://github.com/bennoprice/weatherapp'>GitHub</a>
               <span>Copyright &copy; 2022</span>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;