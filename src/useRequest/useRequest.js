import { useCallback, useState } from 'react';
import { api, uno } from 'lal';

const { REACT_APP_API_MAIN_KEY: mainKey, REACT_APP_API_MAIN_URL: mainURL } = process.env;

export default function useRequest(props) {
	const { apiKey, baseURL, debug, onError = () => {}, onSuccess = () => {}, params, mono, url, ...rest } = uno(props);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(null);
	const resetState = ({ keepContent, keepError }) => {
		if (!keepContent) setResponse(null);
		if (!keepError) setError(null);
	};
	const execute = (res, updateState, onFinish, clear, passFail) => {
		if (debug) console.log('hangers useAPI', passFail, res, /*queryObj */);
		updateState(res);
		clear(null);
		onFinish(res);
	};
	const queryObj = { apiKey: apiKey !== undefined ? apiKey : mainKey, ...params };
	const request = useCallback(() => api({
		baseURL: baseURL || mainURL,
		debug,
		onError: (err) => execute(err, setError, onError, setResponse, 'error'),
		onSuccess: (res) => execute(res, setResponse, onSuccess, setError, 'success'),
		params: queryObj,
		url: mono || url,
		...rest
	}));

	return { request, response, setResponse, error, setError, resetState };
};