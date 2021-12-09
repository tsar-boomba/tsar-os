import { useContext, useEffect, useRef, useState } from 'react';
import { AppsContext } from '../../context/AppsContext';
import Resizers from './Resizers';
import styles from './Window.module.scss';

export interface AppProps {
	appSettings: {
		minimized: boolean;
	};
	setAppSettings: React.Dispatch<React.SetStateAction<AppProps['appSettings']>>;
	closeWindow: () => void;
	minimizeWindow: () => void;
	windowRef: React.RefObject<HTMLDivElement>;
}

export interface TitleBarProps {
	content: string;
	closeWindow: () => void;
	minimizeWindow: () => void;
	titleBarRef: React.RefObject<HTMLDivElement>;
	windowRef: React.RefObject<HTMLDivElement>;
}

interface Props {
	App: React.VFC<AppProps>;
	TitleBar: React.VFC<TitleBarProps>;
	appData: {
		name: string;
		icon: string;
	};
}

const Window: React.VFC<Props> = ({ App, TitleBar, appData }) => {
	const { opened, setOpened } = useContext(AppsContext);
	const [appSettings, setAppSettings] = useState<AppProps['appSettings']>({
		minimized: false,
	});
	const titleBarRef = useRef<HTMLDivElement>(null);
	const windowRef = useRef<HTMLDivElement>(null);
	const [windowIndex, setWindowIndex] = useState(
		opened.findIndex((app) => app.name === appData.name),
	);

	// updating this window's zIndex when opened changes
	useEffect(() => setWindowIndex(opened.findIndex((app) => app.name === appData.name)), [opened]);

	const closeWindow = () => {
		const newOpened = [...opened];
		newOpened.splice(windowIndex, 1);
		setOpened(newOpened);
	};

	const minimizeWindow = () => {};

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
				content={appData.name}
				closeWindow={closeWindow}
				minimizeWindow={minimizeWindow}
				titleBarRef={titleBarRef}
				windowRef={windowRef}
			/>
			<App
				appSettings={appSettings}
				setAppSettings={setAppSettings}
				closeWindow={closeWindow}
				minimizeWindow={minimizeWindow}
				windowRef={windowRef}
			/>

			{/* Window resizers */}
			<Resizers windowRef={windowRef} />
		</div>
	);
};

export default Window;
