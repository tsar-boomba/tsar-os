type Sides = 'top' | 'right' | 'bottom' | 'left' | 'corner';

let mouseX = 0;
let mouseY = 0;

let elHeight = 0;
let elWidth = 0;

const handleMouseMove = (side: Sides) => (e: Event) => {};

const handleMouseUp = () => {
	document.removeEventListener('mousemove', handleMouseMove);
	document.removeEventListener('mouseup', handleMouseUp);
};

export const handleResizeMouseDown = (e: React.MouseEvent, side: Sides) => {
	mouseX = e.clientX;
	mouseY = e.clientY;

	const styles = window.getComputedStyle();

	document.addEventListener('mousemove', handleMouseMove(side));
	document.addEventListener('mouseup', handleMouseUp);
};
