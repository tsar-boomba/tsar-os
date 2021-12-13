import GestureBar from './components/GestureBar';
import Main from './components/Main';

const Mobile = () => {
	return (
		<div style={{ display: 'flex', flexFlow: 'column', width: '100%', height: '100%' }}>
			<Main />
			<GestureBar />
		</div>
	);
};

export default Mobile;
