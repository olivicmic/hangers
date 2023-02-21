import { useState } from 'react';
import { uno } from 'lal';

export default function useBusy(props) {
	const { disable, onRest = () => {}, onStart = () => {} } = uno(props);
	const [busy, setBusy] = useState(false);
	return [busy, {
		onStart: (result, spring, item) => { if (!disable) { setBusy(true); onStart(true, item); }},
		onRest: (result, spring, item) => { if (!disable) { setBusy(false); onRest(true, item); }}
	}, setBusy];
};