import styles from './Layout.module.scss';
import Head from 'next/head';

interface LayoutProps {
	title?: string;
	description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
	return (
		<>
			<Head>
				<title>{title || 'Yeti Attendance'}</title>
				<meta
					name='description'
					content={description || "App used for YETI member's attendance"}
				/>
			</Head>
			<div className={styles.container}>
				<main className={styles.main}>{children}</main>
			</div>
		</>
	);
};

export default Layout;
