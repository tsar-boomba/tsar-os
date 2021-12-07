import { useState } from 'react';
import styles from './Window.module.scss';

export interface AppProps {
	appSettings: {
		defaultWidth: number;
		defaultHeight: number;
	};
	setAppSettings: React.Dispatch<React.SetStateAction<AppProps['appSettings']>>;
}

interface Props {
	App: React.VFC<AppProps>;
}

const Window: React.VFC<Props> = ({ App }) => {
	const [appSettings, setAppSettings] = useState<AppProps['appSettings']>({
		defaultWidth: 1000,
		defaultHeight: 600,
	});

	return (
		<div
			style={{ width: appSettings.defaultWidth, height: appSettings.defaultHeight }}
			className={styles.container}
		>
			<App appSettings={appSettings} setAppSettings={setAppSettings} />
		</div>
	);
};

export default Window;
