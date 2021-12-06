import styles from './Taskbar.module.scss';

interface Props {
	name: string;
	icon: string;
}

const AppIcon: React.VFC<Props> = ({ name, icon }) => {
	return <div className={styles['app-icon']}>{name}</div>;
};

export default AppIcon;
