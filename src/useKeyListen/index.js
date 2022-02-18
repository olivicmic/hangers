import { useEffect, useState } from 'react';
import useKeyInput from '../useKeyInput';

export default function useKeyListen({ defaultAll = true, disabled, keySet, keydown, keyup  }) {
	const keyInput = useKeyInput({ defaultAll, disabled, keySet, keydown, keyup  });
	useEffect(() => {
		if (!disabled) {
			if (!keyup || (keydown && keyup)) document.addEventListener('keydown', keyInput);
			if (!keydown || (keydown && keyup)) document.addEventListener('keyup', keyInput);

			return () => {
				if (!keyup || (keydown && keyup)) document.removeEventListener('keydown', keyInput);
				if (!keydown || (keydown && keyup)) document.removeEventListener('keyup', keyInput);
			};
		}
	}, [ disabled ]);

};