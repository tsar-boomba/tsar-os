import { handleResizeMouseDown } from './resize-events';

interface Props {
	style: React.CSSProperties;
	onMouseDown: (e: React.MouseEvent) => void;
}

const Resizer: React.VFC<Props> = ({ style, onMouseDown }) => {
	return <div onMouseDown={onMouseDown} style={style} />;
};

const Resizers: React.VFC<{ windowRef: React.RefObject<HTMLDivElement> }> = ({ windowRef }) => {
	return (
		<>
			<Resizer
				onMouseDown={handleResizeMouseDown('top', windowRef)}
				style={{
					position: 'absolute',
					top: -5,
					left: 0,
					width: '100%',
					height: 5,
					cursor: 'ns-resize',
				}}
			/>
			<Resizer
				onMouseDown={handleResizeMouseDown('right', windowRef)}
				style={{
					position: 'absolute',
					top: 0,
					right: -5,
					height: '100%',
					width: 5,
					cursor: 'ew-resize',
				}}
			/>
			<Resizer
				onMouseDown={handleResizeMouseDown('bottom', windowRef)}
				style={{
					position: 'absolute',
					bottom: -5,
					left: 0,
					width: '100%',
					height: 5,
					cursor: 'ns-resize',
				}}
			/>
			<Resizer
				onMouseDown={handleResizeMouseDown('left', windowRef)}
				style={{
					position: 'absolute',
					top: 0,
					left: -5,
					height: '100%',
					width: 5,
					cursor: 'ew-resize',
				}}
			/>
			<Resizer
				onMouseDown={handleResizeMouseDown('top-right', windowRef)}
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
					height: 10,
					width: 10,
					cursor: 'nesw-resize',
				}}
			/>
			<Resizer
				onMouseDown={handleResizeMouseDown('bottom-right', windowRef)}
				style={{
					position: 'absolute',
					bottom: 0,
					right: 0,
					height: 10,
					width: 10,
					cursor: 'nwse-resize',
				}}
			/>
			<Resizer
				onMouseDown={handleResizeMouseDown('bottom-left', windowRef)}
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					height: 10,
					width: 10,
					cursor: 'nesw-resize',
				}}
			/>
			<Resizer
				onMouseDown={handleResizeMouseDown('top-left', windowRef)}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					height: 10,
					width: 10,
					cursor: 'nwse-resize',
				}}
			/>
		</>
	);
};

export default Resizers;
