import { useCallback, useState } from 'react';
import { api, log, uno } from 'lal';

const { REACT_APP_API_MAIN_KEY: mainKey, REACT_APP_API_MAIN_URL: mainURL } = process.env;

export default function useRequest(props) {
	const { apiKey, baseURL, debug, baseState, onError = () => {}, onSuccess = () => {}, params, mono, url, ...rest } = uno(props);
	const stateDefault = baseState && baseState.basePesist ? baseState : null;
	const [error, setError] = useState(stateDefault);
	const [response, setResponse] = useState(null);
	const resetState = ({ keepContent, keepError }) => {
		if (!keepContent) setResponse(stateDefault);
		if (!keepError) setError(null);
	};
	const resArr = ['error','success'];
	const execute = (res, updateState, onFinish, clear, pass) => {
		let resObj = pass ? { ...baseState, ...res } : res;
		if (debug) console.log('hangers useAPI', resArr[pass], resObj);
		updateState(resObj);
		clear(pass ? null : stateDefault);
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
	})
	.then(res => log(undefined, { hangersDebug: 'success', res }, res.debug))
	.catch(err => log(undefined, { hangersDebug: 'error', err }, err.debug))
	);

	return { request, response, setResponse, error, setError, resetState };
};