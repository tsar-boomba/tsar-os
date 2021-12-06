import { useState } from 'react';
import styles from 'Window.module.scss';

export interface AppProps {
	appSettings: {
		draggable: boolean;
		defaultWidth: number;
		defaultHeight: number;
	};
	setAppSettings: React.Dispatch<React.SetStateAction<AppProps['appSettings']>>;
}

interface Props {
	App: React.FC<AppProps> | React.VFC<AppProps>;
}

const Window: React.VFC<Props> = ({ App }) => {
	const [appSettings, setAppSettings] = useState<AppProps['appSettings']>({
		draggable: true,
		defaultWidth: 600,
		defaultHeight: 400,
	});

	return (
		<div className={styles.container}>
			<App appSettings={appSettings} setAppSettings={setAppSettings} />
		</div>
	);
};

export default Window;
