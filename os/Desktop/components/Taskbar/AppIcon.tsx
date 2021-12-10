import { useContext } from 'react';
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
	const thisApp = apps.find((app) => app.name === name);
	if (!thisApp) throw new Error('This app was not found in the context.');
	const isOpen = typeof opened.find((app) => app.name === name) !== 'undefined';

	const defaultBGColor = isOpen && !thisApp.data.minimized ? '#8d8d8d' : '';

	const bringAppToFront = () => {
		const tempOpened = [...opened];
		const thisWindow = tempOpened.splice(thisApp.data.index, 1);
		const newOpened = [...tempOpened, thisWindow[0]];
		setOpened(newOpened);
	};

	const handleIconClick = () => {
		// if an app with this name is opened, do not proceed
		if (opened.find((app) => app.name === thisApp.name)) {
			if (thisApp.data.minimized) {
				bringAppToFront();
				return thisApp.setData({ ...thisApp.data, minimized: false });
			} else {
				return thisApp.setData({ ...thisApp.data, minimized: true });
			}
		}

		setOpened([...opened, thisApp]);
	};

	return (
		<div
			onClick={handleIconClick}
			className={styles['app-icon']}
			style={{ backgroundColor: defaultBGColor }}
			onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#a5a5a5')}
			onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = defaultBGColor)}
		>
			{icon.includes('https://') ? (
				<Image src={discordIcon} alt={`${name} icon`} width={30} height={30} />
			) : (
				name
			)}

			{isOpen && <div className={`${styles['bottom-border']}`} />}
		</div>
	);
};

export default AppIcon;
