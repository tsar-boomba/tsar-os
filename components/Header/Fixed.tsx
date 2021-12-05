import { useEffect, useState } from 'react';
import Header from '.';
import styles from './Header.module.scss';

const Fixed = () => {
	const [top, setTop] = useState(true);

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY > 150) {
				setTop(false);
			} else {
				setTop(true);
			}
		};

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<div style={{ top: top ? -100 : 0 }} className={styles.fixed}>
			<Header />
		</div>
	);
};

export default Fixed;
