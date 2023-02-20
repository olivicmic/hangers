import { useEffect } from 'react';
import useKeyInput from '../useKeyInput';

export default function useKeyListen({ defaultAll = true, disabled, keySet, keydown, keyup  }) {

	const keyInput = useKeyInput({ defaultAll, disabled, keySet, keydown, keyup  });
	useEffect(() => {

		if (!disabled) {
			if (!keyup || (keydown && keyup)) document.addEventListener('keydown', keyInput);
			if (!keydown || (keydown && keyup)) document.addEventListener('keyup', keyInput);

			return () => {
				document.removeEventListener('keydown', keyInput);
				document.removeEventListener('keyup', keyInput);
			};
		}
	}, [ defaultAll, disabled, keydown, keyInput, keySet, keyup ]);

};