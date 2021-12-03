import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import styles from '@/styles/Home.module.scss';

const Home: NextPage = () => {
	return (
		<Layout>
			<h1 className={styles.test}>Attendance</h1>
		</Layout>
	);
};

export default Home;
