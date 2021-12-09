import { useContext, useEffect, useRef, useState } from 'react';
import { AppsContext, OSApp } from '../../context/AppsContext';
import Resizers from './Resizers';
import styles from './Window.module.scss';

export interface AppProps {
	appSettings: {
		minimized: boolean;
		fullscreen: boolean;
	};
	setAppSettings: React.Dispatch<React.SetStateAction<AppProps['appSettings']>>;
	closeWindow: () => void;
	windowRef: React.RefObject<HTMLDivElement>;
	data: OSApp['data'];
}

export interface TitleBarProps {
	content: string;
	closeWindow: () => void;
	titleBarRef: React.RefObject<HTMLDivElement>;
	windowRef: React.RefObject<HTMLDivElement>;
	data: OSApp['data'];
}

interface Props {
	App: React.VFC<AppProps>;
	TitleBar: React.VFC<TitleBarProps>;
	name: string;
	icon: string;
	data: OSApp['data'];
}

const Window: React.VFC<Props> = ({ App, TitleBar, name, icon, data }) => {
	const { apps, opened, setOpened } = useContext(AppsContext);
	const [appSettings, setAppSettings] = useState<AppProps['appSettings']>({
		minimized: false,
		fullscreen: false,
	});
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
		let lastBottom = '';
		let lastLeft = '';
		if (data.minimized) {
			console.log('minimizing');
			if (!windowRef.current) throw new Error('No window element found on ref.');
			const windowEl = windowRef.current;
			const thisAppIndex = apps.findIndex((app) => app.name === name);
			const LOGO_WIDTH = 36;
			const APP_LOGO_WIDTH = 46;
			const targetX = LOGO_WIDTH + (thisAppIndex + 1) * (APP_LOGO_WIDTH / 2);
			lastBottom = windowEl.style.bottom;
			lastLeft = windowEl.style.left;

			for (let i = 0; i < 1000; i++) {
				windowEl.style.left = `${parseInt(windowEl.style.left) / 2}px`;
				windowEl.style.bottom = `${parseInt(windowEl.style.bottom) / 2}px`;
				windowEl.style.transform = `scale(${parseInt(windowEl.style.scale) / 2})`;
			}

			windowEl.style.left = `${targetX}px`;
			windowEl.style.bottom = '0px';
			windowEl.style.transform = 'scale(0)';
		} else {
			if (!windowRef.current) throw new Error('No window element found on ref.');
			const windowEl = windowRef.current;
			windowEl.style.left = lastLeft;
			windowEl.style.bottom = lastBottom;
			windowEl.style.transform = 'scale(1)';
		}
	}, [data]);

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
			/>
			<App
				appSettings={appSettings}
				setAppSettings={setAppSettings}
				closeWindow={closeWindow}
				windowRef={windowRef}
				data={data}
			/>

			{/* Window resizers */}
			<Resizers windowRef={windowRef} />
		</div>
	);
};

export default Window;
