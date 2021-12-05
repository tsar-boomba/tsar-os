import styles from './Layout.module.scss';
import Head from 'next/head';
import Header from '../Header';
import Fixed from '../Header/Fixed';

interface LayoutProps {
	title?: string;
	description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
	return (
		<>
			<Head>
				<title>{title || 'Tsar OS'}</title>
				<meta name='description' content={description || "Isaiah's custom web OS"} />
			</Head>
			<div className={styles.container}>
				<Header />

				{/* Fixed version of header */}
				<Fixed />
				<main className={styles.main}>{children}</main>
			</div>
		</>
	);
};

export default Layout;
