import { useRef, useState } from 'react';
import { handleResizeMouseDown } from './resize-events';
import Resizer from './Resizer';
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
			<Resizer
				onMouseDown={handleResizeMouseDown('top', windowRef)}
				style={{
					position: 'absolute',
					top: -5,
					left: 0,
					width: '100%',
					height: 5,
					cursor: 'ns-resize',
				}}
			/>
			<Resizer
				onMouseDown={handleResizeMouseDown('right', windowRef)}
				style={{
					position: 'absolute',
					top: 0,
					right: -5,
					height: '100%',
					width: 5,
					cursor: 'ew-resize',
				}}
			/>
			<Resizer
				onMouseDown={handleResizeMouseDown('bottom', windowRef)}
				style={{
					position: 'absolute',
					bottom: -5,
					left: 0,
					width: '100%',
					height: 5,
					cursor: 'ns-resize',
				}}
			/>
			<Resizer
				onMouseDown={handleResizeMouseDown('left', windowRef)}
				style={{
					position: 'absolute',
					top: 0,
					left: -5,
					height: '100%',
					width: 5,
					cursor: 'ew-resize',
				}}
			/>
		</div>
	);
};

export default Window;