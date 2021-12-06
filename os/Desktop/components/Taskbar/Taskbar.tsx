import { AppsContext } from '@/os/context/AppsContext';
import { useContext } from 'react';
import AppIcon from './AppIcon';
import styles from './Taskbar.module.scss';

const Taskbar = () => {
	const apps = useContext(AppsContext);

	return (
		<div className={styles.wrapper}>
			<div className={styles.logo}>T</div>
			{apps.map((app, index) => (
				<AppIcon name={app.name} icon={app.icon} key={index} />
			))}
		</div>
	);
};

export default Taskbar;
