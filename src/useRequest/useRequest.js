import { useCallback, useState } from 'react';
import { api, uno } from 'lal';

const { REACT_APP_API_MAIN_KEY: mainKey, REACT_APP_API_MAIN_URL: mainURL } = process.env;

export default function useRequest(props) {
	const { apiKey, baseURL, debug, baseState, onError = () => {}, onSuccess = () => {}, params, mono, url, ...rest } = uno(props);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(null);
	const resetState = ({ keepContent, keepError }) => {
		if (!keepContent) setResponse(null);
		if (!keepError) setError(null);
	};
	const resArr = ['error','success'];
	const execute = (res, updateState, onFinish, clear, pass) => {
		let resObj = pass ? { ...baseState, ...res } : res;
		if (debug) console.log('hangers useAPI', resArr[pass], resObj);
		updateState(resObj);
		clear(null);
		onFinish(resObj);
	};
	const queryObj = { apiKey: apiKey !== undefined ? apiKey : mainKey, ...params };
	const request = useCallback(() => api({
		baseURL: baseURL || mainURL,
		debug,
		onError: (err) => execute(err, setError, onError, setResponse, 0),
		onSuccess: (res) => execute(res, setResponse, onSuccess, setError, 1),
		params: queryObj,
		url: mono || url,
		...rest
	}));

	return { request, response, setResponse, error, setError, resetState };
};