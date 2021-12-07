interface Props {
	style: React.CSSProperties;
	onMouseDown: (e: React.MouseEvent) => void;
}

const Resizer: React.VFC<Props> = ({ style, onMouseDown }) => {
	return <div onMouseDown={onMouseDown} style={style} />;
};

export default Resizer;
