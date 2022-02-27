import { useEffect } from 'react';

export default function useOutside(ref, todo = () => {}) {
	const onOutside = e => {
		if (!ref?.contains(e.target)) todo(e);
	};
	useEffect(() => {
		document.addEventListener('mousedown', onOutside, true); 
		return () => document.removeEventListener('mousedown', onOutside, true);
	}, [ onOutside ]);
};