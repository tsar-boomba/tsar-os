import { AppsContext, BaseProps } from '@/os/context/AppsContext';
import { useContext, useEffect } from 'react';

const Minimizer: React.VFC<BaseProps> = ({ data }) => {
	const { opened } = useContext(AppsContext);

	useEffect(() => {}, [data.minimized]);

	return <></>;
};

export default Minimizer;
