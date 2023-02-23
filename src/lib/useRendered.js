import { useEffect, useState } from 'react';

export default function useRendered(onRendered = () => {}) {
	const [rendered, setRendered] = useState(false);
	useEffect(() => {
		if (!rendered) { onRendered(1); setRendered(true); }
	},[onRendered, rendered]);

	return [rendered, setRendered];
};