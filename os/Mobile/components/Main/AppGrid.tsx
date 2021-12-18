import { AppsContext } from '@/os/context/AppsContext';
import { useContext } from 'react';
import AppIcon from './AppIcon';
import styles from './Main.module.scss';

const AppGrid = () => {
	const { apps } = useContext(AppsContext);

	return (
		<div className={styles['app-grid']}>
			{apps.map((app) => (
				<AppIcon {...app} key={app.name} />
			))}
			<p>extra cell</p>
			<p>extra cell</p>
			<p>extra cell</p>
			<p>extra cell</p>
			<p>extra cell</p>
			<p>extra cell</p>
			<p>extra cell</p>
		</div>
	);
};

export default AppGrid;
