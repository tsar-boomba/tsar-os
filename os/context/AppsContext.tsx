import { createContext } from 'react';

const appValues = [
	{
		name: '',
		icon: '',
	},
];

export const AppsContext = createContext(appValues);

const AppsContextProvider: React.FC = ({ children }) => {
	// placeholder apps
	const apps: typeof appValues = [
		{
			name: 'discord',
			icon: 'url',
		},
		{
			name: 'chrome',
			icon: 'url',
		},
	];

	return <AppsContext.Provider value={apps}>{children}</AppsContext.Provider>;
};

export default AppsContextProvider;
