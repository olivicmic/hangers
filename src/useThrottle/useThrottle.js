import { useEffect, useState } from 'react';

export default function useThrottle(toDo, status, setStatus, watch, delay = 0, debug) {
	const [watchStore, updateWatch] = useState(watch);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (debug) console.log('hangers useThrottle timer');
			if (!status) {
				if (debug) console.log('useThrottle switch');
				setStatus(1);
				toDo();
			}
		}, delay);

		if ((watch !== watchStore) && status > 1) {
			if (debug) console.log('useThrottle watch trigger');
			updateWatch(watch);
			setStatus(0);
		}

	return () => clearTimeout(timer);
	},[delay, toDo, status, watch, watchStore]);

	return { watchStore, updateWatch };
};