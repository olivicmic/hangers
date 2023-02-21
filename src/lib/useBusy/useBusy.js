import { useState } from 'react';
import { uno } from 'lal';

export default function useBusy(props) {
	const { disable, onRest = () => {}, onStart = () => {} } = uno(props);
	const [busy, setBusy] = useState(false);
	return [busy, {
		onStart: (result, spring, item) => !disable && setBusy(true) && onStart(true, item),
		onRest: (result, spring, item) => !disable && setBusy(false) && onRest(false, item)
	}, setBusy];
};