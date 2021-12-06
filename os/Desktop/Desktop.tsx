import Main from './components/Main';
import Taskbar from './components/Taskbar';
import DesktopContext from './context/DesktopContext';

const Desktop = () => {
	return (
		<DesktopContext>
			<div style={{ display: 'flex', flexFlow: 'column', width: '100%', height: '100%' }}>
				<Main />
				<Taskbar />
			</div>
		</DesktopContext>
	);
};

export default Desktop;
