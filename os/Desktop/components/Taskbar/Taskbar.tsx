import { AppsContext } from '@/os/context/AppsContext';
import { useContext } from 'react';
import AppIcon from './AppIcon';
import styles from './Taskbar.module.scss';
import Time from './Time';

const Taskbar = () => {
	const { apps } = useContext(AppsContext);

	return (
		<div className={styles.wrapper}>
			<div className={styles.logo}>T</div>
			<div className={styles['app-icon-wrapper']}>
				{apps.map((app, index) => (
					<AppIcon name={app.name} icon={app.icon} key={index} />
				))}
			</div>
			<Time />
		</div>
	);
};

export default Taskbar;
