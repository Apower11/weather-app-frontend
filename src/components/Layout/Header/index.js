import './style.css';
import Sidebar from '../../Sidebar';
import PreferencesSidebar from '../../PreferencesSidebar';
import { useAuth } from '../../../shared/hooks/auth-hooks';
import { AuthContext } from '../../../shared/context/auth-context';
import { useState, useContext } from 'preact/hooks';

const Header = () => {
   // Defines state attributes and methods along with introducing the
   // authentication context and the attributes stored within it along
   // with their values.
   const [displaySidebar, setDisplaySidebar] = useState(false);
   const [displayPreferencesSidebar, setDisplayPreferencesSidebar] = useState(false);
   const auth = useContext(AuthContext);
   return (
      <header>
      {displaySidebar ? <Sidebar close={() => setDisplaySidebar(false)} /> : undefined }
      {displayPreferencesSidebar ? <PreferencesSidebar close={() => setDisplayPreferencesSidebar(false)} /> : undefined }
      <button onClick={() => setDisplaySidebar(!displaySidebar)} class='material-symbols-outlined'>menu</button>
      {auth.token ? <button onClick={() => setDisplayPreferencesSidebar(!displayPreferencesSidebar)} class='material-symbols-outlined'>tune</button> : undefined}
      </header>
   )
   };

export default Header;