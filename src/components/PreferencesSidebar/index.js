import { useEffect, useState, useContext } from 'preact/hooks';
import { useAuth } from '../../shared/hooks/auth-hooks';
import { usePreferences } from '../../shared/hooks/preferences-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { PreferencesContext } from '../../shared/context/preferences-context';
import { Switch } from 'antd';
import style from './style.css';

const PreferencesSidebar = ({ close, complete }) => {
   // Gets the preferences context along with it's attributes
   // and their values.
   const preferences = useContext(PreferencesContext);

   // Function for closing the modal
   const closeModal = () => {
    close();
   }

   // Changes the temperature measurement preference depending on
   // which one the user chooses on the switch input.
   const onChange = (checked) => {
        if(checked) {
            preferences.changeToFahrenheit();
        } else {
            preferences.changeToCelsius();
        }
    };

   return (
      <div class={style.modal}>
         <div class={style.container}>
            <div>
               <div class={style.control}>
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