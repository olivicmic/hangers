import { useEffect } from 'react';

export default function useOutside({disabled, inside = () => {}, outside = () => {}, ref}) {
	const handleClick = e => {
		if (ref?.contains(e.target)) inside(e)
		else outside(e);
	};
	useEffect(() => {
		if (!disabled) document.addEventListener('mousedown', handleClick, true); 
		return () => document.removeEventListener('mousedown', handleClick, true);
	}, [ disabled, handleClick ]);
};