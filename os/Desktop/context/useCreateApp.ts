import { useState } from 'react';
import { OSApp } from './AppsContext';

type WithoutData = Omit<OSApp, 'data'>;

const useCreateApp = ({ component, titleBarComponent, name, icon }: WithoutData) => {
	const [_, dummySet] = useState<any>(); // i regret my actions
	const [appData, setAppData] = useState<OSApp['data']>({
		minimized: false,
		fullscreen: false,
		set: dummySet,
	});

	return { component, titleBarComponent, name, icon, data: { ...appData, set: setAppData } };
};

export default useCreateApp;
