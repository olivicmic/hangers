import { useCallback, useEffect, useState } from 'react';
import { api } from 'lal';

const { 
	REACT_APP_API_MAIN_KEY: mainKey,
	REACT_APP_API_MAIN_URL: mainURL
} = process.env;

export default function useAPI({ 
		apiKey, // if an alternative key from the env key is needed, state here
		data, // post/put/patch data object
		debug, // if true log requested path & query object
		filter = f => f, // pass a array filter function to the main collection
		itemNames, // name the main collection, otherwise it is 'items'
		method = 'get', // rest method type
		onError = () => {}, // a function that will execute if an error occurs
		onSuccess = () => {}, // a function that will excute after a succesful request
		paused, // if true automatic request with be paused
		route, // full url to request, will not use main env url
		subRoute, // if present, request url is prefexed with the main env url
		queries, // an object consisting of strings to be encoded and appended to the url
		watch // pass an external value to watch for updates on to trigger a request
}) {
	const collection = itemNames || 'items';
	const path = route || subRoute ? mainURL ? mainURL + subRoute : '' : '';
	const [status, setStatus] = useState(paused ? -1 : 0);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState({ [collection]: [] });
	const [watchStore, updateWatch] = useState(watch);

	const request = useCallback(() => {
		let keyObj = {};
		let filterArr = (arr) => arr.filter(filter);
		if (apiKey !== null && mainKey) keyObj.key = apiKey || mainKey;
		let queryObj = { ...keyObj, ...queries };

		return api({
			data,
			debug,
			method,
			route: path,
			queries: queryObj
		})
		.then(response => {
			let filtered = {
				...response,
				[collection]: response[collection] ? filterArr(response[collection]) : []
			};
			if (debug) console.log('hangers useAPI success', path, keyObj);
			onSuccess(filtered);
			setResponse(filtered);
			setStatus(2);
		})
		.catch(errors => {
			if (debug) console.log('hangers useAPI error', errors, path, keyObj);
			onError(errors);
			setError(errors);
			setStatus(3);
		});
	},[apiKey, filter, collection, onSuccess, route, queries]);

	useEffect(() => {
		if (!status) {
			setStatus(1);
			request();
		}
		if ((watch !== watchStore) && status > 1) {
			updateWatch(watch);
			setStatus(0);
		}
	},[request, status, watch, watchStore]);

	const resetState = ({ keepContent, keepError }) => {
		if (!keepContent) setResponse({ [collection]: [] });
		if (!keepError) setError(null);
	};

	return {
		request, // function to trigger API request directly
		response, // state containing results of the API response
		setResponse, // manipulate API response state directly
		status, // -1: paused, 0: staged (will trigger request), 1: processing, 2: success, 3: error
		setStatus, // used to reset API request status manually
		error, // if response returns an error it is stored here
		setError, // set the error manually
		resetState // reset response & error state, use keepContent or keepError properties to prevent clears
	};
};