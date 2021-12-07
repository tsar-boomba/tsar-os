import styles from './Main.module.scss';
import Image from 'next/image';
import defaultBackground from '@/public/images/default-desktop.jpg';
import { useContext } from 'react';
import { AppsContext } from '../../context/AppsContext';
import Window from '../Window';
import DefaultTitleBar from '../Window/DefaultTitleBar';

const Main = () => {
	const { opened } = useContext(AppsContext);

	return (
		<div className={styles.container}>
			{opened.map((App, index) => (
				<Window
					App={App.component}
					TitleBar={App.titleBarComponent || DefaultTitleBar}
					appData={{ name: App.name, icon: App.icon }}
					key={index}
				/>
			))}
			<div className={styles.background}>
				<Image src={defaultBackground} layout='fill' alt='desktop background' />
			</div>
		</div>
	);
};

export default Main;
