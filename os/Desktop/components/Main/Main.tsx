import styles from './Main.module.scss';
import Image from 'next/image';
import defaultBackground from '@/public/images/default-desktop.jpg';
import { useContext } from 'react';
import { AppsContext } from '../../../context/AppsContext';
import Window from '../Window';
import DefaultTitleBar from '../Window/DefaultTitleBar';

const Main = () => {
	const { opened, apps } = useContext(AppsContext);

	return (
		<div className={styles.container}>
			{opened.map(({ component, titleBarComponent, name, icon }) => {
				const thisAppIndex = apps.findIndex((app) => app.name === name);

				return (
					<Window
						App={component}
						TitleBar={titleBarComponent || DefaultTitleBar}
						name={name}
						icon={icon}
						setData={apps[thisAppIndex].setData}
						data={apps[thisAppIndex].data}
						key={name}
					/>
				);
			})}
			<div className={styles.background}>
				<Image
					src={defaultBackground}
					layout='fill'
					priority={true}
					alt='desktop background'
				/>
			</div>
		</div>
	);
};

export default Main;
