import { useState } from 'react';
const b = () => {};

export default function useInput({ close = b, click = b, during = b, debug, hostid, onBlur = b, onFocus = b }) {
	const [focus, setFocus] = useState(false);
	return {
		events: {
			onBlur: e => {
				onBlur(e);
				let targetID = e?.relatedTarget?.attributes?.hostid?.value;
				if (debug) console.log({location: 'stuff useInput onBlur', targetID, hostid});
				if (!hostid) setFocus(false);
				else if (targetID !== hostid) {
					setFocus(false); close(targetID); 
			}},
			onClick: e => {
				if (debug) console.log({location: 'stuff useInput onClick', e});
				click(e);
			},
			onFocus: e => {
				onFocus(e);
				if (debug) console.log({location: 'stuff useInput onFocus', e});
				setFocus(true);
				during(e); 
			}
		},
		focus,
		setFocus
	};
};