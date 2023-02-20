import { useCallback, useState } from 'react';

export default function useStateRef() {
	const [ele, setEle] = useState();
  	const ref = useCallback(node => {
		if (node !== null) {
			setEle(node.getBoundingClientRect());
		}
	}, []);

	return [ele,ref];
};