import { useEffect, useState } from 'react';

export default function useYap(props) {
	const [status, setStatus] = useState(false);
	useEffect(() => {
		console.log('testing status', status);
	},[status]);

	return [status, setStatus];
};