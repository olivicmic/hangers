import { useState } from 'react';

export default function usePagination({ count = 0, initial = 0, onChange = () => {} }) {
	const [active, setActive] = useState(false);
	const [page, setPage] = useState(initial);
	const [direction, setDirection] = useState(true);
	const atStart = (page <= 0);
	const atEnd = (page >= count -1);
	const goTo = index => {
		let num = parseInt(index);
		onChange({ target: { value: num } });
		setActive(true);
		setDirection(num > page);
		num > -1 && num < count && setPage(num);
	};
	const back = () => goTo(page - 1);
	const forward = () => goTo(page + 1);

	return { active, atEnd, atStart, back, count, direction, forward, goTo, page, setActive, setPage }
};