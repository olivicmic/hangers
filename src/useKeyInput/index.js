import { useEffect, useState } from 'react';

export default function useKeyInput({ defaultAll = true, disabled, keySet, keydown, keyup }) {
	const debug = (test, str) => console.log( ...[str, ...( [test] || [] )] );
	const subObj = (e, keyObj) => {
		if (typeof keyObj === 'function' && e.type === 'keydown') keyObj(e);
		else if (!keyObj.disabled) {
			if (keyObj?.default === false) e.preventDefault();
			if (keyObj[e.type]) keyObj[e.type](e);
		}
	};
	const handleKey = (e) => {
		if (!defaultAll) e.preventDefault();
		let keyObj = keySet[e.keyCode.toString()];
		e.debug = test => debug(test , e.type + ': ' + e.key);

		if (keyObj) subObj(e, keyObj);
		else if (keySet.other) subObj(e, keySet.other);
	};

	return e => !disabled ?
		(keydown || keyup) ? 
			{keydown, keyup}[e.type] ?  handleKey(e) : {} 
		: handleKey(e)
	: {};
};