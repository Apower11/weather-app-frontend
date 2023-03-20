import { Router } from 'preact-router';
import Timeline from '../Timeline';
import Layout from '../Layout';
import NotFound from '../404';
import style from './style.css';

const App = () => (
	<div class={style.app}>
		<Layout>
			<Router>
				<Timeline path="/" />
				<NotFound default />
			</Router>
		</Layout>
	</div>
);

export default App;
