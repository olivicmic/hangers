import { useState } from 'react';

export default function useBusy({ onRest = () => {}, onStart = () => {} }) {
	const [busy, setBusy] = useState(false);
	return [busy, {
		onStart: () => setBusy(true) && onStart(),
		onRest: () => setBusy(false) && onRest()
	}, setBusy];
};