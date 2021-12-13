type Sides =
	| 'top'
	| 'right'
	| 'bottom'
	| 'left'
	| 'top-right'
	| 'bottom-right'
	| 'bottom-left'
	| 'top-left';

export const handleResizeMouseDown = (side: Sides, windowRef: React.RefObject<HTMLDivElement>) => {
	// globals for all handlers
	let mouseX = 0;
	let mouseY = 0;

	let elHeight = 0;
	let elWidth = 0;
	let elLeft = 0;
	let elTop = 0;

	const widthConstrain = 500;
	const heightConstrain = 500;

	const handleMouseMove = (e: MouseEvent) => {
		// make sure mouse is in window
		if (
			e.clientX <= 5 ||
			e.clientY <= 5 ||
			e.clientX >= innerWidth - 5 ||
			e.clientY >= innerHeight - 5
		) {
			return;
		}
		if (!windowRef.current) throw new Error('No element found on window ref.');
		const windowEl = windowRef.current;
		const dx = e.clientX - mouseX;
		const dy = e.clientY - mouseY;

		const newLeft = elLeft + dx;
		const newTop = elTop + dy;

		switch (side) {
			case 'top':
				if (elHeight - dy < heightConstrain) return;
				windowEl.style.top = `${newTop}px`;
				windowEl.style.height = `${elHeight - dy}px`;
				break;
			case 'right':
				if (elWidth + dx < widthConstrain) return;
				windowEl.style.width = `${elWidth + dx}px`;
				break;
			case 'bottom':
				if (elHeight + dy < heightConstrain) return;
				windowEl.style.height = `${elHeight + dy}px`;
				break;
			case 'left':
				if (elWidth - dx < widthConstrain) return;
				windowEl.style.left = `${newLeft}px`;
				windowEl.style.width = `${elWidth - dx}px`;
				break;
			case 'top-right':
				if (elWidth + dx < widthConstrain || elHeight - dy < heightConstrain) return;
				windowEl.style.top = `${newTop}px`;
				windowEl.style.width = `${elWidth + dx}px`;
				windowEl.style.height = `${elHeight - dy}px`;
				break;
			case 'bottom-right':
				if (elWidth + dx < widthConstrain || elHeight + dy < heightConstrain) return;
				windowEl.style.width = `${elWidth + dx}px`;
				windowEl.style.height = `${elHeight + dy}px`;
				break;
			case 'bottom-left':
				if (elWidth - dx < widthConstrain || elHeight + dy < heightConstrain) return;
				windowEl.style.left = `${newLeft}px`;
				windowEl.style.width = `${elWidth - dx}px`;
				windowEl.style.height = `${elHeight + dy}px`;
				break;
			case 'top-left':
				if (elWidth - dx < widthConstrain || elHeight - dy < heightConstrain) return;
				windowEl.style.top = `${newTop}px`;
				windowEl.style.left = `${newLeft}px`;
				windowEl.style.width = `${elWidth - dx}px`;
				windowEl.style.height = `${elHeight - dy}px`;
				break;
		}
		windowEl.dispatchEvent(new Event('resize'));
	};

	const handleMouseUp = () => {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	return (e: React.MouseEvent) => {
		e.preventDefault();
		if (!windowRef.current) throw new Error('No element found on window ref.');
		const windowEl = windowRef.current;

		mouseX = e.clientX;
		mouseY = e.clientY;

		const styles = window.getComputedStyle(windowEl);
		elHeight = parseInt(styles.height);
		elWidth = parseInt(styles.width);
		elTop = parseInt(styles.top);
		elLeft = parseInt(styles.left);

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};
};
