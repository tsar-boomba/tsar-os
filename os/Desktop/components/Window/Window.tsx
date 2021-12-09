import { useContext, useEffect, useRef, useState } from 'react';
import { AppsContext, OSApp } from '../../context/AppsContext';
import Resizers from './Resizers';
import styles from './Window.module.scss';

export interface AppProps {
	closeWindow: () => void;
	titleBarRef: React.RefObject<HTMLDivElement>;
	windowRef: React.RefObject<HTMLDivElement>;
	data: OSApp['data'];
	setData: OSApp['setData'];
}

export interface TitleBarProps {
	content: string;
	closeWindow: () => void;
	titleBarRef: React.RefObject<HTMLDivElement>;
	windowRef: React.RefObject<HTMLDivElement>;
	data: OSApp['data'];
	setData: OSApp['setData'];
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
		if (data.minimized) {
			console.log('minimizing');
			if (!windowRef.current) throw new Error('No window element found on ref.');
			const windowEl = windowRef.current;
			const thisAppIndex = apps.findIndex((app) => app.name === name);
			const LOGO_WIDTH = 36;
			const APP_ICON_WIDTH = 46;
			const targetX = LOGO_WIDTH + (thisAppIndex + 1) * (APP_ICON_WIDTH / 2);

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

			windowEl.style.transition = 'top 0.3s ease, bottom 0.3s ease, transform 0.3s ease';

			windowEl.style.left = `${targetX}px`;
			windowEl.style.top = '100%';
			windowEl.style.transform = 'scale(0)';

			windowEl.style.transition = '';
		} else {
			if (!windowRef.current) throw new Error('No window element found on ref.');
			const windowEl = windowRef.current;

			// returning to last position
			windowEl.style.left = data.last.left;
			windowEl.style.top = data.last.top;
			windowEl.style.width = data.last.width;
			windowEl.style.height = data.last.height;
			windowEl.style.transform = 'scale(1)';
		}
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
