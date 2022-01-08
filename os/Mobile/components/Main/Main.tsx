import { AppsContext } from '@/os/context/AppsContext';
import { useContext } from 'react';
import Frame from '../Frame';
import AppGrid from './AppGrid';
import styles from './Main.module.scss';
import StatusBar from './StatusBar';

const Main = () => {
	const { apps, opened } = useContext(AppsContext);

	return (
		<div className={styles.container}>
			<StatusBar />
			<AppGrid />
			{opened.map((app) => {
				const thisAppIndex = apps.findIndex((appDef) => appDef.name === app.name);
				const passedApp = {
					App: app.component,
					setData: apps[thisAppIndex].setData,
					data: apps[thisAppIndex].data,
					name: app.name,
					icon: app.icon,
				};

				return <Frame key={app.name} {...passedApp} />;
			})}
		</div>
	);
};

export default Main;
