import { useEffect, useState } from 'react';
import OSContext from './context/OSContext';
import Desktop from './Desktop';
import Mobile from './Mobile';
import styles from './OS.module.scss';

const OS = () => {
	const [screenWidth, setScreenWidth] = useState<number | null>(null);
	useEffect(() => setScreenWidth(window.innerWidth), []);

	if (screenWidth === null) return <p>loading...</p>;

	return (
		<OSContext>
			<div className={styles.container}>{screenWidth > 800 ? <Desktop /> : <Mobile />}</div>
		</OSContext>
	);
};

export default OS;
