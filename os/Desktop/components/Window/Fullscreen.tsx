import { useContext, useEffect } from 'react';
import { AppsContext } from '../../context/AppsContext';
import { BaseProps } from './Window';

const Fullscreen: React.VFC<BaseProps & { name: string }> = ({
	data,
	setData,
	name,
	windowRef,
}) => {
	const { opened } = useContext(AppsContext);

	useEffect(() => {
		const isFirstRender = data.last.height === '';
		const thisAppIndex = opened.findIndex((app) => app.name === name);
		if (!windowRef.current) throw new Error('No window element found on ref.');
		const windowEl = windowRef.current;

		const styles = getComputedStyle(windowEl);
		// have to set these in inline or else transition don't work
		windowEl.style.left = styles.left;
		windowEl.style.top = styles.top;
		windowEl.style.width = styles.width;
		windowEl.style.height = styles.height;

		const resetTransition = () => (windowEl.style.transition = '');
		windowEl.addEventListener('transitionend', resetTransition);

		console.log('fullscween');

		if (data.fullscreen) {
			windowEl.style.transition =
				'top 0.2s ease, left 0.2s ease, width 0.2s ease, height 0.2s ease';

			// saving last position
			setData({
				...data,
				last: {
					top: styles.top,
					left: styles.left,
					width: styles.width,
					height: styles.height,
				},
			});

			windowEl.style.top = '0px';
			windowEl.style.left = '0px';
			windowEl.style.width = '100%';
			windowEl.style.height = '100%';
		} else {
			if (!isFirstRender) {
				windowEl.style.transition =
					'top 0.2s ease, left 0.2s ease, width 0.2s ease, height 0.2s ease';
				// returning to last position
				windowEl.style.left = data.last.left;
				windowEl.style.top = data.last.top;
				windowEl.style.width = data.last.width;
				windowEl.style.height = data.last.height;
			}
		}

		return () => windowEl.removeEventListener('transitionend', resetTransition);
	}, [data.fullscreen]);

	return <></>;
};

export default Fullscreen;
