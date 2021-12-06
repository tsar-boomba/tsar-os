import { useEffect, useState } from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile';
import styles from './OS.module.scss';

const OS = () => {
	const [screenWidth, setScreenWidth] = useState<number | null>(null);
	useEffect(() => setScreenWidth(window.innerWidth), []);

	if (screenWidth === null) return <p>loading...</p>;

	return <div className={styles.container}>{screenWidth > 800 ? <Desktop /> : <Mobile />}</div>;
};

export default OS;
