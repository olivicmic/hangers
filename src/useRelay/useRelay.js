import { useCallback, useEffect, useState } from 'react';
import { api, uno } from 'lal';
import useRequest from '../useRequest';
import useThrottle from '../useThrottle';

export default function useRelay(props) {
	const { debug, delay, onError = () => {}, onSuccess = () => {}, paused, mono, retry, slowOnError, url, watch, ...rest  } = uno(props);
	const [status, setStatus] = useState(paused ? -1 : 0);
	const execute = (res, step, onFinish) => {
		onFinish(res);
		setStatus(step); // 2 || 3
	};
	const { error, request, ...hooks } = useRequest({
		debug,
		onError: (res) => execute(res, retry ? 0 : 3, onError),
		onSuccess: (res) => execute(res, 2, onSuccess),
		url: mono || url,
		...rest
	});
	const { watchStore, updateWatch } = useThrottle(request, status, setStatus, watch, delay, debug, slowOnError && error);

	return {
		hold: !status || status === 1,
		request, // function to trigger API request directly
		status, // -1: paused, 0: staged (will trigger request), 1: processing, 2: success, 3: error
		setStatus, // used to reset API request status manually
		...hooks
	};
};