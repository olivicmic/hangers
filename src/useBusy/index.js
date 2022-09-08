import { useState } from 'react';

export default function useBusy({ onRest = () => {}, onStart = () => {} }) {
	const [busy, setBusy] = useState(0);
	const [run, setRun] = useState(1);
	return [busy, {
		onStart: () => setBusy(run) && onStart(),
		onRest: () => setBusy(0) && setRun(run + 1) && onRest()
	}, setBusy];
};