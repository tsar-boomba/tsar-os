import React, { useState } from 'react';
import { createContext } from 'react';
import { AppProps, TitleBarProps } from '../components/Window/Window';
import useCreateApp from './useCreateApp';

export interface OSApp {
	component: React.VFC<AppProps>;
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
			icon: 'https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico',
		}),
		useCreateApp({
			component: () => <p>chrome</p>,
			name: 'chrome',
			icon: 'url',
		}),
	];
	const [opened, setOpened] = useState<appValues['opened']>([]);

	return (
		<AppsContext.Provider value={{ apps, opened, setOpened }}>{children}</AppsContext.Provider>
	);
};

export default AppsContextProvider;
