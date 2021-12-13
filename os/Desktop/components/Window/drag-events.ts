export const handleTitleBarDrag = (
	windowRef: React.RefObject<HTMLDivElement>,
	buttonsRef: React.RefObject<HTMLDivElement>,
) => {
	let mouseX = 0;
	let mouseY = 0;

	let elTop = 0;
	let elLeft = 0;
	let elBottom = 0;
	let elRight = 0;

	const handleMouseMove = (e: MouseEvent) => {
		if (!windowRef.current) throw new Error('No element found on titleBar ref.');
		const windowEl = windowRef.current;
		const dx = e.clientX - mouseX;
		const dy = e.clientY - mouseY;
		const newLeft = elLeft + dx;
		const newTop = elTop + dy;
		const newRight = elRight - dx;
		const newBottom = elBottom - dy;

		// validating movement
		if (
			newLeft < 0 ||
			newLeft > innerWidth ||
			newTop < 0 ||
			newTop > innerHeight ||
			newRight < 0 ||
			newRight > innerWidth ||
			newBottom < 0 ||
			newBottom > innerHeight
		) {
			return document.dispatchEvent(new MouseEvent('mouseup')); // causing e listeners to be removed
		}

		windowEl.style.left = `${newLeft}px`;
		windowEl.style.top = `${newTop}px`;
	};

	const handleMouseUp = () => {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	return (e: React.MouseEvent & { target: Node }) => {
		if (buttonsRef.current) {
			if (buttonsRef.current.contains(e.target)) {
				e.stopPropagation();
				return;
			}
		}
		if (!windowRef.current) throw new Error('No element found on titleBar ref.');
		const windowEl = windowRef.current;

		const styles = window.getComputedStyle(windowEl);
		elTop = parseInt(styles.top);
		elLeft = parseInt(styles.left);
		elBottom = parseInt(styles.bottom);
		elRight = parseInt(styles.right);

		mouseX = e.clientX;
		mouseY = e.clientY;

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};
};
