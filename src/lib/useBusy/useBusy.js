import { useState } from 'react';

export default function useBusy({ disable, onRest = () => {}, onStart = () => {} }) {
	const [busy, setBusy] = useState(false);
	return [busy, {
		onStart: (result, spring, item) => !disable && setBusy(true) && onStart(true, item),
		onRest: (result, spring, item) => !disable && setBusy(false) && onRest(false, item)
	}, setBusy];
};