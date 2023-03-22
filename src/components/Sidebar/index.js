import { useEffect, useState, useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { useAuth } from '../../shared/hooks/auth-hooks';
import { AuthContext } from '../../shared/context/auth-context';
import style from './style.css';

const Sidebar = ({ close, complete }) => {
   // Gets the authentication context and all it's attributes along with
   // their values.
   const auth = useContext(AuthContext);

   // Logs the user out once once they click on the log out button.
   const submit = () => {
      auth.logout();
      close();
   };

   // Closes the sidebar.
   const closeModal = () => {
    close();
   }

   return (
      <div class={style.modal}>
         <div class={style.container}>
            <div>
               <div class={style.control}>
                  {/* <button class={style.cancel} type='button' onClick={close}>Cancel</button> */}
                  <button class={style.add} type='button' onClick={closeModal}><span class="material-symbols-outlined">close</span></button>
               </div>

               {auth.token && <button class={style.submitButton} onClick={submit}>Logout</button>}

               {!auth.token && <>
                  <button class={style.submitButton} onClick={() => { route('/login'); closeModal(); }}>Login</button>
                  <button class={style.submitButton} onClick={() => { route('/register'); closeModal(); }}>Register</button>
               </>}
            </div>

            <div>
               <a href='https://github.com/bennoprice/weatherapp'>GitHub</a>
               <span>Copyright &copy; 2023</span>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;