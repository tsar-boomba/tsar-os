import { handleTitleBarDrag } from './drag-events';
import { TitleBarProps } from './Window';
import styles from './Window.module.scss';

const DefaultTitleBar: React.VFC<TitleBarProps> = ({
	content,
	closeApp,
	titleBarRef,
	windowRef,
}) => {
	return (
		<div
			onMouseDown={handleTitleBarDrag(windowRef)}
			className={styles['title-bar-container']}
			ref={titleBarRef}
		>
			<p className={styles['title-bar-content']}>{content}</p>
			<button style={{ fontSize: 16 }} className={styles['title-bar-button']}>
				-
			</button>
			<button style={{ fontSize: 16 }} className={styles['title-bar-button']}>
				□
			</button>
			<button onClick={closeApp} className={styles['title-bar-button']}>
				X
			</button>
		</div>
	);
};

export default DefaultTitleBar;
