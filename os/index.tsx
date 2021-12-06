import { useEffect, useState } from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile/Mobile';

const OS = () => {
	const [screenWidth, setScreenWidth] = useState<number | null>(null);
	useEffect(() => setScreenWidth(window.innerWidth), []);

	if (screenWidth === null) return <p>loading...</p>;

	return <div>{screenWidth > 800 ? <Desktop /> : <Mobile />}</div>;
};

export default OS;
