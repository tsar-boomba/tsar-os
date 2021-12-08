import React, { useState } from 'react';
import { createContext } from 'react';
import { AppProps, TitleBarProps } from '../components/Window/Window';

interface App {
	component: React.VFC<AppProps>;
	titleBarComponent?: React.VFC<TitleBarProps>;
	name: string;
	icon: string;
}

interface appValues {
	apps: App[];
	opened: App[];
	setOpened: React.Dispatch<React.SetStateAction<appValues['opened']>>;
}

export const AppsContext = createContext<appValues>({ apps: [], opened: [], setOpened: () => {} });

const AppsContextProvider: React.FC = ({ children }) => {
	const [opened, setOpened] = useState<appValues['opened']>([]);

	// placeholder apps
	const apps: appValues['apps'] = [
		{
			component: () => <p>discord</p>,
			name: 'discord',
			icon: 'https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico',
		},
		{
			component: () => <p>chrome</p>,
			name: 'chrome',
			icon: 'url',
		},
	];

	return (
		<AppsContext.Provider value={{ apps, opened, setOpened }}>{children}</AppsContext.Provider>
	);
};

export default AppsContextProvider;
