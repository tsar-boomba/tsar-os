import Main from './components/Main';
import Taskbar from './components/Taskbar';

const Desktop = () => {
	return (
		<div style={{ display: 'flex', flexFlow: 'column', width: '100%', height: '100%' }}>
			<Main />
			<Taskbar />
		</div>
	);
};

export default Desktop;
