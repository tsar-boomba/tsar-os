import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import styles from '@/styles/Home.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Features from '@/components/Features';
import Technology from '@/components/Technology';
import About from '@/components/About';

const Home: NextPage = () => {
	const router = useRouter();

	useEffect(() => {
		const section = String(router.query.section);
		document.getElementById(section)?.scrollIntoView(true);
	}, []);

	return (
		<Layout>
			<div
				style={{
					display: 'grid',
					width: '100vw',
					height: '40vh',
					placeItems: 'center',
					backgroundColor: 'red',
				}}
			>
				IMG / GIF here
				<Link href='/start'>
					<a className={styles.start}>Get Started</a>
				</Link>
			</div>

			<Features />
			<Technology />
			<About />
		</Layout>
	);
};

export default Home;
