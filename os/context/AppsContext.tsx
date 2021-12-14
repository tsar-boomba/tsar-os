import { useState, createContext } from 'react';
import useCreateApp from './useCreateApp';
import dynamic from 'next/dynamic';

// importing app components
import discordIcon from '@/public/images/discord-icon.ico';

const Minesweeper = dynamic(() => import('../../os/apps/Minesweeper'));
import minesweeperIcon from '@/public/images/minesweeper-icon.png';

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

export interface OSApp {
	component: React.VFC<AppProps> | React.ComponentType<AppProps>;
	titleBarComponent?: React.VFC<TitleBarProps>;
	name: string;
	icon: string | StaticImageData;
	setData: React.Dispatch<React.SetStateAction<OSApp['data']>>;
	data: {
		index: number;
		minimized: boolean;
		fullscreen: boolean;
		last: {
			top: string;
			left: string;
			width: string;
			height: string;
		};
	};
}

interface appValues {
	apps: OSApp[];
	opened: OSApp[];
	setOpened: React.Dispatch<React.SetStateAction<appValues['opened']>>;
}

export const AppsContext = createContext<appValues>({ apps: [], opened: [], setOpened: () => {} });

const AppsContextProvider: React.FC = ({ children }) => {
	const apps = [
		useCreateApp({
			component: () => <p>discord</p>,
			name: 'discord',
			icon: discordIcon,
		}),
		useCreateApp({
			component: () => <p>chrome</p>,
			name: 'chrome',
			icon: 'url',
		}),
		useCreateApp({
			component: Minesweeper,
			name: 'Minesweeper',
			icon: minesweeperIcon,
		}),
	];
	const [opened, setOpened] = useState<appValues['opened']>([]);

	return (
		<AppsContext.Provider value={{ apps, opened, setOpened }}>{children}</AppsContext.Provider>
	);
};

export default AppsContextProvider;
