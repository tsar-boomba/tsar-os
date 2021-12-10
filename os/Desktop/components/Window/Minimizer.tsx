import { useContext, useEffect } from 'react';
import { AppsContext } from '../../context/AppsContext';
import { BaseProps } from './Window';

const Minimizer: React.VFC<BaseProps & { name: string }> = ({ windowRef, data, setData, name }) => {
	const { apps } = useContext(AppsContext);

	useEffect(() => {
		const isFirstRender = data.last.height === '';
		if (!windowRef.current) throw new Error('No window element found on ref.');
		const windowEl = windowRef.current;

		const styles = getComputedStyle(windowEl);
		// have to set these in inline or else transition don't work
		windowEl.style.left = styles.left;
		windowEl.style.top = styles.top;
		windowEl.style.width = styles.width;
		windowEl.style.height = styles.height;

		const removeTransition = () => (windowEl.style.transition = '');
		windowEl.addEventListener('transitionend', removeTransition);

		if (data.minimized) {
			windowEl.style.transition =
				'top 0.2s ease, left 0.2s ease, width 0.2s ease, height 0.2s ease';
			const thisAppIndex = apps.findIndex((app) => app.name === name);
			const LOGO_WIDTH = 36;
			const APP_ICON_WIDTH = 46;
			const targetX = LOGO_WIDTH + thisAppIndex * APP_ICON_WIDTH;

			// saving last position
			if (!data.fullscreen) {
				setData({
					...data,
					last: {
						top: styles.top,
						left: styles.left,
						width: styles.width,
						height: styles.height,
					},
				});
			}

			windowEl.style.left = `${targetX}px`;
			windowEl.style.top = '100%';
			windowEl.style.width = '0px';
			windowEl.style.height = '0px';
		} else {
			// if first render do nothing
			if (!isFirstRender) {
				windowEl.style.transition =
					'top 0.2s ease, left 0.2s ease, width 0.2s ease, height 0.2s ease';

				// if fullscreen return to fullscreen
				if (data.fullscreen) {
					windowEl.style.top = '0px';
					windowEl.style.left = '0px';
					windowEl.style.width = '100vw';
					windowEl.style.height = '100vh';
					return;
				}

				// returning to last position
				windowEl.style.left = data.last.left;
				windowEl.style.top = data.last.top;
				windowEl.style.width = data.last.width;
				windowEl.style.height = data.last.height;
			}
		}

		return () => windowEl.removeEventListener('transitionend', removeTransition);
	}, [data.minimized]);

	return <></>;
};

export default Minimizer;
