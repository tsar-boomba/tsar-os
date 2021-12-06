import AppsContextProvider from './AppsContext';

const DesktopContext: React.FC = ({ children }) => {
	return <AppsContextProvider>{children}</AppsContextProvider>;
};

export default DesktopContext;
