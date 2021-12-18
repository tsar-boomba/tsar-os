import { OSApp } from '@/os/context/AppsContext';
import Image from 'next/image';
import styles from './Main.module.scss';

const AppIcon: React.VFC<OSApp> = ({ name, icon }) => {
	return (
		<div className={styles['app-icon-wrapper']}>
			<div className={styles['app-icon']}>
				{icon ? (
					<Image src={icon} alt={`${name} icon`} width={30} height={30} />
				) : (
					<div
						style={{ width: 30, height: 30, borderRadius: 6, backgroundColor: 'white' }}
					/>
				)}
				<p>{name.length > 12 ? name.slice(0, 10) + '...' : name}</p>
			</div>
		</div>
	);
};

export default AppIcon;
