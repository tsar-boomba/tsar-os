import { useContext, useRef, useState } from 'react';
import { AppsContext } from '../../context/AppsContext';
import Resizers from './Resizers';
import styles from './Window.module.scss';

export interface AppProps {
	appSettings: {
		width: number;
		height: number;
	};
	setAppSettings: React.Dispatch<React.SetStateAction<AppProps['appSettings']>>;
	closeApp: () => void;
	windowRef: React.RefObject<HTMLDivElement>;
}

export interface TitleBarProps {
	content: string;
	closeApp: () => void;
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
	const [appSettings, setAppSettings] = useState<AppProps['appSettings']>({
		width: 1000,
		height: 600,
	});
	const titleBarRef = useRef<HTMLDivElement>(null);
	const windowRef = useRef<HTMLDivElement>(null);
	const { opened, setOpened } = useContext(AppsContext);
	console.log(opened);

	const closeApp = () => {
		const thisAppIndex = opened.findIndex((app) => app.name === appData.name);
		const newOpened = [...opened];
		newOpened.splice(thisAppIndex, 1);
		setOpened(newOpened);
		console.log(opened);
	};

	return (
		<div
			style={{ width: appSettings.width, height: appSettings.height }}
			className={styles.container}
			ref={windowRef}
		>
			<TitleBar
				content={appData.name}
				closeApp={closeApp}
				titleBarRef={titleBarRef}
				windowRef={windowRef}
			/>
			<App
				appSettings={appSettings}
				setAppSettings={setAppSettings}
				closeApp={closeApp}
				windowRef={windowRef}
			/>

			{/* Window resizers */}
			<Resizers windowRef={windowRef} />
		</div>
	);
};

export default Window;
