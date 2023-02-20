import { useState } from 'react';

export default function useBusy({ onRest = () => {}, onStart = () => {} }) {
	const [busy, setBusy] = useState(false);
	return [busy, {
		onStart: (result, spring, item) => { setBusy(true); onStart(true, item) },
		onRest: (result, spring, item) => { setBusy(false); onRest(false, item) }
	}, setBusy];
};