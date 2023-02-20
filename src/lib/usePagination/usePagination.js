import { useEffect, useState } from 'react';

export default function usePagination({ at = 0, count = 0, debug, pause, name = '', onChange = () => {} }) {
	const [active, setActive] = useState(false);
	const [page, setPage] = useState(at);
	const [internal, setInternal] = useState(at);
	const [external, setExternal] = useState(at);
	const [direction, setDirection] = useState(true);
	const [pageHistory, setPageHistory] = useState([]);
	const atStart = (page <= 0);
	const atEnd = (page >= count -1);
	const goTo = (index, check = true) => {
		if (check) {
			setPageHistory([ ...pageHistory, page]);
			setInternal(index); 
		}
	};
	const back = check => goTo(page - 1, check);
	const forward = check => goTo(page + 1, check);
	const previous = () => {
		if (pageHistory.length > -1) {
			let newHistory = [...pageHistory];
			setInternal(pageHistory[pageHistory.length - 1]);
			newHistory.pop();
			setPageHistory(newHistory)
		}
	};

	useEffect(() => {
		let active = true;
		if (active && !pause) {
			let execute = index => {
				let num = parseInt(index);
				
				onChange({ target: { ...name && { name }, value: num }});
				setActive(true);
				setDirection(num > page);
				num > -1 && num < count && setPage(num);
			};
			if (at !== external) { setInternal(at); setExternal(at) }
			else if (internal !== page) execute(internal);
		}

		return () => { active = false };

	},[ at, count, external, name, onChange, page, pause, internal, setActive, setDirection, setPage, setInternal ]);

	return { active, atEnd, atStart, back, count, direction, forward, goTo, page, previous, setActive, setPage }
};