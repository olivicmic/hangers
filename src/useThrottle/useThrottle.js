import { useEffect, useState } from 'react';

export default function useThrottle(toDo = () => {}, status, setStatus, watch, delay = 0, debug, holdDelay = false, url) {
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
		if (debug) console.debug('useThrottle watch values', watch, watchStore);
		if (url && watch && status !== 1) {
			if (debug) console.debug('useThrottle watch triggered', watch, watchStore);
			setStatus(0);
		}
	},[status, url, watch]);

	return { watchStore, updateWatch };
};