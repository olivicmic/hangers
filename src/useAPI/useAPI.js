import { useCallback, useEffect, useState } from 'react';
import { api } from 'lal';

const { 
	REACT_APP_API_MAIN_KEY: mainKey,
	REACT_APP_API_MAIN_URL: mainURL
} = process.env;

export default function useAPI({ 
		apiKey, // if an alternative key from the env key is needed, state here
		debug, // if true log fetched path & query object
		filter = f => f, // pass a array filter function to the main collection
		itemNames, // name the main collection, otherwise it is 'items'
		onSuccess = () => {}, // a function that will excute after a succesful fetch
		paused, // if true automatic fetch with be paused
		route, // full url to fetch, will not use main env url
		subRoute, // if present, request url is prefexed with the main env url
		queries, // an object consisting of strings to be encoded and appended to the url
		watch // pass an external value to watch for updates on to trigger a fetch
}) {
	const collection = itemNames || 'items';
	const path = route || subRoute ? mainURL ? mainURL + subRoute : '' : '';
	const [status, setStatus] = useState(paused ? -1 : 0);
	const [error, setError] = useState(null);
	const [content, setContent] = useState({ [collection]: [] });
	const [watchStore, updateWatch] = useState(watch);

	const fetch = useCallback(() => {
		let keyObj = {};
		let filterArr = (arr) => arr.filter(filter);
		if (apiKey !== null && mainKey) keyObj.key = apiKey || mainKey;
		let queryObj = { ...keyObj, ...queries };

		if (debug) console.log(path, keyObj);

		return api({ 
			debug,
			route: path,
			queries: queryObj
		})
		.then(response => {
			onSuccess();		
			setStatus(2);
			setContent({
				...response,
				[collection]: response[collection] ? filterArr(response[collection]) : []
			});
		})
		.catch(errors => {
			if (debug) console.log(errors);
			setStatus(3);
			setError(errors);
		});
	},[apiKey, filter, collection, onSuccess, route, queries]);

	useEffect(() => {
		if (!status) {
			setStatus(1);
			fetch();
		}
		if ((watch !== watchStore) && status > 1) {
			updateWatch(watch);
			setStatus(0);
		}
	},[fetch, status, watch, watchStore]);

	const resetState = ({ keepContent, keepError }) => {
		if (!keepContent) setContent({ [collection]: [] });
		if (!keepError) setError(null);
	};

	return {
		content, // state containing results of the API response
		setContent, // manipulate API response state directly
		fetch, // function to trigger API fetch directly
		status, // -1: paused, 0: staged (will trigger fetch), 1: processing, 2: success, 3: error
		setStatus, // used to reset API fetched status manually
		error, // if response returns an error it is stored here
		setError, // set the error manually
		resetState // reset content & error state, use keepContent or keepError properties to prevent clears
	};
};