import { useCallback, useEffect, useState } from 'react';
import { api, uno } from 'lal';
import useRequest from '../useRequest';
import useThrottle from '../useThrottle';

export default function useRelay(props) {
	const { debug, delay, onError = () => {}, onSuccess = () => {}, paused, mono, url, watch, ...rest  } = uno(props);
	const [status, setStatus] = useState(paused ? -1 : 0);
	const execute = (res, step, onFinish) => {
		onFinish(res);
		setStatus(step); // 2 || 3
	};
	const { request, ...hooks } = useRequest({
		debug,
		onError: (res) => execute(res, 3, onError),
		onSuccess: (res) => execute(res, 2, onSuccess),
		url: mono || url,
		...rest
	});
	const { watchStore, updateWatch } = useThrottle(request, status, setStatus, watch, delay, debug);

	return {
		hold: !status || status === 1,
		request, // function to trigger API request directly
		status, // -1: paused, 0: staged (will trigger request), 1: processing, 2: success, 3: error
		setStatus, // used to reset API request status manually
		...hooks
	};
};