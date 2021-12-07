import { useRef, useState } from 'react';
import Resizers from './Resizers';
import styles from './Window.module.scss';

export interface AppProps {
	appSettings: {
		width: number;
		height: number;
	};
	setAppSettings: React.Dispatch<React.SetStateAction<AppProps['appSettings']>>;
	windowRef: React.RefObject<HTMLDivElement>;
}

interface Props {
	App: React.VFC<AppProps>;
	appData: {
		name: string;
		icon: string;
	};
}

const Window: React.VFC<Props> = ({ App, appData }) => {
	const [appSettings, setAppSettings] = useState<AppProps['appSettings']>({
		width: 1000,
		height: 600,
	});
	const windowRef = useRef<HTMLDivElement>(null);

	return (
		<div
			style={{ width: appSettings.width, height: appSettings.height }}
			className={styles.container}
			ref={windowRef}
		>
			<App appSettings={appSettings} setAppSettings={setAppSettings} windowRef={windowRef} />

			{/* Window resizers */}
			<Resizers windowRef={windowRef} />
		</div>
	);
};

export default Window;
