import { useState } from 'react';
import { OSApp } from './AppsContext';

type WithoutData = Omit<OSApp, 'setData' | 'data'>;

const useCreateApp = ({ component, titleBarComponent, name, icon }: WithoutData) => {
	const [appData, setAppData] = useState<OSApp['data']>({
		minimized: false,
		fullscreen: false,
	});

	return { component, titleBarComponent, name, icon, setData: setAppData, data: { ...appData } };
};

export default useCreateApp;
