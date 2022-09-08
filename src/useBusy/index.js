import { useState } from 'react';

export default function useBusy({ onRest = () => {}, onStart = () => {} }) {
	const [busy, setBusy] = useState(0);
	const [run, setRun] = useState(1);
	return [busy, {
		onStart: () => setBusy(run) && setRun(run + 1) && onStart(),
		onRest: () => setBusy(0) && onRest()
	}, setBusy];
};