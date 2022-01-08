import { AppProps, AppsContext, BaseProps, OSApp } from '@/os/context/AppsContext';
import { useContext, useRef } from 'react';
import styles from './Frame.module.scss';

interface Props {
	App: React.VFC<AppProps> | React.ComponentType<AppProps>;
	name: string;
	icon: string | StaticImageData;
	setData: OSApp['setData'];
	data: OSApp['data'];
}

const Frame: React.VFC<Props> = ({ App, name, icon, setData, data }) => {
	const { opened, setOpened } = useContext(AppsContext);
	const windowRef = useRef<HTMLDivElement>(null);
	const closeWindow = () => {
		const newOpened = [...opened];
		newOpened.splice(data.index, 1);
		setOpened(newOpened);
	};

	const baseProps: BaseProps = {
		closeWindow,
		data,
		setData,
		windowRef,
	};

	return (
		<div
			ref={windowRef}
			style={{ zIndex: data.index === opened.length - 1 ? 1 : '-9999' }}
			className={styles.container}
		>
			<App {...baseProps} />
		</div>
	);
};

export default Frame;
