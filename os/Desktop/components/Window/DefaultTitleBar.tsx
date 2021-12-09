import { useRef } from 'react';
import { handleTitleBarDrag } from './drag-events';
import { TitleBarProps } from './Window';
import styles from './Window.module.scss';

const DefaultTitleBar: React.VFC<TitleBarProps> = ({
	content,
	closeApp,
	minimizeApp,
	titleBarRef,
	windowRef,
}) => {
	const buttonsRef = useRef<HTMLDivElement>(null);

	return (
		<div
			onMouseDown={handleTitleBarDrag(windowRef, buttonsRef)}
			className={styles['title-bar-container']}
			ref={titleBarRef}
		>
			<p className={styles['title-bar-content']}>{content}</p>
			<div ref={buttonsRef} className={styles['title-bar-button-container']}>
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
		</div>
	);
};

export default DefaultTitleBar;
