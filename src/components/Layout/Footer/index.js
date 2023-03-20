import style from './style.css';

const Footer = () => (
   <footer>
      <div class={style.nav}>
         <span class={style.dot} />
         <span class={style.dot + ' ' + style.active} />
         <span class={style.dot} />
         <span class={style.dot} />
         <span class={style.dot} />
         <span class={style.dot} />
      </div>
   </footer>
);

export default Footer;