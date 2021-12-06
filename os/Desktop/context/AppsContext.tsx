import React, { useState } from 'react';
import { createContext } from 'react';
import { AppProps } from '../components/Window/Window';

interface appValues {
	apps: {
		name: string;
		icon: string;
	}[];
	opened: React.VFC<AppProps>[];
	setOpened: React.Dispatch<React.SetStateAction<appValues['opened']>>;
}

export const AppsContext = createContext<appValues>({ apps: [], opened: [], setOpened: () => {} });

const AppsContextProvider: React.FC = ({ children }) => {
	const [opened, setOpened] = useState<appValues['opened']>([]);

	// placeholder apps
	const apps: appValues['apps'] = [
		{
			name: 'discord',
			icon: 'url',
		},
		{
			name: 'chrome',
			icon: 'url',
		},
	];

	return (
		<AppsContext.Provider value={{ apps, opened, setOpened }}>{children}</AppsContext.Provider>
	);
};

export default AppsContextProvider;
