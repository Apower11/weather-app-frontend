import './style.css';
import Sidebar from '../../Sidebar';
import { useState } from 'preact/hooks';

const Header = () => {
   const [displaySidebar, setDisplaySidebar] = useState(false);
   return (
      <header>
      {displaySidebar ? <Sidebar close={() => setDisplaySidebar(false)} /> : undefined }
      <button onClick={() => setDisplaySidebar(!displaySidebar)} class='material-symbols-outlined'>menu</button>
      <button class='material-symbols-outlined'>tune</button>
      </header>
   )
   };

export default Header;