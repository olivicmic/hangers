import { useEffect, useState } from 'react';

export default function useThrottle(toDo, status, setStatus, watch, delay = 0) {
	const [watchStore, updateWatch] = useState(watch);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!status) {
				setStatus(1);
				toDo();
			}
		}, delay);

		if ((watch !== watchStore) && status > 1) {
			updateWatch(watch);
			setStatus(0);
		}

	return () => clearTimeout(timer);
	},[delay, toDo, status, watch, watchStore]);

	return { watchStore, updateWatch };
};