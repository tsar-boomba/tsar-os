import styles from './Main.module.scss';
import Image from 'next/image';
import defaultBackground from '@/public/images/default-desktop.jpg';

const Main = () => {
	return (
		<div className={styles.container}>
			<h1 style={{ margin: 0 }}>Main content</h1>
			<div className={styles.background}>
				<Image src={defaultBackground} layout='fill' alt='desktop background' />
			</div>
		</div>
	);
};

export default Main;
