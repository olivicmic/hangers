import { useEffect } from 'react';

export default function useInOut({ boundary = '', disabled, onIn = () => {}, onOut = () => {} }) {
	useEffect(() => {
		const handleClick = ({ target }) => {
			if (target?.closest('#' + boundary)) onIn({ target });
			else onOut({ target });
		};
		if (!disabled) document.addEventListener('mousedown', handleClick, true);
		else document.removeEventListener('mousedown', handleClick, true);
		return () => document.removeEventListener('mousedown', handleClick, true);
	}, [ boundary, disabled, onIn, onOut ]);
};