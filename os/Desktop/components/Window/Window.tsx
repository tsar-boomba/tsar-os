import { useContext, useEffect, useRef } from 'react';
import {
	AppProps,
	AppsContext,
	BaseProps,
	OSApp,
	TitleBarProps,
} from '../../../context/AppsContext';
import Fullscreen from './Fullscreen';
import Minimizer from './Minimizer';
import Resizers from './Resizers';
import styles from './Window.module.scss';

interface Props {
	App: React.VFC<AppProps> | React.ComponentType<AppProps>;
	TitleBar: React.VFC<TitleBarProps> | React.ComponentType<TitleBarProps>;
	name: string;
	icon: string | StaticImageData;
	setData: OSApp['setData'];
	data: OSApp['data'];
}

const Window: React.VFC<Props> = ({ App, TitleBar, name, icon, setData, data }) => {
	const { opened, setOpened } = useContext(AppsContext);
	const titleBarRef = useRef<HTMLDivElement>(null);
	const windowRef = useRef<HTMLDivElement>(null);
	const closeWindow = () => {
		const newOpened = [...opened];
		newOpened.splice(data.index, 1);
		setOpened(newOpened);
	};

	// base props to be passed to components
	const baseProps: BaseProps = {
		closeWindow,
		data,
		setData,
		titleBarRef,
		windowRef,
	};

	// updating this window's zIndex when opened changes
	useEffect(
		() => setData({ ...data, index: opened.findIndex((app) => app.name === name) }),
		[opened],
	);

	const handleFocus = () => {
		const tempOpened = [...opened];
		const thisWindow = tempOpened.splice(data.index, 1);
		const newOpened = [...tempOpened, thisWindow[0]];
		setOpened(newOpened);
	};

	return (
		<div
			style={{ zIndex: data.index }}
			onMouseDown={handleFocus}
			className={styles.container}
			ref={windowRef}
		>
			<TitleBar content={name} {...baseProps} />
			<App {...baseProps} />

			{/* Window resizers */}
			<Resizers windowRef={windowRef} />

			{/* Handles minimizing window */}
			<Minimizer {...baseProps} name={name} />

			{/* Handles fullscreen */}
			<Fullscreen {...baseProps} name={name} />
		</div>
	);
};

export default Window;
