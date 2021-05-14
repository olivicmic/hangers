import { useEffect, useState } from 'react';

export default function useThrottle(toDo = () => {}, status, setStatus, watch, delay = 0, debug, holdDelay = false) {
	const [watchStore, updateWatch] = useState(watch);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (debug && !status) console.log('hangers useThrottle timer');
			if (!status) {
				if (debug) console.log('useThrottle switch');
				setStatus(1);
				toDo();
			}
		}, holdDelay ? 0 : delay);
	return () => clearTimeout(timer);
	},[status]);

	useEffect(() => {
		if ((watch !== watchStore) && status > 1) {
			if (debug) console.log('useThrottle watch trigger');
			updateWatch(watch);
			setStatus(0);
		}
	},[status, watch, watchStore]);

	return { watchStore, updateWatch };
};