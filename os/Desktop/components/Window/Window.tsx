import { useContext, useEffect, useRef, useState } from 'react';
import { AppsContext, OSApp } from '../../context/AppsContext';
import Resizers from './Resizers';
import styles from './Window.module.scss';

interface BaseProps {
	closeWindow: () => void;
	titleBarRef: React.RefObject<HTMLDivElement>;
	windowRef: React.RefObject<HTMLDivElement>;
	data: OSApp['data'];
	setData: OSApp['setData'];
}

export interface AppProps extends BaseProps {}

export interface TitleBarProps extends BaseProps {
	content: string;
}

interface Props {
	App: React.VFC<AppProps>;
	TitleBar: React.VFC<TitleBarProps>;
	name: string;
	icon: string | StaticImageData;
	setData: OSApp['setData'];
	data: OSApp['data'];
}

const Window: React.VFC<Props> = ({ App, TitleBar, name, icon, setData, data }) => {
	const { apps, opened, setOpened } = useContext(AppsContext);
	const titleBarRef = useRef<HTMLDivElement>(null);
	const windowRef = useRef<HTMLDivElement>(null);
	const [windowIndex, setWindowIndex] = useState(opened.findIndex((app) => app.name === name));

	// updating this window's zIndex when opened changes
	useEffect(() => setWindowIndex(opened.findIndex((app) => app.name === name)), [opened]);

	const closeWindow = () => {
		const newOpened = [...opened];
		newOpened.splice(windowIndex, 1);
		setOpened(newOpened);
	};

	// handling minimize state
	useEffect(() => {
		const isFirstRender = data.last.height === '';
		if (!windowRef.current) throw new Error('No window element found on ref.');
		const windowEl = windowRef.current;
		windowEl.style.transition =
			'top 0.2s ease, left 0.2s ease, width 0.2s ease, height 0.2s ease';

		const removeTransition = () => (windowEl.style.transition = '');
		windowEl.addEventListener('transitionend', removeTransition);

		if (data.minimized) {
			const thisAppIndex = apps.findIndex((app) => app.name === name);
			const LOGO_WIDTH = 36;
			const APP_ICON_WIDTH = 46;
			const targetX = LOGO_WIDTH + thisAppIndex * APP_ICON_WIDTH;

			// saving last position
			const styles = getComputedStyle(windowEl);
			setData({
				...data,
				last: {
					top: styles.top,
					left: styles.left,
					width: styles.width,
					height: styles.height,
				},
			});

			// have to set these in inline or else transition don't work
			windowEl.style.left = styles.left;
			windowEl.style.top = styles.top;
			windowEl.style.width = styles.width;
			windowEl.style.height = styles.height;

			windowEl.style.left = `${targetX}px`;
			windowEl.style.top = '100%';
			windowEl.style.width = '0px';
			windowEl.style.height = '0px';
		} else {
			// if first render do nothing
			if (!isFirstRender) {
				// returning to last position
				windowEl.style.left = data.last.left;
				windowEl.style.top = data.last.top;
				windowEl.style.width = data.last.width;
				windowEl.style.height = data.last.height;
			}
		}

		return () => windowEl.removeEventListener('transitionend', removeTransition);
	}, [data.minimized]);

	const handleFocus = () => {
		const tempOpened = [...opened];
		const thisWindow = tempOpened.splice(windowIndex, 1);
		const newOpened = [...tempOpened, thisWindow[0]];
		setOpened(newOpened);
	};

	return (
		<div
			style={{ zIndex: windowIndex }}
			onMouseDown={handleFocus}
			className={styles.container}
			ref={windowRef}
		>
			<TitleBar
				content={name}
				closeWindow={closeWindow}
				titleBarRef={titleBarRef}
				windowRef={windowRef}
				data={data}
				setData={setData}
			/>
			<App
				closeWindow={closeWindow}
				windowRef={windowRef}
				titleBarRef={titleBarRef}
				data={data}
				setData={setData}
			/>

			{/* Window resizers */}
			<Resizers windowRef={windowRef} />
		</div>
	);
};

export default Window;
