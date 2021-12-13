import { useState } from 'react';
import { OSApp } from './AppsContext';

type WithoutData = Omit<OSApp, 'setData' | 'data'>;

const useCreateApp = ({ component, titleBarComponent, name, icon }: WithoutData) => {
	const [appData, setAppData] = useState<OSApp['data']>({
		index: 0,
		minimized: false,
		fullscreen: false,
		last: {
			top: '',
			left: '',
			width: '',
			height: '',
		},
	});

	return { component, titleBarComponent, name, icon, setData: setAppData, data: { ...appData } };
};

export default useCreateApp;
