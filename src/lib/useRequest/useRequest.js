import { useState } from 'react';
import { log, uno } from 'lal';
import { api } from '../resources';

const { REACT_APP_API_MAIN_KEY: mainKey, REACT_APP_API_MAIN_KEY_NAME: mainKeyName, REACT_APP_API_MAIN_URL: mainURL} = process.env;

const n = o => o;

export default function useRequest(props) {
	const { apiKey, baseURL, debug, baseState, formatData = n, key, keyName, onError = n, onSuccess = n, params, mono, url, ...rest } = uno(props);
	const [error, errorSet] = useState(null);
	const [httpCode, httpCodeSet] = useState();
	const [response, responseSet] = useState(baseState);
	const resetState = ({ keepContent, keepError }) => {
		if (debug) console.debug(`hangers debug reset state at ${debug.location || ''}, baseState:`, baseState);
		if (!keepContent) responseSet(baseState);
		if (!keepError) errorSet(null);
	};
	const resArr = ['error','success'];
	const execute = (res = {}, updateState, onFinish, clear, pass) => {
		const data = formatData(res.data || {});
		let resObj = pass ? { ...baseState, ...data } : data;
		if (debug) console.debug(`hangers useRequest execute at ${debug.location || ''}`, resArr[pass], resObj);
		if (res.status) httpCodeSet(res.status);
		updateState(resObj);
		clear(pass ? null : baseState);
		onFinish(resObj);
	};
	const queryObj = { [ keyName || mainKeyName || key ? 'key' : 'apiKey']: key || apiKey || mainKey, ...params };
	const request = () => {
		return api({
			baseURL: baseURL || mainURL,
			debug,
			onError: err => execute(err.response, errorSet, onError, responseSet, 0),
			onSuccess: res => execute(res, responseSet, onSuccess, errorSet, 1),
			params: queryObj,
			url: mono || url,
			...rest
		})
		.then(res => log(undefined, { hangersDebug: 'success', res }, res.debug))
		.catch(err => log(undefined, { hangersDebug: 'error', err }, err.debug));
	}

	return { error, errorSet, httpCode, httpCodeSet, request, response, responseSet, resetState };
};