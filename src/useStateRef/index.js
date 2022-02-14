// based on work by https://vzaidman.com
import { useCallback, useState } from 'react';
export default function useStateRef(process = n => n) {
	const [node, setNode] = useState(null);
	const setRef = useCallback(newNode => setNode(process(newNode)), [process]);
	return [node, setRef];
}

// usage:
// const [clientHeight, setRef] = useStateRef(node => (node?.clientHeight || 0));