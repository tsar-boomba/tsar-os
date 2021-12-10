import { useContext, useEffect, useRef, useState } from 'react';
import { AppsContext, OSApp } from '../../context/AppsContext';
import Minimizer from './Minimizer';
import Resizers from './Resizers';
import styles from './Window.module.scss';

export interface BaseProps {
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
	const closeWindow = () => {
		const newOpened = [...opened];
		newOpened.splice(windowIndex, 1);
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
	useEffect(() => setWindowIndex(opened.findIndex((app) => app.name === name)), [opened]);

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
			<TitleBar content={name} {...baseProps} />
			<App {...baseProps} />

			{/* Window resizers */}
			<Resizers windowRef={windowRef} />

			{/* Handles minimizing window */}
			<Minimizer {...baseProps} name={name} />
		</div>
	);
};

export default Window;
