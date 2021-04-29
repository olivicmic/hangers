import { useCallback, useEffect, useState } from 'react';

export default function useTimeout(
	toDo = () => {},
	wait = 3000
) {
	useEffect(() => {
		const timer = setTimeout(() => {
			toDo();
		}, wait );
		return () => clearTimeout(timer);
	});
};