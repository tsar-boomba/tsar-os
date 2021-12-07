import { useCallback, useContext } from 'react';
import { AppsContext } from '../../context/AppsContext';
import styles from './Taskbar.module.scss';

interface Props {
	name: string;
	icon: string;
}

const AppIcon: React.VFC<Props> = ({ name, icon }) => {
	const { apps, opened, setOpened } = useContext(AppsContext);

	const handleIconClick = useCallback(() => {
		const thisApp = apps.find((app) => app.name === name);
		if (!thisApp) throw new Error('This app was not found in the context.');

		// if an app with this name is opened, do not proceed
		if (opened.find((app) => app.name === thisApp.name)) return;

		setOpened([...opened, thisApp]);
	}, [opened]);

	return (
		<div onClick={handleIconClick} className={styles['app-icon']}>
			{name}
		</div>
	);
};

export default AppIcon;
