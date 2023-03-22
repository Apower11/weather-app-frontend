import { useEffect, useState, useContext } from 'preact/hooks';
import { useAuth } from '../../shared/hooks/auth-hooks';
import { usePreferences } from '../../shared/hooks/preferences-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { PreferencesContext } from '../../shared/context/preferences-context';
import { Switch } from 'antd';
import style from './style.css';

const PreferencesSidebar = ({ close, complete }) => {
   const [time, setTime] = useState('');
   const [name, setName] = useState('');
   
   const [location, setLocation] = useState('');

   const { changeToCelsius, changeToFahrenheit, temperatureMeasurement } = usePreferences();

   const auth = useContext(AuthContext);
   const preferences = useContext(PreferencesContext);

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

   const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        if(checked) {
            preferences.changeToFahrenheit();
        } else {
            preferences.changeToCelsius();
        }
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
            <div>
               <div class={style.control}>
                  {/* <button class={style.cancel} type='button' onClick={close}>Cancel</button> */}
                  <button class={style.add} type='button' onClick={closeModal}><span class="material-symbols-outlined">close</span></button>
               </div>

               <div class={style.temperature_switch}>
                    <span>Celsius</span>
                    <Switch checked={preferences.temperatureMeasurement == 'fahrenheit'} onChange={onChange} />
                    <span>Fahrenheit</span>
               </div>
            </div>

            <div>
               <a href='https://github.com/bennoprice/weatherapp'>GitHub</a>
               <span>Copyright &copy; 2022</span>
            </div>
         </div>
      </div>
   );
};

export default PreferencesSidebar;