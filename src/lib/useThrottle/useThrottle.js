import { useEffect, useState } from 'react';

export default function useThrottle(toDo = () => {}, status, setStatus, watch, delay = 0, debug, holdDelay = false, url) {
	const [watchStore, updateWatch] = useState(watch);

	useEffect(() => {
			if (debug && !status) console.debug('hangers useThrottle timer');
			if (status === 0) {
				setStatus(1, 'useThrottle component useEffect mounted, status = 0/falsy');
				toDo();
			}
	},[debug, setStatus, toDo, status]);

	useEffect(() => {
		//if (debug) console.debug('useThrottle watch values', watch, watchStore);
		if (url && watch && status !== 1) {
			setStatus(0, 'useThrottle watch values triggered');
		}
	},[debug, setStatus, status, url, watch, watchStore]);

	return { watchStore, updateWatch };
};