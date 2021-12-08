import { useEffect, useState } from 'react';
import styles from './Taskbar.module.scss';

const Time = () => {
	const [date, setDate] = useState<Date>();
	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className={styles.time}>
			{date ? (
				<>
					<p>{date.toLocaleTimeString()}</p>
					<p>{date.toLocaleDateString()}</p>
				</>
			) : (
				'loading...'
			)}
		</div>
	);
};

export default Time;
