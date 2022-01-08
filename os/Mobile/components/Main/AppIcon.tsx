import { AppsContext, OSApp } from '@/os/context/AppsContext';
import Image from 'next/image';
import { useContext } from 'react';
import styles from './Main.module.scss';

const AppIcon: React.VFC<OSApp> = ({ name, icon }) => {
	const { apps, opened, setOpened } = useContext(AppsContext);
	const thisApp = apps.find((app) => app.name === name);
	const handleIconClick = () => {
		if (!thisApp) return;
		setOpened([...opened, thisApp]);
		thisApp.setData({ ...thisApp.data, index: opened.length });
	};

	return (
		<div className={styles['app-icon-wrapper']}>
			<div onClick={handleIconClick} className={styles['app-icon']}>
				{icon ? (
					<Image src={icon} alt={`${name} icon`} width={30} height={30} />
				) : (
					<div
						style={{ width: 30, height: 30, borderRadius: 6, backgroundColor: 'white' }}
					/>
				)}
				<p>{name.length > 10 ? name.slice(0, 8) + '...' : name}</p>
			</div>
		</div>
	);
};

export default AppIcon;
