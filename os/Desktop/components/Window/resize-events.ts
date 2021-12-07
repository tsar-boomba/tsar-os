import React from 'react';

type Sides = 'top' | 'right' | 'bottom' | 'left' | 'corner';
export const handleResizeMouseDown = (side: Sides, windowRef: React.RefObject<HTMLDivElement>) => {
	// globals for all handlers
	let mouseX = 0;
	let mouseY = 0;

	let elHeight = 0;
	let elWidth = 0;

	const handleMouseMove = (e: MouseEvent) => {
		if (!windowRef.current) throw new Error('No element found on window ref.');
		const windowEl = windowRef.current;
		const dx = e.clientX - mouseX;
		const dy = e.clientY - mouseY;

		const newWidth = elWidth + dx;
		const newHeight = elHeight + dy;

		if (newWidth <= 400) return;
		if (newHeight <= 400) return;

		switch (side) {
			case 'top':
				windowEl.style.height = `${newHeight}px`;
				break;
			case 'right':
				windowEl.style.width = `${newWidth}px`;
				break;
			case 'bottom':
				windowEl.style.height = `${newHeight}px`;
				break;
			case 'left':
				windowEl.style.width = `${newWidth}px`;
				break;
			case 'corner':
				windowEl.style.width = `${newWidth}px`;
				windowEl.style.height = `${newHeight}px`;
				break;
		}
	};

	const handleMouseUp = () => {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	return (e: React.MouseEvent) => {
		e.preventDefault();
		if (!windowRef.current) throw new Error('No element found on window ref.');
		const windowEl = windowRef.current;
		console.log('mouse down');
		mouseX = e.clientX;
		mouseY = e.clientY;

		const styles = window.getComputedStyle(windowEl);
		elHeight = parseInt(styles.height);
		elWidth = parseInt(styles.width);

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};
};
