import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import HeaderButton from './HeaderButton';

const Header = () => {
	const router = useRouter();
	const isHome = router.pathname === '/';

	return (
		<div className={styles.wrapper}>
			<button
				className={styles.title}
				onClick={() =>
					isHome ? window.scrollTo({ top: 0, behavior: 'smooth' }) : router.push('/')
				}
			>
				{/* optimally this is a logo */}
				Tsar OS
			</button>
			<div className={styles['buttons-wrapper']}>
				<HeaderButton
					onClick={() =>
						isHome
							? document.getElementById('features')?.scrollIntoView(true)
							: router.push('/?section=features')
					}
				>
					Features
				</HeaderButton>
				<HeaderButton
					onClick={() =>
						isHome
							? document.getElementById('technology')?.scrollIntoView(true)
							: router.push('/?section=technology')
					}
				>
					Technology
				</HeaderButton>
				<HeaderButton
					onClick={() =>
						isHome
							? document.getElementById('about')?.scrollIntoView(true)
							: router.push('/?section=about')
					}
				>
					About
				</HeaderButton>
			</div>
		</div>
	);
};

export default Header;
