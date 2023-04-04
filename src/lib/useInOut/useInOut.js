import { useEffect } from 'react';

export default function useInOut({ boundary = '', debug, disabled, onIn = () => {}, onOut = () => {} }) {
	useEffect(() => {
		const handleClick = ({ target }) => {
			let closest = target?.closest('#' + boundary);
			if (debug) console.log('useInOut debug', debug, target, { boundary, closest });
			if (closest) onIn({ target });
			else onOut({ target });
		};
		if (!disabled) document.addEventListener('mousedown', handleClick, true);
		else document.removeEventListener('mousedown', handleClick, true);
		return () => document.removeEventListener('mousedown', handleClick, true);
	}, [ boundary, debug, disabled, onIn, onOut ]);
};