import AppsContextProvider from './AppsContext';

const OSContext: React.FC = ({ children }) => {
	return <AppsContextProvider>{children}</AppsContextProvider>;
};

export default OSContext;
