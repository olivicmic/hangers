import { useEffect } from 'react';

export default function useOutside({disabled, onIn = () => {}, onOut = () => {}, refs = [] }) {
	const handleClick = e => {
		if (refs.indexOf(e.target) > -1) onIn(e);
		else onOut(e);
	};
	useEffect(() => {
		if (!disabled) document.addEventListener('mousedown', handleClick, true);
		else document.removeEventListener('mousedown', handleClick, true);
		return () => document.removeEventListener('mousedown', handleClick, true);
	}, [ disabled, handleClick ]);
};