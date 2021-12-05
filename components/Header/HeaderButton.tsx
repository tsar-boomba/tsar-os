import styles from './Header.module.scss';

interface HeaderButtonProps {
	onClick: () => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ children, onClick }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{children}
		</button>
	);
};

export default HeaderButton;
