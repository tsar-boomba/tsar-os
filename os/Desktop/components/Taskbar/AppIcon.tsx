import { useCallback, useContext } from 'react';
import { AppsContext } from '../../context/AppsContext';
import styles from './Taskbar.module.scss';
import Image from 'next/image';
import discordIcon from '@/public/images/discord-icon.ico';

interface Props {
	name: string;
	icon: string;
}

const AppIcon: React.VFC<Props> = ({ name, icon }) => {
	const { apps, opened, setOpened } = useContext(AppsContext);
	const isOpen = typeof opened.find((app) => app.name === name) !== 'undefined';

	const handleIconClick = useCallback(() => {
		const thisApp = apps.find((app) => app.name === name);
		if (!thisApp) throw new Error('This app was not found in the context.');

		// if an app with this name is opened, do not proceed
		if (opened.find((app) => app.name === thisApp.name)) return;

		setOpened([...opened, thisApp]);
	}, [opened]);

	return (
		<div
			onClick={handleIconClick}
			className={styles['app-icon']}
			style={{ backgroundColor: isOpen ? '#8d8d8d' : '' }}
			onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#a5a5a5')}
			onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isOpen ? '#8d8d8d' : '')}
		>
			{icon.includes('https://') ? (
				<Image src={discordIcon} alt={`${name} icon`} width={40} height={40} />
			) : (
				name
			)}

			{isOpen && <div className={`${styles['bottom-border']}`} />}
		</div>
	);
};

export default AppIcon;
